"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getDashboardPath, type AuthUser, type UserRole } from "@/lib/auth";

const AUTH_STORAGE_KEY = "skillsync-user";

interface AuthContextValue {
  user: AuthUser | null;
  isReady: boolean;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) setUser(JSON.parse(storedUser) as AuthUser);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  function signIn(authenticatedUser: AuthUser) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  }

  function signOut() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isReady, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function RoleGuard({
  role,
  children,
}: {
  role: UserRole;
  children: ReactNode;
}) {
  const { user, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!user) router.replace("/login");
    else if (user.role !== role) router.replace(getDashboardPath(user.role));
  }, [isReady, role, router, user]);

  if (!isReady || user?.role !== role) return null;
  return children;
}