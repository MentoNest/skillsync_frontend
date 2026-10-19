/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { GET } from "@/app/api/mentors/route";

interface MentorPayload {
  id: string;
  name: string;
  headline: string;
  skills: string[];
  industry: string;
  hourlyRate: number;
}

async function search(query: string): Promise<MentorPayload[]> {
  const separator = query ? "&" : "";
  const request = new NextRequest(
    `http://localhost:3000/api/mentors?limit=100${separator}${query}`
  );
  const response = await GET(request);
  const body = await response.json();
  return body.mentors;
}

const BASELINE_COUNT = 15;

describe("mentors API search", () => {
  it("returns everything when no query is supplied", async () => {
    expect(await search("")).toHaveLength(BASELINE_COUNT);
  });

  it("returns everything for a blank query", async () => {
    expect(await search("search=")).toHaveLength(BASELINE_COUNT);
    expect(await search("search=%20%20")).toHaveLength(BASELINE_COUNT);
  });

  it("narrows results for a real query", async () => {
    const results = await search("search=kubernetes");
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThan(BASELINE_COUNT);
  });

  it("matches on name", async () => {
    const results = await search("search=priya");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((m) => {
      const haystack = [m.name, m.headline, ...m.skills].join(" ").toLowerCase();
      expect(haystack).toContain("priya");
    });
  });

  it("matches on a skill", async () => {
    const results = await search("search=Kubernetes");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((m) => expect(m.skills.join(" ").toLowerCase()).toContain("kubernetes"));
  });

  it("matches on headline", async () => {
    const results = await search("search=Stripe");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((m) => expect(m.headline.toLowerCase()).toContain("stripe"));
  });

  it("is case-insensitive", async () => {
    const lower = await search("search=figma");
    const upper = await search("search=FIGMA");
    expect(upper.map((m) => m.id)).toEqual(lower.map((m) => m.id));
  });

  it("requires every term to match", async () => {
    const both = await search("search=priya python");
    const neither = await search("search=priya kubernetes");

    expect(both.length).toBeGreaterThan(0);
    expect(neither).toHaveLength(0);
  });

  it("returns nothing for a query that matches no mentor", async () => {
    expect(await search("search=zzzznotamentor")).toHaveLength(0);
  });

  it("combines with another filter", async () => {
    const results = await search("search=priya&industry=Technology");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((m) => {
      const haystack = [m.name, m.headline, ...m.skills].join(" ").toLowerCase();
      expect(haystack).toContain("priya");
      expect(m.industry).toBe("Technology");
    });
  });

  it("intersects with a conflicting filter", async () => {
    const results = await search("search=priya&industry=Finance");
    expect(results).toHaveLength(0);
  });

  it("combines with a numeric filter", async () => {
    const results = await search("search=design&maxHourlyRate=210");
    results.forEach((m) => {
      expect(m.hourlyRate).toBeLessThanOrEqual(210);
    });
  });

  it("normalizes surrounding whitespace in the query", async () => {
    const padded = await search("search=%20figma%20");
    const plain = await search("search=figma");
    expect(padded.map((m) => m.id)).toEqual(plain.map((m) => m.id));
  });

  it("reports the filtered total rather than the unfiltered count", async () => {
    const request = new NextRequest("http://localhost:3000/api/mentors?search=figma");
    const response = await GET(request);
    const body = await response.json();
    expect(body.total).toBe(body.mentors.length);
    expect(body.total).toBeLessThan(BASELINE_COUNT);
  });
});
