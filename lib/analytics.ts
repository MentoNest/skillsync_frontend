/**
 * Lightweight analytics tracking for Mentor Discovery user interactions
 * (#865). Currently logs events to the console; swap the transport in
 * `trackEvent` for a real analytics provider (e.g. PostHog, Segment) when
 * one is wired up.
 */

export type AnalyticsEventName =
  | "mentor_search"
  | "mentor_filter_used"
  | "mentor_profile_click"
  | "mentor_bookmark";

export type AnalyticsEventPayload = Record<
  string,
  string | number | boolean | string[] | undefined
>;

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsEventPayload = {},
): void {
  const event = {
    name,
    payload,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", event);
  }
}
