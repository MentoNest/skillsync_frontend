"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authService } from "@/lib/auth-service";
import type {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/lib/auth-types";

const STORAGE_KEY = "skillsync_auth";

function loadPersistedState(): Pick<
  AuthState,
  "user" | "token" | "isAuthenticated"
> {
  if (typeof window === "undefined") {
    return { user: null, token: null, isAuthenticated: false };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null, isAuthenticated: false };
    const parsed = JSON.parse(raw);
    if (parsed?.token) {
      return {
        user: parsed.user ?? null,
        token: parsed.token,
        isAuthenticated: true,
      };
    }
    return { user: null, token: null, isAuthenticated: false };
  } catch {
    return { user: null, token: null, isAuthenticated: false };
  }
}

function persistState(user: User | null, token: string | null) {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User }
  | { type: "SET_ERROR"; payload: string | null };

function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload, error: null };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const persisted = loadPersistedState();
  const [state, dispatch] = useReducer(authReducer, {
    user: persisted.user,
    token: persisted.token,
    isAuthenticated: persisted.isAuthenticated,
    isLoading: persisted.isAuthenticated,
    error: null,
  });

  useEffect(() => {
    persistState(state.user, state.token);
  }, [state.user, state.token]);

  useEffect(() => {
    if (!persisted.token) return;
    let cancelled = false;
    authService
      .getMe(persisted.token)
      .then((user) => {
        if (!cancelled) {
          dispatch({ type: "SET_USER", payload: user });
          dispatch({ type: "SET_LOADING", payload: false });
        }
      })
      .catch(() => {
        if (!cancelled) {
          localStorage.removeItem(STORAGE_KEY);
          dispatch({ type: "LOGOUT" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [persisted.token]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await authService.login(credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err instanceof Error ? err.message : "Login failed",
      });
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await authService.register(credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err instanceof Error ? err.message : "Registration failed",
      });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {}
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
