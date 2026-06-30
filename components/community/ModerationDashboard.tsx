'use client';

import { useEffect, useMemo, useState } from 'react';
import { communityService } from '@/lib/community-service';

type ModerationItem = {
  id: string;
  title: string;
  reason: string;
  reportedAt: string;
  status: 'Pending' | 'Approved' | 'Removed';
};

export default function ModerationDashboard() {
  const [items, setItems] = useState<ModerationItem[]>([]);

  useEffect(() => {
    const loadReports = async () => {
      const reports = await communityService.getReportedDiscussions();
      setItems(reports);
    };

    loadReports();
  }, []);

  const pendingCount = useMemo(() => items.filter((item) => item.status === 'Pending').length, [items]);

  const handleReview = async (id: string, action: 'approve' | 'remove') => {
    const nextItems = await communityService.reviewReport(id, action);
    setItems(nextItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Moderation queue</h2>
          <p className="text-sm text-gray-600">Review reported discussions and keep the community safe.</p>
        </div>
        <div className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
          {pendingCount} pending
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
          No reports yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-600">Reason: {item.reason}</p>
                  <p className="mt-1 text-xs text-gray-500">Reported {new Date(item.reportedAt).toLocaleString()}</p>
                </div>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {item.status}
                </span>
              </div>

              {item.status === 'Pending' ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleReview(item.id, 'approve')}
                    className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(item.id, 'remove')}
                    className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
                  >
                    Remove
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
