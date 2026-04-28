/**
 * Session Scheduling System Types
 * 
 * Type definitions for the session booking and management system.
 */

// Session status workflow
export type SessionStatus = 
  | 'pending'        // Booking requested, awaiting mentor confirmation
  | 'confirmed'      // Mentor approved the booking
  | 'completed'      // Session has taken place
  | 'cancelled'      // Session was cancelled by either party
  | 'no_show';       // One party didn't attend

// Meeting provider types
export type MeetingProvider = 'zoom' | 'google-meet' | 'microsoft-teams' | 'other';

// Session entity
export interface Session {
  id: string;
  mentorId: string;
  menteeId: string;
  startTime: string; // ISO 8601 datetime
  endTime: string;   // ISO 8601 datetime
  status: SessionStatus;
  meetingUrl?: string;
  meetingProvider?: MeetingProvider;
  notes?: string;
  rating?: SessionRating;
  createdAt: string;
  updatedAt: string;
  cancelledBy?: string; // userId who cancelled
  cancellationReason?: string;
}

// Session rating and review
export interface SessionRating {
  score: number;        // 1-5 stars
  comment?: string;
  wouldRecommend: boolean;
  ratedBy: string;      // userId
  ratedAt: string;      // ISO 8601 datetime
}

// Session booking request
export interface BookingRequest {
  mentorId: string;
  startTime: string;    // ISO 8601 datetime
  duration: number;     // Duration in minutes (30, 60, 90, 120)
  notes?: string;
  meetingProvider?: MeetingProvider;
}

// Mentor availability slot
export interface AvailabilitySlot {
  id: string;
  mentorId: string;
  dayOfWeek: number;    // 0-6 (Sunday-Saturday)
  startTime: string;    // HH:MM format (e.g., "09:00")
  endTime: string;      // HH:MM format
  isRecurring: boolean; // Weekly recurring or one-time
  specificDate?: string; // ISO date for one-time slots
}

// Available time slot for booking
export interface TimeSlot {
  startTime: string;    // ISO 8601 datetime
  endTime: string;      // ISO 8601 datetime
  isAvailable: boolean;
}

// Session booking response
export interface BookingResponse {
  success: boolean;
  session?: Session;
  error?: string;
  errorCode?: BookingErrorCode;
}

// Booking error codes
export type BookingErrorCode = 
  | 'DOUBLE_BOOKING'
  | 'UNAVAILABLE_TIME'
  | 'INVALID_DURATION'
  | 'PAST_DATE'
  | 'SELF_BOOKING'
  | 'CANCELLED_MENTOR'
  | 'CANCELLATION_DEADLINE_PASSED'
  | 'SESSION_NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'ALREADY_RATED';

// Cancellation policy
export interface CancellationPolicy {
  deadlineHours: number;          // Hours before session (default: 24)
  penaltyAfterDeadline: boolean;  // Whether there's a penalty after deadline
  refundPercentage: number;       // Refund % if cancelled before deadline
}

// Session filters for history/search
export interface SessionFilters {
  status?: SessionStatus[];
  startDate?: string;
  endDate?: string;
  mentorId?: string;
  menteeId?: string;
  limit?: number;
  offset?: number;
}

// Session statistics
export interface SessionStats {
  totalSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  noShowSessions: number;
  pendingSessions: number;
  averageRating: number;
  totalHours: number;
}

// Rescheduling request
export interface RescheduleRequest {
  sessionId: string;
  newStartTime: string;  // ISO 8601 datetime
  newDuration?: number;  // Optional new duration
  reason?: string;
}

// Notification types
export type NotificationType = 
  | 'booking_request'
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'session_reminder'
  | 'session_rescheduled'
  | 'rating_request';

// Session notification
export interface SessionNotification {
  id: string;
  type: NotificationType;
  sessionId: string;
  recipientId: string;
  message: string;
  sentAt: string;
  read: boolean;
}

// Conflict detection result
export interface ConflictCheck {
  hasConflict: boolean;
  conflictingSession?: Session;
  message?: string;
}

// Mentor availability for a specific date range
export interface MentorAvailability {
  mentorId: string;
  startDate: string;
  endDate: string;
  availableSlots: TimeSlot[];
  bookedSlots: TimeSlot[];
}

// Session duration options (in minutes)
export const SESSION_DURATIONS = [30, 60, 90, 120] as const;
export type SessionDuration = typeof SESSION_DURATIONS[number];

// Default cancellation policy
export const DEFAULT_CANCELLATION_POLICY: CancellationPolicy = {
  deadlineHours: 24,
  penaltyAfterDeadline: true,
  refundPercentage: 100,
};

// Valid session status transitions
export const VALID_STATUS_TRANSITIONS: Record<SessionStatus, SessionStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'cancelled', 'no_show'],
  completed: [],
  cancelled: [],
  no_show: [],
};
