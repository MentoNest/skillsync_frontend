/**
 * Session API Helpers
 * 
 * API request functions for session booking and management.
 */

import {
  Session,
  BookingRequest,
  BookingResponse,
  SessionFilters,
  SessionRating,
  RescheduleRequest,
  MentorAvailability,
  TimeSlot,
} from '@/types/session';
import { encryptedPost, encryptedPut } from '@/lib/encryptedApi';

/**
 * Book a new session with a mentor
 */
export const bookSession = async (request: BookingRequest): Promise<BookingResponse> => {
  return encryptedPost<BookingResponse>('/api/sessions/book', request, {
    encryptFields: ['notes'],
    decryptResponseFields: ['meetingUrl'],
  });
};

/**
 * Cancel a session
 */
export const cancelSession = async (
  sessionId: string,
  userId: string,
  reason?: string
): Promise<void> => {
  const response = await fetch(`/api/sessions/${sessionId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, reason }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to cancel session');
  }
};

/**
 * Reschedule a session
 */
export const rescheduleSession = async (
  request: RescheduleRequest,
  userId: string
): Promise<Session> => {
  return encryptedPut<Session>(
    `/api/sessions/${request.sessionId}/reschedule`,
    { ...request, userId },
    {
      decryptResponseFields: ['meetingUrl'],
    }
  );
};

/**
 * Rate a session
 */
export const rateSession = async (
  sessionId: string,
  rating: SessionRating
): Promise<void> => {
  const response = await fetch(`/api/sessions/${sessionId}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rating),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to rate session');
  }
};

/**
 * Confirm a session (mentor action)
 */
export const confirmSession = async (
  sessionId: string,
  mentorId: string
): Promise<Session> => {
  return encryptedPost<Session>(
    `/api/sessions/${sessionId}/confirm`,
    { mentorId },
    {
      decryptResponseFields: ['meetingUrl'],
    }
  );
};

/**
 * Get mentor's sessions
 */
export const getMentorSessions = async (
  mentorId: string,
  filters?: SessionFilters
): Promise<{ sessions: Session[]; total: number }> => {
  const params = new URLSearchParams();
  
  if (filters?.status) {
    params.append('status', filters.status.join(','));
  }
  if (filters?.startDate) {
    params.append('startDate', filters.startDate);
  }
  if (filters?.endDate) {
    params.append('endDate', filters.endDate);
  }
  if (filters?.limit) {
    params.append('limit', filters.limit.toString());
  }
  if (filters?.offset) {
    params.append('offset', filters.offset.toString());
  }

  const response = await fetch(`/api/sessions/mentor/${mentorId}?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch mentor sessions');
  }

  return response.json();
};

/**
 * Get mentee's sessions
 */
export const getMenteeSessions = async (
  menteeId: string,
  filters?: SessionFilters
): Promise<{ sessions: Session[]; total: number }> => {
  const params = new URLSearchParams();
  
  if (filters?.status) {
    params.append('status', filters.status.join(','));
  }
  if (filters?.startDate) {
    params.append('startDate', filters.startDate);
  }
  if (filters?.endDate) {
    params.append('endDate', filters.endDate);
  }
  if (filters?.limit) {
    params.append('limit', filters.limit.toString());
  }
  if (filters?.offset) {
    params.append('offset', filters.offset.toString());
  }

  const response = await fetch(`/api/sessions/mentee/${menteeId}?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch mentee sessions');
  }

  return response.json();
};

/**
 * Get mentor availability
 */
export const getMentorAvailability = async (
  mentorId: string,
  startDate: string,
  endDate: string
): Promise<MentorAvailability> => {
  const params = new URLSearchParams({ startDate, endDate });

  const response = await fetch(`/api/mentors/${mentorId}/availability?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch mentor availability');
  }

  return response.json();
};

/**
 * Get single session details
 */
export const getSessionDetails = async (sessionId: string): Promise<Session> => {
  const response = await fetch(`/api/sessions/${sessionId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch session details');
  }

  return response.json();
};

/**
 * Get upcoming sessions
 */
export const getUpcomingSessions = async (
  userId: string,
  role: 'mentor' | 'mentee'
): Promise<Session[]> => {
  const response = await fetch(`/api/sessions/${role}/${userId}/upcoming`);

  if (!response.ok) {
    throw new Error('Failed to fetch upcoming sessions');
  }

  return response.json();
};

/**
 * Send session reminder (placeholder for notification system)
 */
export const sendSessionReminder = async (sessionId: string): Promise<void> => {
  const response = await fetch(`/api/sessions/${sessionId}/reminder`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to send reminder');
  }
};

/**
 * Generate meeting URL (placeholder for Zoom/Google Meet integration)
 */
export const generateMeetingUrl = async (
  sessionId: string,
  provider: 'zoom' | 'google-meet' | 'microsoft-teams'
): Promise<string> => {
  const response = await fetch(`/api/sessions/${sessionId}/meeting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ provider }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate meeting URL');
  }

  const data = await response.json();
  return data.meetingUrl;
};
