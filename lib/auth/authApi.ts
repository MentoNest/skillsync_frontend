/** Auth API calls (#1366) and role-based redirects (#1367). */
export type Role = "mentor" | "mentee" | "admin";
export type AuthUser = { id: string; name: string; email: string; role: Role };
export type AuthResponse = { token: string; user: AuthUser };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message ?? `Request failed (${res.status})`);
  return data as T;
}

export const login = (email: string, password: string) =>
  post<AuthResponse>("/auth/login", { email, password });

export const register = (fullName: string, email: string, password: string) =>
  post<AuthResponse>("/auth/register", { fullName, email, password });

const DASHBOARDS: Record<Role, string> = { mentor: "/mentor", mentee: "/mentee", admin: "/admin" };

export function dashboardFor(role?: string): string {
  return DASHBOARDS[role as Role] ?? "/login";
}

/** True when a user's role may open the given dashboard path. */
export function canAccess(role: Role | undefined, path: string): boolean {
  const owner = (Object.keys(DASHBOARDS) as Role[]).find((r) => path.startsWith(DASHBOARDS[r]));
  return !owner || owner === role;
}
