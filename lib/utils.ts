/**
 * Utility helpers for SkillSync
 */

/**
 * Joins class names, filtering out falsy values.
 * Lightweight alternative to clsx for simple use cases.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
