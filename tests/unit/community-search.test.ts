import {
  MAX_SEARCH_QUERY_LENGTH,
  filterDiscussionsBySearch,
  getCategoryDisplayName,
  matchesDiscussionSearch,
  normalizeSearchQuery,
  type SearchableDiscussion,
} from "@/lib/community-search";

type TestDiscussion = SearchableDiscussion & { id: string };

function makeDiscussion(
  overrides: Partial<TestDiscussion> = {}
): TestDiscussion {
  return {
    id: "d1",
    title: "Getting started with React",
    content: "Share your favourite patterns for state management.",
    authorName: "Alice Johnson",
    category: "technical",
    tags: ["react", "frontend"],
    ...overrides,
  };
}

describe("community discussion search (#1247)", () => {
  describe("normalizeSearchQuery", () => {
    it("trims and collapses whitespace", () => {
      expect(normalizeSearchQuery("  react   hooks  ")).toBe("react hooks");
    });

    it("returns an empty string for blank or missing input", () => {
      expect(normalizeSearchQuery("")).toBe("");
      expect(normalizeSearchQuery("   ")).toBe("");
      expect(normalizeSearchQuery(undefined)).toBe("");
      expect(normalizeSearchQuery(null)).toBe("");
    });

    it("caps queries at the maximum length", () => {
      const longQuery = "a".repeat(MAX_SEARCH_QUERY_LENGTH + 50);
      expect(normalizeSearchQuery(longQuery)).toHaveLength(
        MAX_SEARCH_QUERY_LENGTH
      );
    });
  });

  describe("matchesDiscussionSearch", () => {
    it("matches everything when the query is empty", () => {
      expect(matchesDiscussionSearch(makeDiscussion(), "")).toBe(true);
      expect(matchesDiscussionSearch(makeDiscussion(), "   ")).toBe(true);
    });

    it("matches the title case-insensitively", () => {
      expect(matchesDiscussionSearch(makeDiscussion(), "REACT")).toBe(true);
      expect(matchesDiscussionSearch(makeDiscussion(), "react")).toBe(true);
    });

    it("matches the content case-insensitively", () => {
      expect(
        matchesDiscussionSearch(makeDiscussion(), "FAVOURITE PATTERNS")
      ).toBe(true);
    });

    it("matches the author case-insensitively", () => {
      expect(matchesDiscussionSearch(makeDiscussion(), "alice")).toBe(true);
      expect(matchesDiscussionSearch(makeDiscussion(), "ALICE JOHNSON")).toBe(
        true
      );
    });

    it("matches the category id and display name case-insensitively", () => {
      expect(matchesDiscussionSearch(makeDiscussion(), "technical")).toBe(true);
      expect(matchesDiscussionSearch(makeDiscussion(), "TECHNICAL")).toBe(true);
      expect(
        matchesDiscussionSearch(
          makeDiscussion({
            title: "Weekly sync",
            content: "Share your updates.",
            authorName: "Alice Johnson",
            category: "career",
          }),
          "CAREER"
        )
      ).toBe(true);
    });

    it("requires every term of a multi-word query to match", () => {
      expect(
        matchesDiscussionSearch(makeDiscussion(), "getting STATE")
      ).toBe(true);
      expect(
        matchesDiscussionSearch(makeDiscussion(), "getting nonexistent")
      ).toBe(false);
    });

    it("returns false when nothing matches", () => {
      expect(matchesDiscussionSearch(makeDiscussion(), "cobol")).toBe(false);
    });
  });

  describe("filterDiscussionsBySearch", () => {
    const discussions = [
      makeDiscussion({ id: "1", title: "React patterns" }),
      makeDiscussion({
        id: "2",
        title: "Career growth",
        content: "Negotiation tips.",
        authorName: "Bob Smith",
        category: "career",
        tags: [],
      }),
      makeDiscussion({
        id: "3",
        title: "Mentoring basics",
        content: "Finding the right mentor.",
        authorName: "Carol Williams",
        category: "mentoring",
        tags: [],
      }),
    ];

    it("returns the original list for a blank query", () => {
      expect(filterDiscussionsBySearch(discussions, "")).toEqual(discussions);
    });

    it("filters by title", () => {
      expect(
        filterDiscussionsBySearch(discussions, "REACT").map((d) => d.id)
      ).toEqual(["1"]);
    });

    it("filters by author", () => {
      expect(
        filterDiscussionsBySearch(discussions, "bob").map((d) => d.id)
      ).toEqual(["2"]);
    });

    it("filters by category", () => {
      expect(
        filterDiscussionsBySearch(discussions, "mentoring").map((d) => d.id)
      ).toEqual(["3"]);
    });

    it("returns an empty list when there are no matches", () => {
      expect(filterDiscussionsBySearch(discussions, "cobol")).toEqual([]);
    });
  });

  describe("getCategoryDisplayName", () => {
    it("resolves known category ids to their display names", () => {
      expect(getCategoryDisplayName("technical")).toBe("Technical");
      expect(getCategoryDisplayName("career")).toBe("Career");
    });

    it("falls back to the id for unknown categories", () => {
      expect(getCategoryDisplayName("unknown")).toBe("unknown");
    });
  });
});
