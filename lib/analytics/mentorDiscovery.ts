export type MentorDiscoveryEvent =
  | "mentor_search"
  | "mentor_filter_used"
  | "mentor_sort_changed"
  | "mentor_profile_click"
  | "mentor_bookmark"
  | "mentor_compare";

type EventPayload = Record<string, string | number | boolean | string[]>;

export function trackMentorDiscoveryEvent(
  event: MentorDiscoveryEvent,
  payload: EventPayload = {}
): void {
  if (typeof window === "undefined") return;

  const tracker = (
    window as Window & {
      dataLayer?: Array<Record<string, unknown>>;
    }
  ).dataLayer;

  tracker?.push({
    event,
    ...payload,
    timestamp: Date.now(),
  });
}
