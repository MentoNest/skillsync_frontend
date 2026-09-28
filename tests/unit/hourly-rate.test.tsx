import {
  HOURLY_RATE_DOMAIN_MAX,
  HOURLY_RATE_DOMAIN_MIN,
  hasHourlyRateRange,
  normalizeHourlyRateRange,
} from "@/lib/hourly-rate";

describe("normalizeHourlyRateRange", () => {
  it("passes through a valid in-range pair untouched", () => {
    expect(normalizeHourlyRateRange({ min: 100, max: 300 })).toEqual({
      min: 100,
      max: 300,
    });
  });

  it("keeps an open-ended range", () => {
    expect(normalizeHourlyRateRange({ min: 100 })).toEqual({
      min: 100,
      max: undefined,
    });
    expect(normalizeHourlyRateRange({ max: 100 })).toEqual({
      min: undefined,
      max: 100,
    });
  });

  describe("valid range is enforced", () => {
    it("swaps an inverted range instead of discarding it", () => {
      expect(normalizeHourlyRateRange({ min: 400, max: 150 })).toEqual({
        min: 150,
        max: 400,
      });
    });

    it("clamps values above the domain ceiling", () => {
      expect(normalizeHourlyRateRange({ min: 50, max: 9999 }).max).toBe(
        HOURLY_RATE_DOMAIN_MAX
      );
    });

    it("clamps values below the domain floor", () => {
      expect(normalizeHourlyRateRange({ min: -80, max: 200 }).min).toBe(
        HOURLY_RATE_DOMAIN_MIN
      );
    });

    it("snaps values onto the step grid", () => {
      expect(normalizeHourlyRateRange({ min: 137 })).toEqual({ min: 135, max: undefined });
    });

    it("does not snap past the ceiling", () => {
      const result = normalizeHourlyRateRange(
        { max: 499 },
        { domainMax: 500, step: 5 }
      );
      expect(result.max).toBeLessThanOrEqual(500);
    });

    it("keeps a zero bound rather than treating it as unset", () => {
      expect(normalizeHourlyRateRange({ min: 0 })).toEqual({
        min: 0,
        max: undefined,
      });
    });

    it("honours a custom domain and step", () => {
      expect(
        normalizeHourlyRateRange(
          { min: 30, max: 90 },
          { domainMin: 20, domainMax: 80, step: 10 }
        )
      ).toEqual({ min: 30, max: 80 });
    });
  });

  describe("unusable input is dropped", () => {
    it.each([
      ["null", null],
      ["undefined", undefined],
      ["empty string", ""],
      ["a word", "abc"],
    ])("treats %s as no filter", (_label, value) => {
      const result = normalizeHourlyRateRange({
        min: value as unknown as number,
        max: value as unknown as number,
      });
      expect(result).toEqual({ min: undefined, max: undefined });
    });

    it("drops NaN and Infinity", () => {
      expect(normalizeHourlyRateRange({ min: NaN, max: Infinity })).toEqual({
        min: undefined,
        max: undefined,
      });
    });

    it("parses numeric strings", () => {
      expect(
        normalizeHourlyRateRange({
          min: "150" as unknown as number,
          max: "350" as unknown as number,
        })
      ).toEqual({ min: 150, max: 350 });
    });
  });

  it("survives a zero step without dividing by zero", () => {
    expect(() => normalizeHourlyRateRange({ min: 100 }, { step: 0 })).not.toThrow();
    expect(normalizeHourlyRateRange({ min: 100 }, { step: 0 }).min).toBe(100);
  });
});

describe("hasHourlyRateRange", () => {
  it("is false when neither bound is set", () => {
    expect(hasHourlyRateRange({})).toBe(false);
    expect(hasHourlyRateRange({ min: undefined, max: undefined })).toBe(false);
  });

  it("is true when either bound is set", () => {
    expect(hasHourlyRateRange({ min: 100 })).toBe(true);
    expect(hasHourlyRateRange({ max: 100 })).toBe(true);
  });

  it("is true for a zero bound", () => {
    expect(hasHourlyRateRange({ min: 0 })).toBe(true);
  });
});
