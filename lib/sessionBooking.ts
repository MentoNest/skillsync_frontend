/**
 * Session Booking Logic
 * 
 * Handles session booking, conflict detection, cancellation policies,
 * and availability checking.
 */

import {
  Session,
  BookingRequest,
  BookingResponse,
  BookingErrorCode,
  ConflictCheck,
  CancellationPolicy,
  TimeSlot,
  SessionStatus,
  RescheduleRequest,
  DEFAULT_CANCELLATION_POLICY,
  VALID_STATUS_TRANSITIONS,
} from '@/types/session';

/**
 * Check if two time ranges overlap
 */
export const hasTimeOverlap = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const s1 = new Date(start1).getTime();
  const e1 = new Date(end1).getTime();
  const s2 = new Date(start2).getTime();
  const e2 = new Date(end2).getTime();

  return s1 < e2 && s2 < e1;
};

/**
 * Check for booking conflicts with existing sessions
 * 
 * @param requestedStart - Proposed session start time
 * @param requestedEnd - Proposed session end time
 * @param existingSessions - List of existing sessions for the mentor
 * @param excludeSessionId - Optional session ID to exclude (for rescheduling)
 * @returns Conflict check result
 */
export const checkBookingConflict = (
  requestedStart: string,
  requestedEnd: string,
  existingSessions: Session[],
  excludeSessionId?: string
): ConflictCheck => {
  const conflicts = existingSessions.filter((session) => {
    // Exclude the session being rescheduled
    if (excludeSessionId && session.id === excludeSessionId) {
      return false;
    }

    // Only check active sessions (not cancelled)
    if (session.status === 'cancelled') {
      return false;
    }

    // Check time overlap
    return hasTimeOverlap(
      requestedStart,
      requestedEnd,
      session.startTime,
      session.endTime
    );
  });

  if (conflicts.length > 0) {
    return {
      hasConflict: true,
      conflictingSession: conflicts[0],
      message: `Time slot conflicts with existing session (${conflicts[0].startTime} - ${conflicts[0].endTime})`,
    };
  }

  return {
    hasConflict: false,
    message: 'Time slot is available',
  };
};

/**
 * Validate booking request
 * 
 * @param request - Booking request
 * @param currentUserId - ID of user making the booking
 * @returns Validation result with error if invalid
 */
export const validateBookingRequest = (
  request: BookingRequest,
  currentUserId: string
): { valid: boolean; error?: string; errorCode?: BookingErrorCode } => {
  const startTime = new Date(request.startTime);
  const endTime = new Date(startTime.getTime() + request.duration * 60000);
  const now = new Date();

  // Check if trying to book with oneself
  if (request.mentorId === currentUserId) {
    return {
      valid: false,
      error: 'Cannot book a session with yourself',
      errorCode: 'SELF_BOOKING',
    };
  }

  // Check if date is in the past
  if (startTime < now) {
    return {
      valid: false,
      error: 'Cannot book sessions in the past',
      errorCode: 'PAST_DATE',
    };
  }

  // Check if duration is valid
  const validDurations = [30, 60, 90, 120];
  if (!validDurations.includes(request.duration)) {
    return {
      valid: false,
      error: 'Invalid session duration. Must be 30, 60, 90, or 120 minutes',
      errorCode: 'INVALID_DURATION',
    };
  }

  return { valid: true };
};

/**
 * Check if cancellation is allowed based on policy
 * 
 * @param sessionStartTime - Session start time
 * @param policy - Cancellation policy
 * @returns Whether cancellation is allowed and any penalties
 */
export const checkCancellationPolicy = (
  sessionStartTime: string,
  policy: CancellationPolicy = DEFAULT_CANCELLATION_POLICY
): {
  allowed: boolean;
  withinDeadline: boolean;
  hoursUntilSession: number;
  message?: string;
} => {
  const now = new Date();
  const sessionStart = new Date(sessionStartTime);
  const hoursUntilSession = (sessionStart.getTime() - now.getTime()) / (1000 * 60 * 60);

  // Check if session is in the past
  if (hoursUntilSession < 0) {
    return {
      allowed: false,
      withinDeadline: false,
      hoursUntilSession: 0,
      message: 'Cannot cancel a session that has already started or completed',
    };
  }

  const withinDeadline = hoursUntilSession >= policy.deadlineHours;

  return {
    allowed: true,
    withinDeadline,
    hoursUntilSession,
    message: withinDeadline
      ? `Cancellation allowed. Full refund (${policy.refundPercentage}%)`
      : `Cancellation allowed but penalty applies. Outside ${policy.deadlineHours}-hour window.`,
  };
};

/**
 * Validate session status transition
 * 
 * @param currentStatus - Current session status
 * @param newStatus - Desired new status
 * @returns Whether transition is valid
 */
export const validateStatusTransition = (
  currentStatus: SessionStatus,
  newStatus: SessionStatus
): { valid: boolean; message?: string } => {
  const allowedTransitions = VALID_STATUS_TRANSITIONS[currentStatus];

  if (!allowedTransitions.includes(newStatus)) {
    return {
      valid: false,
      message: `Cannot transition from ${currentStatus} to ${newStatus}`,
    };
  }

  return { valid: true };
};

/**
 * Generate available time slots for a mentor on a specific date
 * 
 * @param date - Date to generate slots for
 * @param availabilitySlots - Mentor's availability schedule
 * @param bookedSessions - Already booked sessions
 * @param slotDuration - Duration of each slot in minutes
 * @returns Array of available time slots
 */
