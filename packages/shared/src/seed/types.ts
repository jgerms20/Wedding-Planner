import type { SubEventKind, VenueStatus } from "../entities/index";

/**
 * Seed data contract for researched content. Every number must be backed by a
 * URL in `sourceUrls`, or the record must say `estimated: true` and explain the
 * derivation in a note. Amounts are USD.
 */
export interface VenueSeed {
  /** Stable slug, e.g. "brazil-uxua-casa-hotel". */
  key: string;
  name: string;
  website?: string;
  email?: string;
  phone?: string;
  capacity?: number;
  /** Venue/site rental fee, if published. */
  rentalFee?: number;
  /** Food and beverage minimum, if published. */
  fbMinimum?: number;
  /** Published or estimated food + beverage per guest. */
  perGuestCost?: number;
  inHouseCatering?: boolean;
  lodgingOnSite?: boolean;
  styleNotes?: string;
  availabilityNotes?: string;
  /** True when any number above is an estimate rather than a published figure. */
  estimated?: boolean;
  sourceUrls: string[];
  /** Defaults to "idea". */
  status?: VenueStatus;
}

export interface DestinationSeed {
  /** "brazil" | "jamaica" | "bahamas" | "washington-dc" | "columbia-sc" | "portland-or" */
  key: string;
  name: string;
  country: string;
  /** ISO 3166-1 alpha-2, for the passport-stamp badge. */
  countryCode: string;
  /** Candidate areas within the destination, e.g. "Trancoso (Bahia), Rio de Janeiro, Búzios, Paraty". */
  region?: string;
  /** Display order; 1 is the top choice. */
  rank: number;
  /** One or two sentences on why this is on Joshua & Janel's list. */
  whyHere: string;
  notes?: string;
  /** Round-trip airfare from major US hubs plus three nights of lodging, per guest. */
  travelCostPerGuestEstimate: number;
  lodgingPerNightEstimate: number;
  /** Share of invited guests likely to attend, 0..1. */
  attendanceRateEstimate: number;
  /** Spring 2028 (March-May) conditions. */
  weatherNotes: string;
  /** Always ends with: "Verify with the local authority or an attorney." */
  legalNotes: string;
  seasonNotes: string;
  /** Flights, hubs, visas, drive vs fly, group travel logistics. */
  travelNotes: string;
  sourceUrls: string[];
  venues: VenueSeed[];
  scenario: {
    /** Venue rental + planner + photo/video + music + decor/flowers + stationery + attire + misc for a ~100-guest wedding. */
    fixedCosts: number;
    /** Catering + bar + cake + rentals + favors per attending guest. */
    perGuestCost: number;
    /** Usually equals travelCostPerGuestEstimate. */
    travelCostPerGuest: number;
    attendanceRate: number;
    /** How the numbers were derived, naming the sources. */
    notes: string;
  };
}

export interface BudgetBenchmark {
  /** Matches a budget category name in the app, e.g. "Venue & catering". */
  category: string;
  key: string;
  /** Typical share of total spend, 0..100. */
  percent: number;
  sortOrder: number;
  note: string;
  sourceUrls: string[];
}

export interface SubEventEstimate {
  kind: SubEventKind;
  low: number;
  high: number;
  note: string;
  sourceUrls: string[];
}

export interface Tip {
  text: string;
  sourceUrl: string;
}

export interface CostBenchmarks {
  averageUsWeddingCost: number;
  averageDestinationWeddingCost: number;
  averageGuestCount: number;
  /** Typical US catering cost per guest. */
  perGuestCateringUs: number;
  categories: BudgetBenchmark[];
  subEventEstimates: SubEventEstimate[];
  /** Advice from real couples and planners, each with the thread or article it came from. */
  tips: Tip[];
  sourceUrls: string[];
}
