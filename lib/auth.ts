export type UserRole = "mentor" | "mentee" | "admin";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  role: UserRole;
}

export function normalizeRole(value: unknown): UserRole | null {
  if (typeof value !== "string") return null;

  const role = value.toLowerCase();
  return role === "mentor" || role === "mentee" || role === "admin"
    ? role
    : null;
}

export function getDashboardPath(role: UserRole): string {
  return `/${role}`;
}

export function getAuthUser(
  payload: unknown,
  fallbackEmail?: string,
): AuthUser | null {
  if (!payload || typeof payload !== "object") return null;

  const response = payload as Record<string, unknown>;
  const candidate =
    response.user && typeof response.user === "object"
      ? (response.user as Record<string, unknown>)
      : response;
  const role = normalizeRole(candidate.role);

  if (!role) return null;

  return {
    ...(typeof candidate.id === "string" ? { id: candidate.id } : {}),
    ...(typeof candidate.name === "string" ? { name: candidate.name } : {}),
    ...(typeof candidate.email === "string"
      ? { email: candidate.email }
      : fallbackEmail
        ? { email: fallbackEmail }
        : {}),
    role,
  };
}