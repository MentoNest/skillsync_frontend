"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { canAccess, dashboardFor, type AuthResponse, type AuthUser } from "../../lib/auth/authApi";

/** Global auth state with session persistence, logout and protected routes (#1368). */
type AuthState = { user: AuthUser | null; isAuthenticated: boolean; signIn: (r: AuthResponse) => void; logout: () => void };

const KEY = "skillsync.session";
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setUser((JSON.parse(saved) as AuthResponse).user);
    } catch {}
  }, []);

  const signIn = (r: AuthResponse) => {
    localStorage.setItem(KEY, JSON.stringify(r));
    setUser(r.user);
    router.push(dashboardFor(r.user.role));
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const path = usePathname();
  if (!user || !canAccess(user.role, path)) return <p className="p-8 text-center">Please log in to continue.</p>;
  return <>{children}</>;
}
