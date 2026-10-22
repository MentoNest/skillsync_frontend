/**
 * Compatibility entry point for the shared mentor types.
 *
 * The canonical definitions live in `@/types/mentor` (#1220). New code should
 * import from there directly; this module re-exports the same types so existing
 * imports keep working.
 */
export * from "@/types/mentor";

/**
 * Single source of truth for mentor profile links (#59).
 * Every "View profile" CTA resolves through here so the route
 * `/mentors/[mentorId]` and the id it receives never drift apart.
 */
export function mentorProfileHref(mentorId: string): string {
  return `/mentors/${encodeURIComponent(mentorId)}`;
}
