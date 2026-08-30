import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const role = request.cookies.get("user-role")?.value;
  const { pathname } = request.nextUrl;

  // 1. If no token, and trying to access ANY protected route, go to login
  const isProtectedRoute = pathname.startsWith("/mentor") || 
                           pathname.startsWith("/mentee") || 
                           pathname.startsWith("/admin") ||
                           pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Role-Based Enforcement (The core of #811)
  if (pathname.startsWith("/mentor") && role !== "mentor") {
    return NextResponse.redirect(new URL("/mentee", request.url)); // Send to their own dashboard
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url)); 
  }

  if (pathname.startsWith("/mentee") && role !== "mentee") {
    return NextResponse.redirect(new URL("/mentor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mentor/:path*", "/mentee/:path*", "/admin/:path*", "/dashboard/:path*"],
};
