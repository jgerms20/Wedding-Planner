import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { createDb, type Db } from "./index";
import { loadDatabaseUrl } from "./env";
import {
  budgetCategories as budgetCategoriesTable,
  decisions as decisionsTable,
  destinations as destinationsTable,
  events as eventsTable,
  profiles as profilesTable,
  scenarios as scenariosTable,
  tasks as tasksTable,
  venues as venuesTable,
  weddingMembers as weddingMembersTable,
  weddingSettings as weddingSettingsTable,
  weddings as weddingsTable,
} from "./schema/index";

const DEMO_SLUG = "demo-wedding";

/**
 * Seeds one demo wedding end to end: a couple, membership, settings, a
 * dozen tasks spanning every lifecycle phase, three events, two
 * destinations each with one venue, and two comparison scenarios.
 *
 * Idempotent: if `demo-wedding` already exists, it does nothing so
 * `pnpm db:seed` is safe to re-run.
 *
 * NOTE: this inserts directly into `auth.users` to create the two demo
 * profiles, which only works against the local stub `auth` schema this
 * package's migration creates (see migrations/0000_foundation.sql). On a
 * real Supabase project, create the demo users via the Auth Admin API (or
 * the dashboard) first, then adapt this script to look them up instead of
 * inserting into auth.users directly.
 */
