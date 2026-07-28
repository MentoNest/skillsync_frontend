/**
 * lib/auth.ts
 *
 * Central place for auth-related types, constants, and pure helpers.
 * No runtime state lives here — keep this import-safe for both server
 * and client code.
 */

// ─── Role ────────────────────────────────────────────────────────────────────

export type UserRole = 'mentor' | 'mentee' | 'admin';

// ─── Dashboard routes per role ───────────────────────────────────────────────

/**
 * The canonical dashboard path for each role.
 * Used by the login page after a successful auth and by middleware to
 * redirect already-authenticated users away from auth pages.
 */
export const ROLE_DASHBOARD: Record<UserRole, string> = {
  mentor: '/mentor',
  mentee: '/mentee',
  admin: '/admin',
};

// ─── Protected route prefixes ────────────────────────────────────────────────

/**
 * URL prefixes that require authentication.
 * Middleware checks every incoming request against this list.
 */
export const PROTECTED_PREFIXES: string[] = [
  '/mentor',
  '/mentee',
  '/admin',
  '/dashboard',
];

/**
 * URL prefixes that are only for unauthenticated users
 * (auth pages redirect away if the user is already logged in).
 */
export const AUTH_PREFIXES: string[] = ['/login', '/register'];

// ─── Session cookie name ─────────────────────────────────────────────────────

/**
 * Name of the HTTP-only session cookie set by the server after login.
 * Middleware reads this cookie to determine auth state without touching
 * client-side storage.
 */
export const SESSION_COOKIE = 'skillsync_session';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns true if the pathname requires the user to be authenticated. */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/** Returns true if the pathname is an auth-only route (login / register). */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/** Returns the correct dashboard path for a given role string.
 *  Falls back to '/' if the role is unknown. */
export function getDashboardPath(role: string): string {
  return ROLE_DASHBOARD[role as UserRole] ?? '/';
}
