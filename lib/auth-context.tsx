'use client';

/**
 * lib/auth-context.tsx
 *
 * Provides a lightweight auth context for client components.
 *
 * In a production app this would call a real API / session endpoint.
 * Here we store role in localStorage so the redirect demo works end-to-end
 * without a backend, while keeping the interface clean for a real
 * implementation to drop in later.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import type { UserRole } from '@/lib/auth';
import { getDashboardPath } from '@/lib/auth';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  /** True while the initial session is being resolved */
  loading: boolean;
  /** Simulate a login; role drives the redirect destination */
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'skillsync_user';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate user from localStorage on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as AuthUser);
      }
    } catch {
      // Ignore parse errors — treat as logged out
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * login — authenticate the user and redirect to their role dashboard.
   *
   * Replace the body of this function with a real API call when a backend
   * is available. The caller (LoginPage) only needs to call login(); the
   * redirect happens here so the logic is centralised and testable.
   */
  const login = useCallback(
    async (email: string, _password: string, role: UserRole) => {
      // ── Simulated successful auth response ──────────────────────────────
      const authedUser: AuthUser = {
        id: crypto.randomUUID(),
        name: email.split('@')[0],
        email,
        role,
      };

      // Persist to localStorage so the session survives a page refresh
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authedUser));
      setUser(authedUser);

      // ── Role-based redirect ─────────────────────────────────────────────
      const destination = getDashboardPath(role);
      router.push(destination);
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useAuth — access the current auth state from any client component.
 *
 * @throws if used outside of <AuthProvider>
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}
