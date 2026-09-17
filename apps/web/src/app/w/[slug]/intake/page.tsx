"use client";

import {
  generateAnchorEvents,
  generatePlan,
  newId,
  nowIso,
  subEventKindSchema,
  type Destination,
  type SubEvent,
  type SubEventKind,
  type Wedding,
} from "@bower/shared";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WEDDING_SLUG } from "@/lib/constants";
import { useRepoContext } from "@/lib/repo-context";

const PRIORITY_OPTIONS = ["Food", "Photo & video", "Music", "Venue", "Flowers", "Attire", "Guest experience"];

const SUB_EVENT_LABELS: Record<SubEventKind, string> = {
  engagement_party: "Engagement party",
  bridal_shower: "Bridal shower",
  couples_shower: "Couples shower",
  groom_shower: "Groom's shower",
  bachelor: "Bachelor party",
  bachelorette: "Bachelorette party",
  rehearsal_dinner: "Rehearsal dinner",
  welcome_party: "Welcome party",
  brunch: "Morning-after brunch",
  honeymoon: "Honeymoon",
  other: "Something else",
};

interface SatelliteState {
  selected: boolean;
  date: string;
  hostName: string;
}

const STEPS = ["You two", "When", "Where", "Size & budget", "Vibe & policies", "Party & events", "Helpers & tools", "Review"];

