/**
 * Quick-add options per `Priority.area`, shown as toggle pills above the free-text box in
 * `PrioritiesCard`. A pill's "on" state is just "a priority with this exact label already exists
 * for this area" — clicking it calls the same `onAdd`/`onRemove` the free-text flow uses, so
 * there's no separate preset-tracking state. Free text still covers anything not listed here.
 */
export const PRESET_PRIORITIES: Record<string, string[]> = {
  Venue: [
    "Outdoor ceremony option",
    "On-site lodging for guests",
    "Rain backup plan",
    "In-house catering allowed",
    "Dance floor / late-night space",
    "Accessible for all guests",
  ],
  Budget: [
    "Payment plan available",
    "All-inclusive package",
    "Room block / group discount",
    "No hidden fees",
    "Vendor deposits refundable",
  ],
};
