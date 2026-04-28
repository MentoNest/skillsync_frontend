'use client';

import { useState } from 'react';
import { BookingRequest, MeetingProvider, SESSION_DURATIONS } from '@/types/session';
import { useSessionBooking } from '@/hooks/useSession';
import {
  validateBookingRequest,
  checkBookingConflict,
  calculateEndTime,
} from '@/lib/sessionBooking';

interface SessionBookingFormProps {
  mentorId: string;
  mentorName: string;
  currentUserId: string;
  onSuccess?: () => void;
}

export default function SessionBookingForm({
  mentorId,
  mentorName,
  currentUserId,
  onSuccess,
}: SessionBookingFormProps) {
  const { bookNewSession, isLoading, error } = useSessionBooking(currentUserId);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');
  const [meetingProvider, setMeetingProvider] = useState<MeetingProvider>('zoom');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setSuccessMessage(null);

    // Combine date and time
    const startTime = new Date(`${selectedDate}T${selectedTime}`);

    // Validate request
    const bookingRequest: BookingRequest = {
      mentorId,
      startTime: startTime.toISOString(),
      duration,
      notes,
      meetingProvider,
    };

    const validation = validateBookingRequest(bookingRequest, currentUserId);
    if (!validation.valid) {
      setValidationError(validation.error || 'Invalid booking request');
      return;
    }

    // Book session
    const result = await bookNewSession(bookingRequest);

    if (result.success) {
      setSuccessMessage('Session booked successfully! Awaiting mentor confirmation.');
      
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setDuration(60);
      setNotes('');
      
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setValidationError(result.error || 'Failed to book session');
    }
  };

  // Generate minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Generate maximum date (3 months from now)
  const maxDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Book a Session</h2>
      <p className="text-gray-600 mb-6">with {mentorName}</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {validationError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{validationError}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
            max={maxDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Time
          </label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {SESSION_DURATIONS.map((dur) => (
              <option key={dur} value={dur}>
                {dur >= 60 ? `${dur / 60} hour${dur > 60 ? 's' : ''}` : `${dur} minutes`}
              </option>
            ))}
          </select>
        </div>

        {/* Meeting Provider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Platform
          </label>
          <select
            value={meetingProvider}
            onChange={(e) => setMeetingProvider(e.target.value as MeetingProvider)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="zoom">Zoom</option>
            <option value="google-meet">Google Meet</option>
            <option value="microsoft-teams">Microsoft Teams</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="What would you like to discuss in this session?"
          />
        </div>

        {/* Session Summary */}
        {selectedDate && selectedTime && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm font-medium">Session Summary:</p>
            <p className="text-blue-600 text-sm mt-1">
              📅 {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
            </p>
            <p className="text-blue-600 text-sm">
              ⏱️ Duration: {duration >= 60 ? `${duration / 60}h` : `${duration}m`}
            </p>
            <p className="text-blue-600 text-sm">
              🎥 Platform: {meetingProvider.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </p>
          </div>
        )}

        {/* Cancellation Policy Notice */}
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700 text-xs">
            ⚠️ <strong>Cancellation Policy:</strong> You can cancel up to 24 hours before the session without penalty.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Booking Session...' : 'Book Session'}
        </button>
      </form>
    </div>
  );
}
