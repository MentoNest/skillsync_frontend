import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  isProtectedRoute,
  isAuthRoute,
  getDashboardPath,
} from "@/lib/auth";

/**
 * middleware.ts
 *
 * Runs at the edge before every matched request.
 *
 * Responsibilities:
 *  1. Unauthenticated users hitting a protected route → redirect to /login
 *  2. Authenticated users hitting an auth route (/login, /register)
 *     → redirect to their role dashboard (prevents double-login)
 *  3. Every other request passes through unchanged.
 *
 * Session format (stored in the HTTP-only cookie `skillsync_session`):
 *   Base64-encoded JSON: { role: 'mentor' | 'mentee' | 'admin' }
 *
 * The LoginPage sets this cookie after successful auth so the middleware
 * can read it on the server without exposing it to client JS.
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read the session cookie (set by the login API / server action)
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value ?? null;

  // Parse role from session — null if absent or malformed
  let role: string | null = null;
  if (sessionCookie) {
    try {
      const decoded = Buffer.from(sessionCookie, "base64").toString("utf-8");
      const parsed = JSON.parse(decoded) as { role?: string };
      role = parsed.role ?? null;
    } catch {
      // Malformed cookie — treat as unauthenticated
    }
  }

  const isAuthenticated = role !== null;

  // ── 1. Protect dashboard routes ──────────────────────────────────────────
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    // Preserve the original destination so we can redirect back after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 2. Redirect authenticated users away from auth pages ─────────────────
  if (isAuthRoute(pathname) && isAuthenticated) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = getDashboardPath(role!);
    dashboardUrl.search = "";
    return NextResponse.redirect(dashboardUrl);
  }

  // ── 3. Role mismatch guard ────────────────────────────────────────────────
  // Prevent a mentee from accessing /mentor, a mentor from /admin, etc.
  if (isAuthenticated && role) {
    const dashboard = getDashboardPath(role);
    // Only enforce if the path is a protected route that doesn't belong to this role
    const mismatch =
      isProtectedRoute(pathname) && !pathname.startsWith(dashboard);

    if (mismatch) {
      const correctedUrl = request.nextUrl.clone();
      correctedUrl.pathname = dashboard;
      correctedUrl.search = "";
      return NextResponse.redirect(correctedUrl);
    }
  }

  return NextResponse.next();
}

// ─── Matcher ──────────────────────────────────────────────────────────────────
// Apply the middleware only to routes that need auth logic.
// Static assets, API routes, and Next.js internals are excluded.
export const config = {
  matcher: [
    "/mentor/:path*",
    "/mentee/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
