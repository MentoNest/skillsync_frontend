/**
 * @jest-environment node
 */
import { getFiltersFromSearchParams, createFilterUrl } from "@/lib/url-filters";

function parse(query: string) {
  return getFiltersFromSearchParams(new URLSearchParams(query));
}

describe("getFiltersFromSearchParams hourly rate bounds", () => {
  it("reads both bounds", () => {
    expect(parse("minHourlyRate=100&maxHourlyRate=200")).toEqual({
      minHourlyRate: 100,
      maxHourlyRate: 200,
    });
  });

  it("reads a single bound", () => {
    expect(parse("minHourlyRate=150")).toEqual({ minHourlyRate: 150 });
    expect(parse("maxHourlyRate=150")).toEqual({ maxHourlyRate: 150 });
  });

  it("keeps a legitimate zero bound", () => {
    expect(parse("minHourlyRate=0")).toEqual({ minHourlyRate: 0 });
  });

  it("ignores empty values", () => {
    expect(parse("minHourlyRate=&maxHourlyRate=")).toEqual({});
  });

  it("ignores non-numeric values instead of storing NaN", () => {
    const filters = parse("minHourlyRate=abc&maxHourlyRate=xyz");
    expect(filters).toEqual({});
    expect(filters.minHourlyRate).toBeUndefined();
    expect(Number.isNaN(filters.minHourlyRate as unknown as number)).toBe(false);
  });

  it("ignores a partially malformed pair but keeps the valid one", () => {
    expect(parse("minHourlyRate=abc&maxHourlyRate=200")).toEqual({ maxHourlyRate: 200 });
  });

  it("still parses existing non-numeric params", () => {
    expect(parse("sortBy=rating&sortOrder=desc")).toEqual({
      sortBy: "rating",
      sortOrder: "desc",
    });
  });

  it("still parses array params", () => {
    expect(parse("industry=Technology,Finance")).toEqual({
      industry: ["Technology", "Finance"],
    });
  });
});

describe("createFilterUrl hourly rate bounds", () => {
  it("serializes both bounds", () => {
    const url = createFilterUrl("/mentors", { minHourlyRate: 100, maxHourlyRate: 200 });
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("minHourlyRate")).toBe("100");
    expect(params.get("maxHourlyRate")).toBe("200");
  });

  it("omits absent bounds", () => {
    const url = createFilterUrl("/mentors", { minHourlyRate: 100 });
    expect(url).not.toContain("maxHourlyRate");
  });

  it("round-trips a range through the URL", () => {
    const url = createFilterUrl("/mentors", { minHourlyRate: 120, maxHourlyRate: 480 });
    const query = new URL(url, "http://localhost").search;
    expect(parse(query)).toEqual({ minHourlyRate: 120, maxHourlyRate: 480 });
  });
});