export async function seed(db: Db): Promise<{ skipped: boolean; weddingId?: string }> {
  const existing = await db.query.weddings.findFirst({ where: eq(weddingsTable.slug, DEMO_SLUG) });
  if (existing) {
    return { skipped: true, weddingId: existing.id };
  }

  const partnerAId = randomUUID();
  const partnerBId = randomUUID();

  // Inserting into auth.users fires the on_auth_user_created trigger,
  // which creates the matching profiles row (reading display_name out of
  // raw_user_meta_data); we only need to fill in pronouns afterwards.
  await db.$client.query(
    `insert into auth.users (id, email, raw_user_meta_data) values
       ($1, $2, jsonb_build_object('display_name', $3::text)),
       ($4, $5, jsonb_build_object('display_name', $6::text))
     on conflict (id) do nothing`,
    [partnerAId, "jordan@example.com", "Jordan", partnerBId, "alex@example.com", "Alex"],
  );

  await db
    .update(profilesTable)
    .set({ pronouns: "they/them" })
    .where(eq(profilesTable.id, partnerAId));
  await db
    .update(profilesTable)
    .set({ pronouns: "she/her" })
    .where(eq(profilesTable.id, partnerBId));

  const targetDate = "2028-05-20";

  const [wedding] = await db
    .insert(weddingsTable)
    .values({
      slug: DEMO_SLUG,
      partnerA: { name: "Jordan", pronouns: "they/them" },
      partnerB: { name: "Alex", pronouns: "she/her" },
      targetDate,
      dateFlexibility: "month",
      targetSeason: "spring",
      locationText: "Northeast US or Italy (undecided)",
      styleNotes: "Relaxed, garden-style, warm string lighting, family-style dinner.",
      guestTarget: 120,
      isDestination: true,
      createdBy: partnerAId,
    })
    .returning();

  if (!wedding) {
    throw new Error("seed: failed to insert demo wedding");
  }
  const weddingId = wedding.id;

  await db.insert(weddingMembersTable).values([
    { weddingId, userId: partnerAId, role: "owner", acceptedAt: new Date() },
    { weddingId, userId: partnerBId, role: "owner", acceptedAt: new Date() },
  ]);

  await db.insert(weddingSettingsTable).values({
    weddingId,
    monthlyCostCapCents: 5000,
    planConfig: {
      anchors: [
        {
          id: randomUUID(),
          kind: "engagement_party",
          title: "Engagement party",
          date: "2027-06-12",
          reveals: ["date", "destination", "wedding_party"],
        },
      ],
      travelWindows: [],
      saveTheDatesMonthsBefore: 9,
      invitationsMonthsBefore: 3,
      rsvpDeadlineMonthsBefore: 1,
      overrides: {},
    },
  });

  // Twelve tasks spanning every lifecycle phase.
  await db.insert(tasksTable).values([
    { weddingId, title: "Tell immediate family the news", phase: "just_engaged", status: "done" },
    { weddingId, title: "Set overall wedding budget", phase: "foundation", status: "doing" },
    {
      weddingId,
      title: "Book venue and lock the date",
      phase: "foundation",
      status: "todo",
      dueDate: "2027-03-01",
    },
    { weddingId, title: "Book photographer", phase: "core_vendors", status: "todo" },
    { weddingId, title: "Start wedding dress shopping", phase: "core_vendors", status: "todo" },
    {
      weddingId,
      title: "Send save-the-dates",
      phase: "communications",
      status: "todo",
      dueDate: "2027-08-20",
    },
    { weddingId, title: "Launch wedding website", phase: "communications", status: "todo" },
    { weddingId, title: "Send invitations", phase: "details", status: "todo", dueDate: "2028-02-20" },
    { weddingId, title: "Draft day-of timeline", phase: "details", status: "todo" },
    {
      weddingId,
      title: "Confirm final headcount with caterer",
      phase: "final_stretch",
      status: "todo",
      dueDate: "2028-05-06",
    },
    { weddingId, title: "Rehearsal dinner", phase: "wedding_weekend", status: "todo" },
    { weddingId, title: "Send thank-you notes", phase: "after", status: "todo" },
  ]);

  // Three events.
  await db.insert(eventsTable).values([
    {
      weddingId,
      title: "Engagement party",
      startsAt: new Date("2027-06-12T18:00:00Z"),
      allDay: false,
      kind: "anchor",
    },
    {
      weddingId,
      title: "Venue tour: Locust Grove Estate",
      startsAt: new Date("2026-11-08T15:00:00Z"),
      allDay: false,
      kind: "tour",
    },
    {
      weddingId,
      title: "RSVP deadline",
      startsAt: new Date("2028-04-20T00:00:00Z"),
      allDay: true,
      kind: "deadline",
    },
  ]);

  // Two destinations, one venue each.
  const [hudsonValley, tuscany] = await db
    .insert(destinationsTable)
    .values([
      {
        weddingId,
        name: "Hudson Valley, NY",
        country: "USA",
        region: "New York",
        notes: "An hour from most of the guest list; easy for an early-May date.",
        travelCostPerGuestEstimate: "150",
        lodgingPerNightEstimate: "220",
        attendanceRateEstimate: "0.85",
        sourceUrls: [],
      },
      {
        weddingId,
        name: "Tuscany, Italy",
        country: "Italy",
        region: "Chianti",
        notes: "The dream option; long travel for most guests, gorgeous in May.",
        travelCostPerGuestEstimate: "900",
        lodgingPerNightEstimate: "180",
        attendanceRateEstimate: "0.55",
        sourceUrls: [],
      },
    ])
    .returning();

  if (!hudsonValley || !tuscany) {
    throw new Error("seed: failed to insert demo destinations");
  }

  const [hudsonValleyVenue] = await db
    .insert(venuesTable)
    .values({
      weddingId,
      destinationId: hudsonValley.id,
      name: "Locust Grove Estate",
      capacity: 150,
      rentalFee: "9500",
      perGuestCost: "185",
      inHouseCatering: true,
      lodgingOnSite: false,
      status: "touring",
      sourceUrls: [],
    })
    .returning();

  const [tuscanyVenue] = await db
    .insert(venuesTable)
    .values({
      weddingId,
      destinationId: tuscany.id,
      name: "Villa di Maiano",
      capacity: 100,
      rentalFee: "16000",
      perGuestCost: "260",
      inHouseCatering: true,
      lodgingOnSite: true,
      status: "contacted",
      sourceUrls: [],
    })
    .returning();

  if (!hudsonValleyVenue || !tuscanyVenue) {
    throw new Error("seed: failed to insert demo venues");
  }

  // Two comparison scenarios.
  await db.insert(scenariosTable).values([
    {
      weddingId,
      name: "Hudson Valley weekend",
      destinationId: hudsonValley.id,
      venueId: hudsonValleyVenue.id,
      dateStart: targetDate,
      dateEnd: targetDate,
      guestAssumption: 120,
      attendanceRate: "0.85",
      fixedCosts: "9500",
      perGuestCost: "185",
      travelCostPerGuest: "150",
      pinned: true,
    },
    {
      weddingId,
      name: "Tuscany week",
      destinationId: tuscany.id,
      venueId: tuscanyVenue.id,
      dateStart: targetDate,
      dateEnd: targetDate,
      guestAssumption: 120,
      attendanceRate: "0.55",
      fixedCosts: "16000",
      perGuestCost: "260",
      travelCostPerGuest: "900",
      pinned: false,
    },
  ]);

  // A couple of extras that make the demo feel lived-in without going
  // beyond what the spec calls for.
  await db.insert(budgetCategoriesTable).values([
    { weddingId, name: "Venue & catering", targetPercent: "45", sortOrder: 0 },
    { weddingId, name: "Photo & video", targetPercent: "12", sortOrder: 1 },
  ]);
  await db.insert(decisionsTable).values({
    weddingId,
    title: "Narrowed to two destinations",
    detail: "Hudson Valley (easy for guests) vs. Tuscany (the dream).",
    source: "manual",
  });

  return { skipped: false, weddingId };
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const databaseUrl = loadDatabaseUrl();
  const db = createDb(databaseUrl);
  try {
    const result = await seed(db);
    if (result.skipped) {
      console.log(`db:seed: "${DEMO_SLUG}" already exists (id ${result.weddingId}), nothing to do.`);
    } else {
      console.log(`db:seed: created "${DEMO_SLUG}" (id ${result.weddingId}).`);
    }
  } finally {
    await db.$client.end();
  }
}
