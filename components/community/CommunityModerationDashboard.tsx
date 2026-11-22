"use client";

import { useState, useSyncExternalStore } from "react";
import {
  getCommunityReportsSnapshot,
  hasAdminSession,
  parseCommunityReports,
  resolveCommunityReport,
  subscribeToCommunityStorage,
} from "../../lib/community/communityInteractions";

export default function CommunityModerationDashboard() {
  const isAdmin = useSyncExternalStore(subscribeToCommunityStorage, hasAdminSession, () => false);
  const reportSnapshot = useSyncExternalStore(
    subscribeToCommunityStorage,
    getCommunityReportsSnapshot,
    () => "[]"
  );
  const [error, setError] = useState("");

  const handleResolve = (reportId: string) => {
    try {
      resolveCommunityReport(reportId);
      setError("");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to resolve this report.");
    }
  };

  if (!isAdmin) return <main className="mx-auto max-w-3xl p-8"><h1 className="text-2xl font-bold">Moderator access required</h1><p className="mt-2 text-gray-600">Sign in with an admin account to review community reports.</p></main>;

  let reports: ReturnType<typeof parseCommunityReports> = [];
  let loadError = "";
  try {
    reports = parseCommunityReports(reportSnapshot);
  } catch (parseError) {
    loadError = parseError instanceof Error ? parseError.message : "Unable to load moderation reports.";
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 py-10 sm:px-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Community moderation</h1>
        <p className="mt-1 text-sm text-gray-600">Review reported discussions and track their status.</p>
      </header>
      {(error || loadError) && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error || loadError}</p>}
      {reports.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">No reports to review.</p>
      ) : (
        <section aria-label="Community report queue" className="space-y-4">
          {reports.map((report) => (
            <article key={report.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-900">{report.discussionTitle}</h2>
                  <p className="mt-1 text-sm text-gray-600">By {report.authorName} · Reported {new Date(report.createdAt).toLocaleString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${report.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
                  {report.status === "pending" ? "Pending review" : "Resolved"}
                </span>
              </div>
              <details className="mt-4 rounded-lg bg-gray-50 p-3">
                <summary className="cursor-pointer text-sm font-medium text-purple-700">Review report details</summary>
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <p><strong>Reason:</strong> {report.reason}</p>
                  {report.details && <p><strong>Reporter details:</strong> {report.details}</p>}
                  <p><strong>Discussion:</strong> {report.discussionExcerpt}</p>
                </div>
              </details>
              {report.status === "pending" && (
                <button type="button" onClick={() => handleResolve(report.id)} className="mt-4 rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800">
                  Resolve report
                </button>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