export default function IntakePage() {
  const router = useRouter();
  const { repo, wedding, reloadWedding, viewerName } = useRepoContext();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [partnerAName, setPartnerAName] = useState("");
  const [partnerAPronouns, setPartnerAPronouns] = useState("");
  const [partnerBName, setPartnerBName] = useState("");
  const [partnerBPronouns, setPartnerBPronouns] = useState("");

  const [dateMode, setDateMode] = useState<"fixed" | "season" | "open">("open");
  const [targetDate, setTargetDate] = useState("");
  const [targetSeason, setTargetSeason] = useState("");
  const [datesToAvoid, setDatesToAvoid] = useState("");

  const [isDestination, setIsDestination] = useState(false);
  const [candidates, setCandidates] = useState<{ name: string; country: string }[]>([{ name: "", country: "" }]);
  const [travelAskNote, setTravelAskNote] = useState("");

  const [guestTarget, setGuestTarget] = useState("");
  const [budgetNote, setBudgetNote] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);

  const [vibeNotes, setVibeNotes] = useState("");
  const [policiesNotes, setPoliciesNotes] = useState("");

  const [weddingPartyNote, setWeddingPartyNote] = useState("");
  const [engagementPartyDate, setEngagementPartyDate] = useState("");
  const [engagementReveals, setEngagementReveals] = useState({ date: false, destination: false, wedding_party: false });
  const [satelliteEvents, setSatelliteEvents] = useState<Record<string, SatelliteState>>(
    Object.fromEntries(subEventKindSchema.options.map((k) => [k, { selected: false, date: "", hostName: "" }])),
  );

  const [helpersNote, setHelpersNote] = useState("");
  const [toolsNote, setToolsNote] = useState("");
  const [closingSentence, setClosingSentence] = useState("");

  function toggleSatellite(kind: string) {
    setSatelliteEvents((prev) => ({ ...prev, [kind]: { ...prev[kind]!, selected: !prev[kind]!.selected } }));
  }
  function updateSatellite(kind: string, patch: Partial<SatelliteState>) {
    setSatelliteEvents((prev) => ({ ...prev, [kind]: { ...prev[kind]!, ...patch } }));
  }
  function togglePriority(p: string) {
    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  async function finish() {
    if (!repo || !wedding) return;
    setSaving(true);

    const notesParts = [
      datesToAvoid && `Dates to avoid: ${datesToAvoid}`,
      travelAskNote && `Travel ask of guests: ${travelAskNote}`,
      budgetNote && `Budget: ${budgetNote}`,
      priorities.length > 0 && `Top priorities: ${priorities.join(", ")}`,
      vibeNotes && `Vibe: ${vibeNotes}`,
      policiesNotes && `Policies: ${policiesNotes}`,
      weddingPartyNote && `Wedding party: ${weddingPartyNote}`,
      helpersNote && `Other helpers: ${helpersNote}`,
      toolsNote && `Tools already used: ${toolsNote}`,
      closingSentence && `"We could not have done this without the app because it ${closingSentence}"`,
    ].filter(Boolean) as string[];

    const updatedWedding: Wedding = {
      ...wedding,
      name: `${partnerAName || "Partner A"} & ${partnerBName || "Partner B"}`,
      partnerA: { name: partnerAName || "Partner A", pronouns: partnerAPronouns || undefined },
      partnerB: { name: partnerBName || "Partner B", pronouns: partnerBPronouns || undefined },
      dateFlexibility: dateMode,
      targetDate: dateMode === "fixed" && targetDate ? targetDate : undefined,
      targetSeason: dateMode === "season" && targetSeason ? targetSeason : undefined,
      guestTarget: guestTarget ? Number(guestTarget) : undefined,
      isDestination,
      styleNotes: notesParts.join("\n") || undefined,
      updatedAt: nowIso(),
    };
    await repo.upsertWedding(updatedWedding);

    const settings = (await repo.getSettings(wedding.id)) ?? undefined;
    const anchors = engagementPartyDate
      ? [
          {
            id: newId(),
            kind: "engagement_party" as const,
            title: "Engagement party",
            date: engagementPartyDate,
            reveals: (Object.entries(engagementReveals).filter(([, v]) => v).map(([k]) => k) as ("date" | "destination" | "wedding_party")[]),
          },
        ]
      : [];
    const planConfig = {
      anchors,
      travelWindows: settings?.planConfig.travelWindows ?? [],
      saveTheDatesMonthsBefore: isDestination ? 10 : 6,
      invitationsMonthsBefore: isDestination ? 3 : 2,
      rsvpDeadlineMonthsBefore: isDestination ? 1.5 : 1,
      overrides: settings?.planConfig.overrides ?? {},
    };
    await repo.saveSettings({
      weddingId: wedding.id,
      autonomy: settings?.autonomy ?? {},
      notifications: settings?.notifications ?? {},
      monthlyCostCapCents: settings?.monthlyCostCapCents ?? 0,
      planConfig,
    });

    if (isDestination) {
      const now = nowIso();
      for (const candidate of candidates) {
        if (!candidate.name.trim()) continue;
        const destination: Destination = {
          id: newId(),
          weddingId: wedding.id,
          name: candidate.name.trim(),
          country: candidate.country.trim() || "Unknown",
          sourceUrls: [],
          createdAt: now,
          updatedAt: now,
        };
        await repo.destinations.upsert(destination);
      }
    }

    for (const [kind, state] of Object.entries(satelliteEvents)) {
      if (!state.selected) continue;
      const subEvent: SubEvent = {
        id: newId(),
        weddingId: wedding.id,
        kind: kind as SubEventKind,
        title: SUB_EVENT_LABELS[kind as SubEventKind],
        date: state.date || undefined,
        hostName: state.hostName || undefined,
      };
      await repo.subEvents.upsert(subEvent);
    }

    const tasks = generatePlan({ wedding: updatedWedding, planConfig, existingTasks: [] });
    for (const task of tasks) {
      await repo.tasks.upsert(task);
    }
    const events = generateAnchorEvents(updatedWedding, planConfig);
    for (const event of events) {
      await repo.events.upsert(event);
    }

    await repo.decisions.upsert({
      id: newId(),
      weddingId: wedding.id,
      title: "Completed intake",
      detail: `Built the initial plan for ${updatedWedding.name}.`,
      decidedAt: nowIso(),
      decidedBy: viewerName,
      source: "manual",
    });

    // Refreshes the shared context (the WeddingShell layout persists across this
    // navigation, so Home would otherwise keep showing the pre-intake wedding).
    await reloadWedding();
    router.replace(`/w/${WEDDING_SLUG}`);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <p className="text-sm tracking-wide text-muted-foreground uppercase">Welcome to Bower</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">Let&apos;s sketch the shape of your wedding</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A few questions now save a lot of guessing later. Answer together — you can change anything afterward.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground">
        {STEPS.map((label, i) => (
          <span key={label} className={i === step ? "font-medium text-rose" : ""}>
            {i > 0 && "· "}
            {label}
          </span>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[step]}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {step === 0 && (
            <>
              <Field label="Your name">
                <Input
                  value={partnerAName}
                  onChange={(e) => setPartnerAName(e.target.value)}
                  placeholder="Partner A"
                  data-testid="intake-partner-a-name"
                />
              </Field>
              <Field label="Your pronouns (optional)">
                <Input value={partnerAPronouns} onChange={(e) => setPartnerAPronouns(e.target.value)} placeholder="she/her" />
              </Field>
              <Field label="Their name">
                <Input
                  value={partnerBName}
                  onChange={(e) => setPartnerBName(e.target.value)}
                  placeholder="Partner B"
                  data-testid="intake-partner-b-name"
                />
              </Field>
              <Field label="Their pronouns (optional)">
                <Input value={partnerBPronouns} onChange={(e) => setPartnerBPronouns(e.target.value)} placeholder="they/them" />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Do you know the date?">
                <Select
                  value={dateMode}
                  onChange={(e) => setDateMode(e.target.value as typeof dateMode)}
                  data-testid="intake-date-mode"
                >
                  <option value="fixed">Yes, an exact date</option>
                  <option value="season">Just a season</option>
                  <option value="open">Not yet</option>
                </Select>
              </Field>
              {dateMode === "fixed" && (
                <Field label="Wedding date">
                  <Input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    data-testid="intake-target-date"
                  />
                </Field>
              )}
              {dateMode === "season" && (
                <Field label="Target season">
                  <Input value={targetSeason} onChange={(e) => setTargetSeason(e.target.value)} placeholder="Spring 2028" />
                </Field>
              )}
              <Field label="Dates to avoid (optional)">
                <Textarea value={datesToAvoid} onChange={(e) => setDatesToAvoid(e.target.value)} placeholder="Grandma's 90th, tax season, …" />
              </Field>
              <Field label="Engagement party date (optional)">
                <Input type="date" value={engagementPartyDate} onChange={(e) => setEngagementPartyDate(e.target.value)} />
              </Field>
              {engagementPartyDate && (
                <Field label="Will it reveal…">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {(["date", "destination", "wedding_party"] as const).map((k) => (
                      <label key={k} className="flex items-center gap-2">
                        <Checkbox
                          checked={engagementReveals[k]}
                          onChange={() => setEngagementReveals((prev) => ({ ...prev, [k]: !prev[k] }))}
                        />
                        {k === "date" ? "The date" : k === "destination" ? "The destination" : "The wedding party"}
                      </label>
                    ))}
                  </div>
                </Field>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <Field label="Local or destination?">
                <div className="flex gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <Checkbox checked={!isDestination} onChange={() => setIsDestination(false)} />
                    Local
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={isDestination} onChange={() => setIsDestination(true)} />
                    Destination
                  </label>
                </div>
              </Field>
              {isDestination && (
                <>
                  <Field label="Candidate destinations">
                    <div className="flex flex-col gap-2">
                      {candidates.map((c, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={c.name}
                            onChange={(e) => setCandidates((prev) => prev.map((x, xi) => (xi === i ? { ...x, name: e.target.value } : x)))}
                            placeholder="e.g. Tulum, Brazil, the Catskills"
                          />
                          <Input
                            value={c.country}
                            onChange={(e) => setCandidates((prev) => prev.map((x, xi) => (xi === i ? { ...x, country: e.target.value } : x)))}
                            placeholder="Country"
                            className="max-w-32"
                          />
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => setCandidates((prev) => [...prev, { name: "", country: "" }])}>
                        Add another candidate
                      </Button>
                    </div>
                  </Field>
                  <Field label="How much travel would you ask of guests?">
                    <Textarea value={travelAskNote} onChange={(e) => setTravelAskNote(e.target.value)} />
                  </Field>
                </>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <Field label="Gut guest count">
                <Input type="number" min={0} value={guestTarget} onChange={(e) => setGuestTarget(e.target.value)} placeholder="120" />
              </Field>
              <Field label="Budget range, ceiling, and who contributes">
                <Textarea value={budgetNote} onChange={(e) => setBudgetNote(e.target.value)} placeholder="$40-60k, hard ceiling $70k, split evenly with both sets of parents contributing…" />
              </Field>
              <Field label="Top three priorities">
                <div className="flex flex-wrap gap-2">
                  {PRIORITY_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePriority(p)}
                      className={
                        "rounded-full border px-3 py-1 text-xs transition-colors " +
                        (priorities.includes(p) ? "border-rose bg-rose-soft text-rose" : "border-border text-muted-foreground hover:bg-muted")
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <Field label="Vibe">
                <Textarea value={vibeNotes} onChange={(e) => setVibeNotes(e.target.value)} placeholder="Formal/casual, indoor/outdoor, religious/secular, traditions to include or avoid…" />
              </Field>
              <Field label="Policies">
                <Textarea value={policiesNotes} onChange={(e) => setPoliciesNotes(e.target.value)} placeholder="Plus-ones, kids, alcohol, dietary and accessibility considerations…" />
              </Field>
            </>
          )}

          {step === 5 && (
            <>
              <Field label="Wedding party">
                <Textarea value={weddingPartyNote} onChange={(e) => setWeddingPartyNote(e.target.value)} placeholder="Sizes, whether people are already chosen, how you want to ask them. Add the roster on the Party page." />
              </Field>
              <Field label="Satellite events you want">
                <div className="flex flex-col gap-3">
                  {subEventKindSchema.options
                    .filter((k) => k !== "other")
                    .map((kind) => {
                      const state = satelliteEvents[kind]!;
                      return (
                        <div key={kind} className="rounded-md border border-border p-3">
                          <label className="flex items-center gap-2 text-sm font-medium">
                            <Checkbox checked={state.selected} onChange={() => toggleSatellite(kind)} />
                            {SUB_EVENT_LABELS[kind]}
                          </label>
                          {state.selected && (
                            <div className="mt-2 flex gap-2 pl-6">
                              <Input type="date" value={state.date} onChange={(e) => updateSatellite(kind, { date: e.target.value })} />
                              <Input
                                value={state.hostName}
                                onChange={(e) => updateSatellite(kind, { hostName: e.target.value })}
                                placeholder="Who's hosting?"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </Field>
            </>
          )}

          {step === 6 && (
            <>
              <Field label="Who else will end up helping plan?">
                <Textarea value={helpersNote} onChange={(e) => setHelpersNote(e.target.value)} placeholder="Parents, a friend, a professional planner…" />
              </Field>
              <Field label="Tools you already live in">
                <Textarea value={toolsNote} onChange={(e) => setToolsNote(e.target.value)} placeholder="Google Calendar, Drive, Notion…" />
              </Field>
              <Field label={'Finish this sentence: "We could not have done this without the app because it ___."'}>
                <Textarea value={closingSentence} onChange={(e) => setClosingSentence(e.target.value)} />
              </Field>
            </>
          )}

          {step === 7 && (
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  {partnerAName || "Partner A"} &amp; {partnerBName || "Partner B"}
                </strong>
              </p>
              <p>
                {dateMode === "fixed" && targetDate
                  ? `Wedding date: ${targetDate}`
                  : dateMode === "season" && targetSeason
                    ? `Target season: ${targetSeason}`
                    : "Date not set yet"}
              </p>
              <p>{isDestination ? `Destination wedding — ${candidates.filter((c) => c.name).length} candidate(s)` : "Local wedding"}</p>
              <p>{guestTarget ? `~${guestTarget} guests` : "Guest count not set yet"}</p>
              <p>
                Building your plan will create the default task timeline (and re-derive it any time from Plan Settings) —
                nothing here is permanent.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>
            Next
          </Button>
        ) : (
          <Button type="button" onClick={finish} disabled={saving}>
            {saving ? "Building your plan…" : "Build my plan"}
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
