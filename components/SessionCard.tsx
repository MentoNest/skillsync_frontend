'use client';

import { useState } from 'react';
import { Session, SessionRating } from '@/types/session';
import { useSessionActions } from '@/hooks/useSession';
import {
  getSessionStatusColor,
  getSessionStatusLabel,
  getTimeUntilSession,
  getSessionDuration,
  formatDuration,
  canRateSession,
} from '@/lib/sessionBooking';

interface SessionCardProps {
  session: Session;
  currentUserId: string;
  userRole: 'mentor' | 'mentee';
  onRefresh?: () => void;
}

export default function SessionCard({
  session,
  currentUserId,
  userRole,
  onRefresh,
}: SessionCardProps) => {
  const { confirmBooking, rateSession, isLoading, error } = useSessionActions(currentUserId);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState<Partial<SessionRating>>({
    score: 5,
    wouldRecommend: true,
  });

  const otherPartyId = userRole === 'mentor' ? session.menteeId : session.mentorId;
  const canCancel = session.status === 'pending' || session.status === 'confirmed';
  const canRate = canRateSession(session, currentUserId);

  const handleConfirm = async () => {
    const success = await confirmBooking(session.id);
    if (success && onRefresh) {
      onRefresh();
    }
  };

  const handleRate = async () => {
    if (!rating.score || !rating.comment) return;

    const ratingData: SessionRating = {
      score: rating.score,
      comment: rating.comment,
      wouldRecommend: rating.wouldRecommend ?? true,
      ratedBy: currentUserId,
      ratedAt: new Date().toISOString(),
    };

    const success = await rateSession(session.id, ratingData);
    if (success && onRefresh) {
      onRefresh();
      setShowRatingForm(false);
    }
  };

  const handleCancel = async () => {
    const reason = prompt('Please provide a reason for cancellation:');
    if (reason) {
      // This would call the cancel API
      if (onRefresh) {
        onRefresh();
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Session with {userRole === 'mentor' ? 'Mentee' : 'Mentor'}
          </h3>
          <p className="text-sm text-gray-500">ID: {session.id}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getSessionStatusColor(
            session.status
          )}`}
        >
          {getSessionStatusLabel(session.status)}
        </span>
      </div>

      {/* Session Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">📅</span>
          {new Date(session.startTime).toLocaleDateString()} at{' '}
          {new Date(session.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">⏱️</span>
          Duration: {formatDuration(getSessionDuration(session))}
        </div>
        {session.meetingUrl && (
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">🎥</span>
            <a
              href={session.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Join Meeting
            </a>
          </div>
        )}
        {session.status === 'confirmed' && (
          <div className="flex items-center text-sm text-blue-600">
            <span className="font-medium mr-2">⏰</span>
            {getTimeUntilSession(session.startTime)}
          </div>
        )}
      </div>

      {/* Notes */}
      {session.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Notes:</strong> {session.notes}
          </p>
        </div>
      )}

      {/* Rating Display */}
      {session.rating && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-lg">
              {'★'.repeat(session.rating.score)}
              {'☆'.repeat(5 - session.rating.score)}
            </span>
            <span className="ml-2 text-sm text-gray-600">
              ({session.rating.score}/5)
            </span>
          </div>
          {session.rating.comment && (
            <p className="text-sm text-gray-700">{session.rating.comment}</p>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {/* Mentor Actions */}
        {userRole === 'mentor' && session.status === 'pending' && (
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
          >
            {isLoading ? 'Confirming...' : 'Confirm Session'}
          </button>
        )}

        {/* Cancel Button */}
        {canCancel && (
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
          >
            Cancel Session
          </button>
        )}

        {/* Rate Button */}
        {canRate && !showRatingForm && (
          <button
            onClick={() => setShowRatingForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Rate Session
          </button>
        )}

        {/* Rating Form */}
        {showRatingForm && (
          <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Rate This Session</h4>

            {/* Star Rating */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating({ ...rating, score: star })}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= (rating.score || 0) ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment (Optional)
              </label>
              <textarea
                value={rating.comment || ''}
                onChange={(e) => setRating({ ...rating, comment: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience..."
              />
            </div>

            {/* Recommend Toggle */}
            <div className="mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rating.wouldRecommend ?? true}
                  onChange={(e) =>
                    setRating({ ...rating, wouldRecommend: e.target.checked })
                  }
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">
                  Would recommend this {userRole === 'mentor' ? 'mentee' : 'mentor'}
                </span>
              </label>
            </div>

            {/* Submit Rating */}
            <div className="flex gap-2">
              <button
                onClick={handleRate}
                disabled={isLoading || !rating.score}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                {isLoading ? 'Submitting...' : 'Submit Rating'}
              </button>
              <button
                onClick={() => setShowRatingForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
