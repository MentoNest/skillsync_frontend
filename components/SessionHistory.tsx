'use client';

import { useState } from 'react';
import { Session, SessionStatus, SessionFilters } from '@/types/session';
import { useSessionHistory } from '@/hooks/useSession';
import SessionCard from './SessionCard';

interface SessionHistoryProps {
  userId: string;
  role: 'mentor' | 'mentee';
}

export default function SessionHistory({ userId, role }: SessionHistoryProps) {
  const { sessions, isLoading, error, filters, updateFilters, refresh } =
    useSessionHistory(userId, role);

  const [showFilters, setShowFilters] = useState(false);

  const statusOptions: SessionStatus[] = [
    'pending',
    'confirmed',
    'completed',
    'cancelled',
    'no_show',
  ];

  const handleStatusFilter = (status: SessionStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    updateFilters({ status: newStatuses });
  };

  const clearFilters = () => {
    updateFilters({ status: undefined, startDate: undefined, endDate: undefined });
  };

  if (isLoading && sessions.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Session History
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Filter Sessions</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Status Filters */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => {
                const isActive = (filters.status || []).includes(status);
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) =>
                  updateFilters({
                    startDate: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) =>
                  updateFilters({
                    endDate: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Session List */}
      {sessions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">
            No sessions found
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {role === 'mentee'
              ? 'Book your first session with a mentor!'
              : 'You have no sessions yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              currentUserId={userId}
              userRole={role}
              onRefresh={refresh}
            />
          ))}
        </div>
      )}

      {/* Load More (Pagination placeholder) */}
      {sessions.length > 0 && (
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
            Load More Sessions
          </button>
        </div>
      )}
    </div>
  );
}
