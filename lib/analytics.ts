/**
 * Lightweight analytics tracking for SkillSync user interactions
 * (#865). Currently logs events to the console; swap the transport in
 * `trackEvent` for a real analytics provider (e.g. PostHog, Segment) when
 * one is wired up.
 */

export type AnalyticsEventName =
  | "mentor_search"
  | "mentor_filter_used"
  | "mentor_profile_click"
  | "mentor_bookmark"
  | "discussion_view"
  | "discussion_like"
  | "discussion_post"
  | "discussion_reply"
  | "discussion_search"
  | "discussion_sort_changed"
  | "discussion_reported"
  | "discussion_category_filter"
  | "moderation_action"
  | "community_page_view";

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
