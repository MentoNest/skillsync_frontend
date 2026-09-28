/**
 * Hourly rate range filtering (#53).
 *
 * The client (HourlyRateFilter) and the mentors API both run the input
 * through `normalizeHourlyRateRange`, so a range that survives the URL
 * round-trip is the same range the server filters on.
 */

export const HOURLY_RATE_DOMAIN_MIN = 0;
export const HOURLY_RATE_DOMAIN_MAX = 500;
export const HOURLY_RATE_STEP = 5;

export interface HourlyRateRange {
  min?: number;
  max?: number;
}

interface NormalizeOptions {
  domainMin?: number;
  domainMax?: number;
  step?: number;
}

/**
 * Coerce one bound to a usable number, or `undefined` when it should be
 * treated as "no filter". `null`, `""` and `NaN` all mean unset, which is
 * what keeps `?maxHourlyRate=` from filtering on a `NaN` comparison.
 */
function coerceBound(
  value: number | string | null | undefined,
  domainMin: number,
  domainMax: number,
  step: number
): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;

  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return undefined;

  const clamped = Math.min(Math.max(parsed, domainMin), domainMax);
  const snapped = Math.round(clamped / step) * step;

  // Re-clamp: rounding to the step can push the value past the ceiling.
  return Math.min(Math.max(snapped, domainMin), domainMax);
}

/**
 * Enforce a valid range. Out-of-domain values are clamped to the step
 * grid, and an inverted range (min > max) is swapped rather than
 * discarded, so the user's intent survives instead of silently
 * returning nothing.
 */
export function normalizeHourlyRateRange(
  range: HourlyRateRange,
  {
    domainMin = HOURLY_RATE_DOMAIN_MIN,
    domainMax = HOURLY_RATE_DOMAIN_MAX,
    step = HOURLY_RATE_STEP,
  }: NormalizeOptions = {}
): HourlyRateRange {
  const safeStep = step > 0 ? step : 1;

  let min = coerceBound(range.min, domainMin, domainMax, safeStep);
  let max = coerceBound(range.max, domainMin, domainMax, safeStep);

  if (min !== undefined && max !== undefined && min > max) {
    [min, max] = [max, min];
  }

  return { min, max };
}

/** True when at least one bound is set — used for active-filter counts. */
export function hasHourlyRateRange(range: HourlyRateRange): boolean {
  return range.min !== undefined || range.max !== undefined;
}
