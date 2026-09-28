/**
 * @jest-environment node
 */
import { getFiltersFromSearchParams, createFilterUrl } from "@/lib/url-filters";

function parse(query: string) {
  return getFiltersFromSearchParams(new URLSearchParams(query));
}

describe("search in URL filters", () => {
  it("parses a query", () => {
    expect(parse("search=react")).toEqual({ search: "react" });
  });

  it("normalizes surrounding and internal whitespace", () => {
    expect(parse("search=%20%20system%20%20%20design%20")).toEqual({
      search: "system design",
    });
  });

  it("ignores a blank query so it is not treated as an active filter", () => {
    expect(parse("search=")).toEqual({});
    expect(parse("search=%20%20")).toEqual({});
  });

  it("parses search alongside other filters", () => {
    expect(parse("search=react&industry=Technology&minRating=4.5")).toEqual({
      search: "react",
      industry: ["Technology"],
      minRating: 4.5,
    });
  });

  it("serializes a query", () => {
    const url = createFilterUrl("/mentors", { search: "react" });
    expect(new URL(url, "http://localhost").searchParams.get("search")).toBe("react");
  });

  it("omits an empty query", () => {
    expect(createFilterUrl("/mentors", { search: "" })).not.toContain("search=");
  });

  it("round-trips a query", () => {
    const url = createFilterUrl("/mentors", { search: "system design" });
    expect(parse(new URL(url, "http://localhost").search)).toEqual({
      search: "system design",
    });
  });

  it("round-trips a query with other filters", () => {
    const url = createFilterUrl("/mentors", { search: "react", industry: ["Technology"] });
    expect(parse(new URL(url, "http://localhost").search)).toEqual({
      search: "react",
      industry: ["Technology"],
    });
  });
});
