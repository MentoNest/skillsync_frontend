import React from 'react';
import ModerationDashboard from '@/components/community/ModerationDashboard';

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Community moderation</h1>
        <p className="mt-2 text-gray-600">Review reports and keep community discussions safe.</p>
      </div>
      <ModerationDashboard />
    </div>
  );
}