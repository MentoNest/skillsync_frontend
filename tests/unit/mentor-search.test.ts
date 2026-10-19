import {
  MAX_SEARCH_LENGTH,
  getSearchTerms,
  hasSearchTerm,
  mentorMatchesSearch,
  normalizeSearchTerm,
} from "@/lib/mentor-search";

const MENTOR = {
  name: "Priya Sharma",
  headline: "Senior Data Scientist at Netflix",
  skills: ["Machine Learning", "Python", "MLOps"],
};

describe("normalizeSearchTerm", () => {
  it("trims surrounding whitespace", () => {
    expect(normalizeSearchTerm("  react  ")).toBe("react");
  });

  it("collapses internal whitespace", () => {
    expect(normalizeSearchTerm("system    design")).toBe("system design");
  });

  it("returns an empty string for nullish or blank input", () => {
    expect(normalizeSearchTerm(undefined)).toBe("");
    expect(normalizeSearchTerm(null)).toBe("");
    expect(normalizeSearchTerm("")).toBe("");
    expect(normalizeSearchTerm("   ")).toBe("");
  });

  it("caps the query length", () => {
    const long = "a".repeat(MAX_SEARCH_LENGTH + 50);
    expect(normalizeSearchTerm(long)).toHaveLength(MAX_SEARCH_LENGTH);
  });
});

describe("getSearchTerms", () => {
  it("splits on whitespace and lowercases", () => {
    expect(getSearchTerms("System DESIGN")).toEqual(["system", "design"]);
  });

  it("returns no terms for a blank query", () => {
    expect(getSearchTerms("   ")).toEqual([]);
  });
});

describe("hasSearchTerm", () => {
  it("detects a real query", () => {
    expect(hasSearchTerm({ search: "react" })).toBe(true);
  });

  it("ignores blank queries", () => {
    expect(hasSearchTerm({ search: "   " })).toBe(false);
    expect(hasSearchTerm({})).toBe(false);
  });
});

describe("mentorMatchesSearch", () => {
  it("matches everything when the query is blank", () => {
    expect(mentorMatchesSearch(MENTOR, "")).toBe(true);
    expect(mentorMatchesSearch(MENTOR, "   ")).toBe(true);
    expect(mentorMatchesSearch(MENTOR, undefined)).toBe(true);
  });

  it("matches on name", () => {
    expect(mentorMatchesSearch(MENTOR, "priya")).toBe(true);
    expect(mentorMatchesSearch(MENTOR, "sharma")).toBe(true);
  });

  it("matches on headline", () => {
    expect(mentorMatchesSearch(MENTOR, "netflix")).toBe(true);
    expect(mentorMatchesSearch(MENTOR, "scientist")).toBe(true);
  });

  it("matches on a skill", () => {
    expect(mentorMatchesSearch(MENTOR, "Python")).toBe(true);
    expect(mentorMatchesSearch(MENTOR, "mlops")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(mentorMatchesSearch(MENTOR, "PRiya")).toBe(true);
    expect(mentorMatchesSearch(MENTOR, "MACHINE learning")).toBe(true);
  });

  it("requires every term to match, across any field", () => {
    expect(mentorMatchesSearch(MENTOR, "priya python")).toBe(true);
    expect(mentorMatchesSearch(MENTOR, "priya kubernetes")).toBe(false);
  });

  it("rejects a mentor with no match in any field", () => {
    expect(mentorMatchesSearch(MENTOR, "kubernetes")).toBe(false);
  });

  it("does not match on unrelated fields", () => {
    const withBio = { ...MENTOR, bio: "Kubernetes operator" } as never;
    expect(mentorMatchesSearch(withBio, "kubernetes")).toBe(false);
  });
});
