const FOLLOWED_AUTHORS_KEY = "skillsync.community.followed-authors";
const REPORTS_KEY = "skillsync.community.reports";
const SESSION_KEY = "skillsync.session";
const listeners = new Set<() => void>();

export type CommunityReportStatus = "pending" | "resolved";

export interface CommunityReport {
  id: string;
  discussionId: string;
  discussionTitle: string;
  discussionExcerpt: string;
  authorName: string;
  reason: string;
  details: string;
  status: CommunityReportStatus;
  createdAt: string;
}

export type NewCommunityReport = Omit<CommunityReport, "id" | "status" | "createdAt">;

export function subscribeToCommunityStorage(onChange: () => void): () => void {
  listeners.add(onChange);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || [FOLLOWED_AUTHORS_KEY, REPORTS_KEY, SESSION_KEY].includes(event.key)) {
      onChange();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function notifyStorageChanged(): void {
  listeners.forEach((listener) => listener());
}

export function isAuthorFollowed(authorName: string): boolean {
  return getFollowedAuthors().includes(authorName);
}

export function hasAdminSession(): boolean {
  try {
    const saved = window.localStorage.getItem(SESSION_KEY);
    if (!saved) return false;
    const session: unknown = JSON.parse(saved);
    if (typeof session !== "object" || session === null || !("user" in session)) return false;
    const user = session.user;
    return typeof user === "object" && user !== null && "role" in user && user.role === "admin";
  } catch {
    return false;
  }
}

function isCommunityReport(value: unknown): value is CommunityReport {
  if (typeof value !== "object" || value === null) return false;
  const report = value as Record<string, unknown>;
  return (
    typeof report.id === "string" &&
    typeof report.discussionId === "string" &&
    typeof report.discussionTitle === "string" &&
    typeof report.discussionExcerpt === "string" &&
    typeof report.authorName === "string" &&
    typeof report.reason === "string" &&
    typeof report.details === "string" &&
    (report.status === "pending" || report.status === "resolved") &&
    typeof report.createdAt === "string"
  );
}

export function getFollowedAuthors(): string[] {
  const saved = window.localStorage.getItem(FOLLOWED_AUTHORS_KEY);
  if (!saved) return [];

  const authors: unknown = JSON.parse(saved);
  if (!Array.isArray(authors) || authors.some((author) => typeof author !== "string")) {
    throw new Error("Saved follow data is invalid.");
  }
  return authors;
}

export function toggleFollowAuthor(authorName: string): boolean {
  const followed = getFollowedAuthors();
  const isFollowing = followed.includes(authorName);
  const updated = isFollowing
    ? followed.filter((name) => name !== authorName)
    : [...followed, authorName];
  window.localStorage.setItem(FOLLOWED_AUTHORS_KEY, JSON.stringify(updated));
  notifyStorageChanged();
  return !isFollowing;
}

export function parseCommunityReports(saved: string): CommunityReport[] {
  const reports: unknown = JSON.parse(saved);
  if (!Array.isArray(reports) || !reports.every(isCommunityReport)) {
    throw new Error("Saved report data is invalid.");
  }
  return reports;
}

export function getCommunityReportsSnapshot(): string {
  return window.localStorage.getItem(REPORTS_KEY) ?? "[]";
}

export function getCommunityReports(): CommunityReport[] {
  return parseCommunityReports(getCommunityReportsSnapshot());
}

export function submitDiscussionReport(report: NewCommunityReport): void {
  const reports = getCommunityReports();
  reports.unshift({
    ...report,
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  window.localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  notifyStorageChanged();
}

export function resolveCommunityReport(reportId: string): CommunityReport[] {
  const reports = getCommunityReports().map((report) =>
    report.id === reportId ? { ...report, status: "resolved" as const } : report
  );
  window.localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  notifyStorageChanged();
  return reports;
}
