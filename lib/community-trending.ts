import type { Discussion } from "./community-types";

/**
 * Trending engagement helpers (#985).
 *
 * The discussions API ranks the `trending` sort with this same weighted score
 * (likes ×2, replies ×3, views ×0.5) so the badge shown on a card agrees with
 * the order of the trending feed.
 */

type EngagementInput = Pick<
  Discussion,
  "likeCount" | "replyCount" | "viewCount"
>;

/** Weighted engagement score used by the `trending` sort and the badge. */
export function getEngagementScore(discussion: EngagementInput): number {
  return (
    (discussion.likeCount ?? 0) * 2 +
    (discussion.replyCount ?? 0) * 3 +
    (discussion.viewCount ?? 0) * 0.5
  );
}

/**
 * Score at or above which a discussion is considered trending.
 * Chosen so a discussion needs a combination of likes, replies and views
 * rather than a single spike in one metric.
 */
export const TRENDING_SCORE_THRESHOLD = 80;

/** Whether a discussion warrants the trending badge. */
export function isTrendingDiscussion(discussion: EngagementInput): boolean {
  return getEngagementScore(discussion) >= TRENDING_SCORE_THRESHOLD;
}
