import {
  DEFAULT_DISCUSSION_SORT,
  DISCUSSION_SORT_OPTIONS,
  compareDiscussions,
  normalizeDiscussionSort,
  sortDiscussions,
} from "@/lib/community-sort";
import type { Discussion } from "@/lib/community-types";

function makeDiscussion(
  id: string,
  overrides: Partial<Discussion> = {}
): Discussion {
  return {
    id,
    title: `Discussion ${id}`,
    content: "Body",
    authorId: "user-1",
    authorName: "Alice Johnson",
    category: "general",
    tags: [],
    likeCount: 0,
    replyCount: 0,
    viewCount: 0,
    isPinned: false,
    isLocked: false,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

const ids = (discussions: Discussion[]) => discussions.map((d) => d.id);

describe("DISCUSSION_SORT_OPTIONS", () => {
  it("exposes the four supported sort modes in UI order", () => {
    expect(DISCUSSION_SORT_OPTIONS).toEqual([
      { value: "trending", label: "Trending" },
      { value: "latest", label: "Latest" },
      { value: "most-replies", label: "Most Replies" },
      { value: "most-liked", label: "Most Liked" },
    ]);
  });
});

describe("normalizeDiscussionSort", () => {
  it("maps the legacy popular alias to most-liked", () => {
    expect(normalizeDiscussionSort("popular")).toBe("most-liked");
  });

  it("falls back to the default for missing or unknown values", () => {
    expect(normalizeDiscussionSort(undefined)).toBe(DEFAULT_DISCUSSION_SORT);
    expect(normalizeDiscussionSort("")).toBe(DEFAULT_DISCUSSION_SORT);
    expect(normalizeDiscussionSort("newest")).toBe(DEFAULT_DISCUSSION_SORT);
  });

  it("keeps supported values unchanged", () => {
    expect(normalizeDiscussionSort("trending")).toBe("trending");
    expect(normalizeDiscussionSort("most-replies")).toBe("most-replies");
  });
});

describe("sortDiscussions", () => {
  it("sorts latest by createdAt descending", () => {
    const list = [
      makeDiscussion("older", { createdAt: "2026-01-01T00:00:00.000Z" }),
      makeDiscussion("newest", { createdAt: "2026-03-01T00:00:00.000Z" }),
      makeDiscussion("middle", { createdAt: "2026-02-01T00:00:00.000Z" }),
    ];

    expect(ids(sortDiscussions(list, "latest"))).toEqual([
      "newest",
      "middle",
      "older",
    ]);
  });

  it("sorts most-replies by replyCount descending", () => {
    const list = [
      makeDiscussion("few", { replyCount: 1 }),
      makeDiscussion("many", { replyCount: 9 }),
      makeDiscussion("some", { replyCount: 4 }),
    ];

    expect(ids(sortDiscussions(list, "most-replies"))).toEqual([
      "many",
      "some",
      "few",
    ]);
  });

  it("sorts most-liked by likeCount descending", () => {
    const list = [
      makeDiscussion("few", { likeCount: 2 }),
      makeDiscussion("many", { likeCount: 12 }),
      makeDiscussion("some", { likeCount: 7 }),
    ];

    expect(ids(sortDiscussions(list, "most-liked"))).toEqual([
      "many",
      "some",
      "few",
    ]);
  });

  it("ranks trending by weighted engagement", () => {
    const list = [
      makeDiscussion("quiet", { likeCount: 1, replyCount: 0, viewCount: 10 }),
      makeDiscussion("chatty", { likeCount: 0, replyCount: 10, viewCount: 0 }),
      makeDiscussion("liked", { likeCount: 20, replyCount: 0, viewCount: 0 }),
    ];

    // chatty = 30, liked = 40, quiet = 7
    expect(ids(sortDiscussions(list, "trending"))).toEqual([
      "liked",
      "chatty",
      "quiet",
    ]);
  });

  it("breaks ties deterministically by recency and then id", () => {
    const list = [
      makeDiscussion("b", {
        likeCount: 5,
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
      makeDiscussion("a", {
        likeCount: 5,
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
      makeDiscussion("newer", {
        likeCount: 5,
        createdAt: "2026-02-01T00:00:00.000Z",
      }),
    ];

    expect(ids(sortDiscussions(list, "most-liked"))).toEqual([
      "newer",
      "a",
      "b",
    ]);
  });

  it("does not mutate the input array", () => {
    const list = [
      makeDiscussion("first", { likeCount: 1 }),
      makeDiscussion("second", { likeCount: 2 }),
    ];

    sortDiscussions(list, "most-liked");

    expect(ids(list)).toEqual(["first", "second"]);
  });

  it("exposes a comparator usable for custom sorting", () => {
    const list = [
      makeDiscussion("one", { replyCount: 1 }),
      makeDiscussion("two", { replyCount: 2 }),
    ];

    expect([...list].sort(compareDiscussions("most-replies"))[0].id).toBe("two");
  });
});