export const generateAvailableSlots = (
  date: Date,
  availabilitySlots: Array<{ startTime: string; endTime: string }>,
  bookedSessions: Session[],
  slotDuration: number = 60
): TimeSlot[] => {
  const availableSlots: TimeSlot[] = [];
  const dayOfWeek = date.getDay();

  // Filter availability for this day of week
  const dayAvailability = availabilitySlots.filter((slot) => {
    // This is simplified - in reality, you'd match dayOfWeek
    return true;
  });

  // Generate slots based on availability
  dayAvailability.forEach((avail) => {
    const [startHour, startMinute] = avail.startTime.split(':').map(Number);
    const [endHour, endMinute] = avail.endTime.split(':').map(Number);

    let currentTime = new Date(date);
    currentTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(endHour, endMinute, 0, 0);

    while (currentTime.getTime() + slotDuration * 60000 <= endTime.getTime()) {
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);

      // Check if this slot conflicts with any booked session
      const conflict = checkBookingConflict(
        currentTime.toISOString(),
        slotEnd.toISOString(),
        bookedSessions
      );

      availableSlots.push({
        startTime: currentTime.toISOString(),
        endTime: slotEnd.toISOString(),
        isAvailable: !conflict.hasConflict,
      });

      // Move to next slot (15-minute intervals)
      currentTime = new Date(currentTime.getTime() + 15 * 60000);
    }
  });

  return availableSlots;
};

/**
 * Calculate session end time
 * 
 * @param startTime - Session start time
 * @param duration - Duration in minutes
 * @returns Session end time as ISO string
 */
export const calculateEndTime = (startTime: string, duration: number): string => {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60000);
  return end.toISOString();
};

/**
 * Format session duration for display
 */
export const formatDuration = (minutes: number): string => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${minutes}m`;
};

/**
 * Get session status color for UI
 */
export const getSessionStatusColor = (status: SessionStatus): string => {
  const colors: Record<SessionStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    no_show: 'bg-gray-100 text-gray-800',
  };
  return colors[status];
};

/**
 * Get session status label
 */
export const getSessionStatusLabel = (status: SessionStatus): string => {
  const labels: Record<SessionStatus, string> = {
    pending: 'Pending Confirmation',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    no_show: 'No Show',
  };
  return labels[status];
};

/**
 * Check if session can be rated
 */
export const canRateSession = (session: Session, userId: string): boolean => {
  return (
    session.status === 'completed' &&
    !session.rating &&
    (session.mentorId === userId || session.menteeId === userId)
  );
};

/**
 * Validate reschedule request
 */
export const validateRescheduleRequest = (
  request: RescheduleRequest,
  existingSessions: Session[],
  currentUserId: string
): { valid: boolean; error?: string; errorCode?: BookingErrorCode } => {
  const session = existingSessions.find((s) => s.id === request.sessionId);

  if (!session) {
    return {
      valid: false,
      error: 'Session not found',
      errorCode: 'SESSION_NOT_FOUND',
    };
  }

  // Check if user is part of this session
  if (session.mentorId !== currentUserId && session.menteeId !== currentUserId) {
    return {
      valid: false,
      error: 'Unauthorized to reschedule this session',
      errorCode: 'UNAUTHORIZED',
    };
  }

  // Check if session can be rescheduled (only pending or confirmed)
  if (session.status !== 'pending' && session.status !== 'confirmed') {
    return {
      valid: false,
      error: `Cannot reschedule session with status: ${session.status}`,
      errorCode: 'UNAUTHORIZED',
    };
  }

  // Check new time
  const newStartTime = new Date(request.newStartTime);
  const newDuration = request.newDuration || getSessionDuration(session);
  const newEndTime = new Date(newStartTime.getTime() + newDuration * 60000);

  // Check if new time is in the past
  if (newStartTime < new Date()) {
    return {
      valid: false,
      error: 'Cannot reschedule to a past time',
      errorCode: 'PAST_DATE',
    };
  }

  // Check for conflicts
  const conflict = checkBookingConflict(
    newStartTime.toISOString(),
    newEndTime.toISOString(),
    existingSessions,
    request.sessionId
  );

  if (conflict.hasConflict) {
    return {
      valid: false,
      error: 'New time slot conflicts with existing session',
      errorCode: 'DOUBLE_BOOKING',
    };
  }

  return { valid: true };
};

/**
 * Get session duration in minutes
 */
export const getSessionDuration = (session: Session): number => {
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  return (end.getTime() - start.getTime()) / (1000 * 60);
};

/**
 * Check if session is upcoming (within next 7 days)
 */
export const isUpcomingSession = (session: Session): boolean => {
  const now = new Date();
  const startTime = new Date(session.startTime);
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    session.status === 'confirmed' &&
    startTime > now &&
    startTime < sevenDaysFromNow
  );
};

/**
 * Get time until session in human-readable format
 */
export const getTimeUntilSession = (sessionStartTime: string): string => {
  const now = new Date();
  const sessionStart = new Date(sessionStartTime);
  const diffMs = sessionStart.getTime() - now.getTime();

  if (diffMs < 0) {
    return 'Session has started or passed';
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours > 24) {
    const days = Math.floor(diffHours / 24);
    return `${days} day${days > 1 ? 's' : ''} away`;
  }

  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} away`;
  }

  return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} away`;
};
