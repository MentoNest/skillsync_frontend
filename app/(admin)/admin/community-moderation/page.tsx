'use client';

import React, { useState } from 'react';

export default function CommunityModerationPage() {
  const [reports, setReports] = useState([
    { id: 'r1', discussionTitle: 'Offensive comments on mentor post', reason: 'Spam / Harassment', reporter: 'user123', status: 'PENDING' },
    { id: 'r2', discussionTitle: 'Unverified links to third party sites', reason: 'Misinformation', reporter: 'user456', status: 'PENDING' },
  ]);

  const resolveReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Community Moderation Dashboard</h1>
      <p className="text-gray-600 text-sm mb-6">Review reported discussions and resolve community content moderation issues.</p>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discussion</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.discussionTitle}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{r.reason}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{r.reporter}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => resolveReport(r.id)}
                    className="text-indigo-600 hover:text-indigo-900 text-xs font-semibold"
                  >
                    Resolve & Dismiss
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <div className="p-6 text-center text-gray-500 text-sm">All report queues resolved!</div>
        )}
      </div>
    </div>
  );
}
