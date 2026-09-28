/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { GET } from "@/app/api/mentors/route";

interface MentorPayload {
  id: string;
  hourlyRate: number;
}

/** Requests the whole mock set — the route paginates at 12 by default. */
async function fetchMentors(query: string): Promise<MentorPayload[]> {
  const separator = query ? "&" : "";
  const request = new NextRequest(
    `http://localhost:3000/api/mentors?limit=100${separator}${query}`
  );
  const response = await GET(request);
  const body = await response.json();
  return body.mentors;
}

const ALL_RATES = [250, 300, 200, 220, 280, 350, 180, 320, 400, 260, 240, 190, 270, 175, 210];

describe("mentors API hourly rate filtering", () => {
  it("returns everything when no rate filter is applied", async () => {
    const mentors = await fetchMentors("");
    expect(mentors).toHaveLength(ALL_RATES.length);
  });

  it("filters by a maximum rate", async () => {
    const mentors = await fetchMentors("maxHourlyRate=220");
    expect(mentors.length).toBeGreaterThan(0);
    mentors.forEach((m) => expect(m.hourlyRate).toBeLessThanOrEqual(220));
  });

  it("filters by a minimum rate", async () => {
    const mentors = await fetchMentors("minHourlyRate=300");
    expect(mentors.length).toBeGreaterThan(0);
    mentors.forEach((m) => expect(m.hourlyRate).toBeGreaterThanOrEqual(300));
  });

  it("applies both bounds together", async () => {
    const mentors = await fetchMentors("minHourlyRate=200&maxHourlyRate=280");
    mentors.forEach((m) => {
      expect(m.hourlyRate).toBeGreaterThanOrEqual(200);
      expect(m.hourlyRate).toBeLessThanOrEqual(280);
    });
    expect(mentors.length).toBeLessThan(ALL_RATES.length);
  });

  it("swaps an inverted range rather than returning nothing", async () => {
    const inverted = await fetchMentors("minHourlyRate=280&maxHourlyRate=200");
    const ordered = await fetchMentors("minHourlyRate=200&maxHourlyRate=280");

    expect(inverted.map((m) => m.id)).toEqual(ordered.map((m) => m.id));
    expect(inverted.length).toBeGreaterThan(0);
  });

  it("ignores an empty max rather than filtering on a zero bound", async () => {
    const mentors = await fetchMentors("maxHourlyRate=");
    expect(mentors).toHaveLength(ALL_RATES.length);
  });

  it("ignores a non-numeric bound instead of silently matching nothing", async () => {
    const mentors = await fetchMentors("maxHourlyRate=abc");
    expect(mentors).toHaveLength(ALL_RATES.length);
  });

  it("clamps a bound beyond the domain ceiling", async () => {
    const mentors = await fetchMentors("minHourlyRate=9999");
    expect(mentors).toHaveLength(0);
  });

  it("returns everything for a zero bound", async () => {
    const mentors = await fetchMentors("minHourlyRate=0");
    expect(mentors).toHaveLength(ALL_RATES.length);
  });

  it("combines the rate range with another filter", async () => {
    const mentors = await fetchMentors("industry=Technology&maxHourlyRate=220");
    expect(mentors.length).toBeGreaterThan(0);
    mentors.forEach((m) => expect(m.hourlyRate).toBeLessThanOrEqual(220));
  });
});
