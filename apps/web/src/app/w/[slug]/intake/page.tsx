"use client";

import {
  generateAnchorEvents,
  generatePlan,
  newId,
  nowIso,
  subEventKindSchema,
  type Anchor,
  type Destination,
  type PlanConfig,
  type SubEvent,
  type SubEventKind,
  type Wedding,
} from "@bower/shared";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";
import { SUB_EVENT_LABELS } from "@/lib/sub-event-catalog";

const PRIORITY_OPTIONS = ["Food", "Photo & video", "Music", "Venue", "Flowers", "Attire", "Guest experience"];

interface SatelliteState {
  selected: boolean;
  date: string;
  hostName: string;
  /** Set once hydrated from an existing SubEvent, so saving updates it instead of creating a duplicate. */
  id?: string;
}

interface CandidateState {
  id?: string;
  name: string;
  country: string;
}

const STEPS = ["You two", "When", "Where", "Size & budget", "Vibe & policies", "Party & events", "Helpers & tools", "Review"];

function labeledLine(notes: string | undefined, label: string): string {
  const line = (notes ?? "").split("\n").find((l) => l.startsWith(`${label}: `));
  return line ? line.slice(label.length + 2) : "";
}

export default function IntakePage() {
  const { repo, wedding, settings, reloadWedding, reloadSettings, viewerName } = useRepoContext();
  const weddingId = wedding?.id;
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const loadTasks = useCallback(async () => (repo && weddingId ? repo.tasks.list(weddingId) : undefined), [repo, weddingId]);
  const { items: existingTasks } = useEntityList(loadTasks);

  const loadSubEvents = useCallback(async () => (repo && weddingId ? repo.subEvents.list(weddingId) : undefined), [repo, weddingId]);
  const { items: existingSubEvents, loading: subEventsLoading, reload: reloadSubEvents } = useEntityList(loadSubEvents);

  const loadDestinations = useCallback(async () => (repo && weddingId ? repo.destinations.list(weddingId) : undefined), [repo, weddingId]);
  const { items: existingDestinations, loading: destinationsLoading, reload: reloadDestinations } = useEntityList(loadDestinations);

  const [partnerAName, setPartnerAName] = useState("");
  const [partnerAPronouns, setPartnerAPronouns] = useState("");
  const [partnerBName, setPartnerBName] = useState("");
  const [partnerBPronouns, setPartnerBPronouns] = useState("");

  const [dateMode, setDateMode] = useState<"fixed" | "season" | "open">("open");
  const [targetDate, setTargetDate] = useState("");
  const [targetSeason, setTargetSeason] = useState("");
  const [datesToAvoid, setDatesToAvoid] = useState("");

  const [isDestination, setIsDestination] = useState(false);
  const [candidates, setCandidates] = useState<CandidateState[]>([{ name: "", country: "" }]);
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

  // Prefill every field from the current wedding, once, the first time everything has loaded.
  const hydrated = useRef(false);
  useEffect(() => {
    if (hydrated.current || !wedding || !settings || subEventsLoading || destinationsLoading) return;
    hydrated.current = true;

    setPartnerAName(wedding.partnerA.name);
    setPartnerAPronouns(wedding.partnerA.pronouns ?? "");
    setPartnerBName(wedding.partnerB.name);
    setPartnerBPronouns(wedding.partnerB.pronouns ?? "");

    setDateMode(wedding.dateFlexibility === "fixed" ? "fixed" : wedding.dateFlexibility === "open" ? "open" : "season");
    setTargetDate(wedding.targetDate ?? "");
    setTargetSeason(wedding.targetSeason ?? "");
    setDatesToAvoid(labeledLine(wedding.styleNotes, "Dates to avoid"));

    setIsDestination(wedding.isDestination);
    setCandidates(existingDestinations.length > 0 ? existingDestinations.map((d) => ({ id: d.id, name: d.name, country: d.country })) : [{ name: "", country: "" }]);
    setTravelAskNote(labeledLine(wedding.styleNotes, "Travel ask of guests"));

    setGuestTarget(wedding.guestTarget ? String(wedding.guestTarget) : "");
    setBudgetNote(labeledLine(wedding.styleNotes, "Budget"));
    const priorityLine = labeledLine(wedding.styleNotes, "Top priorities");
    setPriorities(priorityLine ? priorityLine.split(",").map((p) => p.trim()).filter(Boolean) : []);

    setVibeNotes(labeledLine(wedding.styleNotes, "Vibe"));
    setPoliciesNotes(labeledLine(wedding.styleNotes, "Policies"));

    setWeddingPartyNote(labeledLine(wedding.styleNotes, "Wedding party"));
    const engagementAnchor = settings.planConfig.anchors.find((a) => a.kind === "engagement_party");
    setEngagementPartyDate(engagementAnchor?.date ?? "");
    setEngagementReveals({
      date: engagementAnchor?.reveals.includes("date") ?? false,
      destination: engagementAnchor?.reveals.includes("destination") ?? false,
      wedding_party: engagementAnchor?.reveals.includes("wedding_party") ?? false,
    });
    setSatelliteEvents((prev) => {
      const next = { ...prev };
      for (const se of existingSubEvents) {
        if (next[se.kind]) next[se.kind] = { selected: true, date: se.date ?? "", hostName: se.hostName ?? "", id: se.id };
      }
      return next;
    });

    setHelpersNote(labeledLine(wedding.styleNotes, "Other helpers"));
    setToolsNote(labeledLine(wedding.styleNotes, "Tools already used"));
    const closingMatch = /it (.+)\.?"$/m.exec(wedding.styleNotes ?? "");
    setClosingSentence(closingMatch?.[1] ?? "");
    // Runs once, as soon as everything needed to hydrate has arrived; intentionally does not
    // re-run when existingDestinations/existingSubEvents change afterward (the ref guard above).
  }, [wedding, settings, subEventsLoading, destinationsLoading]);

  function toggleSatellite(kind: string) {
    setSatelliteEvents((prev) => ({ ...prev, [kind]: { ...prev[kind]!, selected: !prev[kind]!.selected } }));
  }
  function updateSatellite(kind: string, patch: Partial<SatelliteState>) {
    setSatelliteEvents((prev) => ({ ...prev, [kind]: { ...prev[kind]!, ...patch } }));
  }
  function togglePriority(p: string) {
    setPriorities((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  async function save() {
    if (!repo || !wedding) return;
    setSaving(true);
    setJustSaved(false);

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
      name: `${partnerAName || wedding.partnerA.name} & ${partnerBName || wedding.partnerB.name}`,
      partnerA: { name: partnerAName || wedding.partnerA.name, pronouns: partnerAPronouns || undefined },
      partnerB: { name: partnerBName || wedding.partnerB.name, pronouns: partnerBPronouns || undefined },
      dateFlexibility: dateMode,
      targetDate: dateMode === "fixed" && targetDate ? targetDate : undefined,
      targetSeason: dateMode === "season" && targetSeason ? targetSeason : undefined,
      guestTarget: guestTarget ? Number(guestTarget) : undefined,
      isDestination,
      styleNotes: notesParts.join("\n") || undefined,
      updatedAt: nowIso(),
    };
    await repo.upsertWedding(updatedWedding);

    // Anchors: keep everything that isn't the engagement party untouched, then set/update/clear that one.
    const existingAnchors = settings?.planConfig.anchors ?? [];
    const nonEngagement = existingAnchors.filter((a) => a.kind !== "engagement_party");
    const existingEngagement = existingAnchors.find((a) => a.kind === "engagement_party");
    const engagementAnchor: Anchor[] = engagementPartyDate
      ? [
          {
            id: existingEngagement?.id ?? newId(),
            kind: "engagement_party",
            title: existingEngagement?.title || "Engagement party",
            date: engagementPartyDate,
            reveals: Object.entries(engagementReveals)
              .filter(([, v]) => v)
              .map(([k]) => k) as ("date" | "destination" | "wedding_party")[],
            notes: existingEngagement?.notes,
          },
        ]
      : [];
    const planConfig: PlanConfig = {
      anchors: [...nonEngagement, ...engagementAnchor],
      travelWindows: settings?.planConfig.travelWindows ?? [],
      saveTheDatesMonthsBefore: settings?.planConfig.saveTheDatesMonthsBefore ?? (isDestination ? 10 : 6),
      invitationsMonthsBefore: settings?.planConfig.invitationsMonthsBefore ?? (isDestination ? 3 : 2),
      rsvpDeadlineMonthsBefore: settings?.planConfig.rsvpDeadlineMonthsBefore ?? (isDestination ? 1.5 : 1),
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
      const keepIds = new Set<string>();
      for (const candidate of candidates) {
        if (!candidate.name.trim()) continue;
        const id = candidate.id ?? newId();
        keepIds.add(id);
        const existing = existingDestinations.find((d) => d.id === id);
        const destination: Destination = {
          id,
          weddingId: wedding.id,
          name: candidate.name.trim(),
          country: candidate.country.trim() || "Unknown",
          region: existing?.region,
          notes: existing?.notes,
          travelCostPerGuestEstimate: existing?.travelCostPerGuestEstimate,
          lodgingPerNightEstimate: existing?.lodgingPerNightEstimate,
          attendanceRateEstimate: existing?.attendanceRateEstimate,
          weatherNotes: existing?.weatherNotes,
          legalNotes: existing?.legalNotes,
          seasonNotes: existing?.seasonNotes,
          sourceUrls: existing?.sourceUrls ?? [],
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        };
        await repo.destinations.upsert(destination);
      }
      for (const existing of existingDestinations) {
        if (!keepIds.has(existing.id)) await repo.destinations.remove(existing.id);
      }
      await reloadDestinations();
    }

    const keepSubIds = new Set<string>();
    for (const [kind, state] of Object.entries(satelliteEvents)) {
      if (!state.selected) continue;
      const id = state.id ?? newId();
      keepSubIds.add(id);
      const existing = existingSubEvents.find((s) => s.id === id);
      const subEvent: SubEvent = {
        id,
        weddingId: wedding.id,
        kind: kind as SubEventKind,
        title: existing?.title ?? SUB_EVENT_LABELS[kind as SubEventKind],
        date: state.date || undefined,
        location: existing?.location,
        hostName: state.hostName || undefined,
        budgetEstimate: existing?.budgetEstimate,
        notes: existing?.notes,
        guestRule: existing?.guestRule,
      };
      await repo.subEvents.upsert(subEvent);
    }
    for (const existing of existingSubEvents) {
      if (!keepSubIds.has(existing.id)) await repo.subEvents.remove(existing.id);
    }
    await reloadSubEvents();

    const nextTasks = generatePlan({ wedding: updatedWedding, planConfig, existingTasks });
    for (const task of nextTasks) {
      await repo.tasks.upsert(task);
    }
    const events = generateAnchorEvents(updatedWedding, planConfig);
    for (const event of events) {
      await repo.events.upsert(event);
    }

    await repo.decisions.upsert({
      id: newId(),
      weddingId: wedding.id,
      title: "Refined the profile",
      detail: `Updated answers for ${updatedWedding.name}; the plan was regenerated, keeping edits already made.`,
      decidedAt: nowIso(),
      decidedBy: viewerName,
      source: "manual",
    });

    await Promise.all([reloadWedding(), reloadSettings()]);
    setSaving(false);
    setJustSaved(true);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <PageHeader
        eyebrow="Refine our profile"
        title="Update anything, anytime"
        description="Same questions as day one. Change an answer and Atlas re-derives the plan, keeping whatever you've already edited by hand."
      />

      <div className="flex flex-wrap gap-1.5 text-xs text-ink-soft">
        {STEPS.map((label, i) => (
          <span key={label} className={i === step ? "font-medium text-coral" : ""}>
            {i > 0 && "· "}
            {label}
          </span>
        ))}
      </div>

      <div className="postcard p-6">
        <p className="mb-4 font-display text-2xl">{STEPS[step]}</p>
        <div className="flex flex-col gap-4">
          {step === 0 && (
            <>
              <Field label="Your name">
                <Input value={partnerAName} onChange={(e) => setPartnerAName(e.target.value)} placeholder="Partner A" data-testid="intake-partner-a-name" />
              </Field>
              <Field label="Your pronouns (optional)">
                <Input value={partnerAPronouns} onChange={(e) => setPartnerAPronouns(e.target.value)} placeholder="she/her" />
              </Field>
              <Field label="Their name">
                <Input value={partnerBName} onChange={(e) => setPartnerBName(e.target.value)} placeholder="Partner B" data-testid="intake-partner-b-name" />
              </Field>
              <Field label="Their pronouns (optional)">
                <Input value={partnerBPronouns} onChange={(e) => setPartnerBPronouns(e.target.value)} placeholder="they/them" />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Do you know the date?">
                <Select value={dateMode} onChange={(e) => setDateMode(e.target.value as typeof dateMode)} data-testid="intake-date-mode">
                  <option value="fixed">Yes, an exact date</option>
                  <option value="season">Just a season</option>
                  <option value="open">Not yet</option>
                </Select>
              </Field>
              {dateMode === "fixed" && (
                <Field label="Wedding date">
                  <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} data-testid="intake-target-date" />
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
                        <Checkbox checked={engagementReveals[k]} onChange={() => setEngagementReveals((prev) => ({ ...prev, [k]: !prev[k] }))} />
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
                        <div key={c.id ?? i} className="flex gap-2">
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
                          <Button type="button" variant="ghost" size="sm" onClick={() => setCandidates((prev) => prev.filter((_, xi) => xi !== i))}>
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => setCandidates((prev) => [...prev, { name: "", country: "" }])}>
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
                        (priorities.includes(p) ? "border-coral bg-coral-soft text-coral" : "border-line text-ink-soft hover:bg-paper-deep")
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
                        <div key={kind} className="rounded-md border border-line p-3">
                          <label className="flex items-center gap-2 text-sm font-medium">
                            <Checkbox checked={state.selected} onChange={() => toggleSatellite(kind)} />
                            {SUB_EVENT_LABELS[kind]}
                          </label>
                          {state.selected && (
                            <div className="mt-2 flex gap-2 pl-6">
                              <Input type="date" value={state.date} onChange={(e) => updateSatellite(kind, { date: e.target.value })} />
                              <Input value={state.hostName} onChange={(e) => updateSatellite(kind, { hostName: e.target.value })} placeholder="Who's hosting?" />
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
            <div className="flex flex-col gap-2 text-sm text-ink-soft">
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
              <p>Saving re-derives the plan from your date, anchors, and travel windows — anything you've already edited by hand stays put.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </Button>
        <div className="flex items-center gap-3">
          {justSaved && <span className="text-sm text-ink-soft">Saved.</span>}
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          )}
        </div>
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
