/**
 * Session Booking Conflict Detection Tests
 * 
 * Run with: npx tsx __tests__/sessionBooking.test.ts
 * 
 * Tests for booking conflicts, validation, cancellation policies,
 * and session management logic.
 */

import {
  hasTimeOverlap,
  checkBookingConflict,
  validateBookingRequest,
  checkCancellationPolicy,
  validateStatusTransition,
  calculateEndTime,
  formatDuration,
  getSessionStatusColor,
  canRateSession,
  validateRescheduleRequest,
  getSessionDuration,
  isUpcomingSession,
  getTimeUntilSession,
} from '../lib/sessionBooking';
import {
  Session,
  BookingRequest,
  SessionStatus,
  RescheduleRequest,
  DEFAULT_CANCELLATION_POLICY,
} from '../types/session';

// Helper to create test sessions
const createTestSession = (overrides: Partial<Session> = {}): Session => ({
  id: 'session-1',
  mentorId: 'mentor-1',
  menteeId: 'mentee-1',
  startTime: '2024-12-01T10:00:00.000Z',
  endTime: '2024-12-01T11:00:00.000Z',
  status: 'confirmed',
  createdAt: '2024-11-01T10:00:00.000Z',
  updatedAt: '2024-11-01T10:00:00.000Z',
  ...overrides,
});

const runTest = async (name: string, testFn: () => boolean | Promise<boolean>) => {
  try {
    const result = await testFn();
    if (result) {
      console.log(`✅ PASS: ${name}`);
    } else {
      console.log(`❌ FAIL: ${name}`);
    }
  } catch (error) {
    console.log(`❌ ERROR: ${name} - ${error instanceof Error ? error.message : error}`);
  }
};

const main = async () => {
  console.log('\n📅 Running Session Booking Tests...\n');

  // ========================================
  // TIME OVERLAP TESTS
  // ========================================
  console.log('⏰ Time Overlap Detection:\n');

  await runTest('Detects overlapping times', () => {
    return hasTimeOverlap(
      '2024-12-01T10:00:00Z',
      '2024-12-01T11:00:00Z',
      '2024-12-01T10:30:00Z',
      '2024-12-01T11:30:00Z'
    ) === true;
  });

  await runTest('Detects non-overlapping times (before)', () => {
    return hasTimeOverlap(
      '2024-12-01T10:00:00Z',
      '2024-12-01T11:00:00Z',
      '2024-12-01T08:00:00Z',
      '2024-12-01T09:00:00Z'
    ) === false;
  });

  await runTest('Detects non-overlapping times (after)', () => {
    return hasTimeOverlap(
      '2024-12-01T10:00:00Z',
      '2024-12-01T11:00:00Z',
      '2024-12-01T12:00:00Z',
      '2024-12-01T13:00:00Z'
    ) === false;
  });

  await runTest('Detects exact boundary (no overlap)', () => {
    return hasTimeOverlap(
      '2024-12-01T10:00:00Z',
      '2024-12-01T11:00:00Z',
      '2024-12-01T11:00:00Z',
      '2024-12-01T12:00:00Z'
    ) === false;
  });

  await runTest('Detects complete containment', () => {
    return hasTimeOverlap(
      '2024-12-01T10:00:00Z',
      '2024-12-01T12:00:00Z',
      '2024-12-01T10:30:00Z',
      '2024-12-01T11:30:00Z'
    ) === true;
  });

  // ========================================
  // BOOKING CONFLICT TESTS
  // ========================================
  console.log('\n⚠️  Booking Conflict Detection:\n');

  await runTest('Detects conflict with existing session', () => {
    const existingSessions = [
      createTestSession({
        id: 'session-1',
        startTime: '2024-12-01T10:00:00Z',
        endTime: '2024-12-01T11:00:00Z',
        status: 'confirmed',
      }),
    ];

    const conflict = checkBookingConflict(
      '2024-12-01T10:30:00Z',
      '2024-12-01T11:30:00Z',
      existingSessions
    );

    return conflict.hasConflict === true;
  });

  await runTest('No conflict with available time', () => {
    const existingSessions = [
      createTestSession({
        id: 'session-1',
        startTime: '2024-12-01T10:00:00Z',
        endTime: '2024-12-01T11:00:00Z',
        status: 'confirmed',
      }),
    ];

    const conflict = checkBookingConflict(
      '2024-12-01T12:00:00Z',
      '2024-12-01T13:00:00Z',
      existingSessions
    );

    return conflict.hasConflict === false;
  });

  await runTest('Ignores cancelled sessions', () => {
    const existingSessions = [
      createTestSession({
        id: 'session-1',
        startTime: '2024-12-01T10:00:00Z',
        endTime: '2024-12-01T11:00:00Z',
        status: 'cancelled',
      }),
    ];

    const conflict = checkBookingConflict(
      '2024-12-01T10:30:00Z',
      '2024-12-01T11:30:00Z',
      existingSessions
    );

    return conflict.hasConflict === false;
  });

  await runTest('Excludes session being rescheduled', () => {
    const existingSessions = [
      createTestSession({
        id: 'session-1',
        startTime: '2024-12-01T10:00:00Z',
        endTime: '2024-12-01T11:00:00Z',
        status: 'confirmed',
      }),
    ];

    const conflict = checkBookingConflict(
      '2024-12-01T10:00:00Z',
      '2024-12-01T11:00:00Z',
      existingSessions,
      'session-1' // Exclude this session
    );

    return conflict.hasConflict === false;
  });

  // ========================================
  // BOOKING VALIDATION TESTS
  // ========================================
  console.log('\n✅ Booking Validation:\n');

  await runTest('Rejects self-booking', () => {
    const request: BookingRequest = {
      mentorId: 'user-1',
      startTime: '2024-12-01T10:00:00Z',
      duration: 60,
    };

    const result = validateBookingRequest(request, 'user-1');
    return result.valid === false && result.errorCode === 'SELF_BOOKING';
  });

  await runTest('Rejects past dates', () => {
    const request: BookingRequest = {
      mentorId: 'mentor-1',
      startTime: '2020-01-01T10:00:00Z',
      duration: 60,
    };

    const result = validateBookingRequest(request, 'mentee-1');
    return result.valid === false && result.errorCode === 'PAST_DATE';
  });

  await runTest('Rejects invalid duration', () => {
    const request: BookingRequest = {
      mentorId: 'mentor-1',
      startTime: '2024-12-01T10:00:00Z',
      duration: 45, // Invalid
    };

    const result = validateBookingRequest(request, 'mentee-1');
    return result.valid === false && result.errorCode === 'INVALID_DURATION';
  });

  await runTest('Accepts valid booking request', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    const request: BookingRequest = {
      mentorId: 'mentor-1',
      startTime: futureDate.toISOString(),
      duration: 60,
    };

    const result = validateBookingRequest(request, 'mentee-1');
    return result.valid === true;
  });

  // ========================================
  // CANCELLATION POLICY TESTS
  // ========================================
  console.log('\n❌ Cancellation Policy:\n');

  await runTest('Allows cancellation before deadline', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2); // 48 hours from now

    const result = checkCancellationPolicy(futureDate.toISOString());
    return result.allowed === true && result.withinDeadline === true;
  });

  await runTest('Allows cancellation after deadline with penalty', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 12); // 12 hours from now

    const result = checkCancellationPolicy(futureDate.toISOString());
    return result.allowed === true && result.withinDeadline === false;
  });

  await runTest('Rejects cancellation for past sessions', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const result = checkCancellationPolicy(pastDate.toISOString());
    return result.allowed === false;
  });

  await runTest('Uses custom cancellation policy', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 36); // 36 hours from now

    const customPolicy = { ...DEFAULT_CANCELLATION_POLICY, deadlineHours: 48 };
    const result = checkCancellationPolicy(futureDate.toISOString(), customPolicy);
    return result.withinDeadline === false; // Outside 48-hour window
  });

  // ========================================
  // STATUS TRANSITION TESTS
  // ========================================
  console.log('\n🔄 Status Transitions:\n');

  await runTest('Valid: pending -> confirmed', () => {
    const result = validateStatusTransition('pending', 'confirmed');
    return result.valid === true;
  });

  await runTest('Valid: pending -> cancelled', () => {
    const result = validateStatusTransition('pending', 'cancelled');
    return result.valid === true;
  });

  await runTest('Valid: confirmed -> completed', () => {
    const result = validateStatusTransition('confirmed', 'completed');
    return result.valid === true;
  });

  await runTest('Invalid: completed -> pending', () => {
    const result = validateStatusTransition('completed', 'pending');
    return result.valid === false;
  });

  await runTest('Invalid: cancelled -> confirmed', () => {
    const result = validateStatusTransition('cancelled', 'confirmed');
    return result.valid === false;
  });

  // ========================================
  // UTILITY FUNCTION TESTS
  // ========================================
  console.log('\n🛠️  Utility Functions:\n');

  await runTest('Calculate end time correctly', () => {
    const startTime = '2024-12-01T10:00:00Z';
    const endTime = calculateEndTime(startTime, 90);
    const expected = '2024-12-01T11:30:00.000Z';
    return endTime === expected;
  });

  await runTest('Format duration: 90 minutes', () => {
    return formatDuration(90) === '1h 30m';
  });

  await runTest('Format duration: 60 minutes', () => {
    return formatDuration(60) === '1h';
  });

  await runTest('Format duration: 30 minutes', () => {
    return formatDuration(30) === '30m';
  });

  await runTest('Get session status color', () => {
    return getSessionStatusColor('confirmed') === 'bg-green-100 text-green-800';
  });

  await runTest('Can rate completed session', () => {
    const session = createTestSession({
      status: 'completed',
      rating: undefined,
      menteeId: 'mentee-1',
    });

    return canRateSession(session, 'mentee-1') === true;
  });

  await runTest('Cannot rate already rated session', () => {
    const session = createTestSession({
      status: 'completed',
      rating: {
        score: 5,
        wouldRecommend: true,
        ratedBy: 'mentee-1',
        ratedAt: new Date().toISOString(),
      },
      menteeId: 'mentee-1',
    });

    return canRateSession(session, 'mentee-1') === false;
  });

  await runTest('Calculate session duration', () => {
    const session = createTestSession({
      startTime: '2024-12-01T10:00:00Z',
      endTime: '2024-12-01T11:30:00Z',
    });

    return getSessionDuration(session) === 90;
  });

  // ========================================
  // RESCHEDULE VALIDATION TESTS
  // ========================================
  console.log('\n📝 Reschedule Validation:\n');

  await runTest('Valid reschedule request', async () => {
    const existingSessions = [
      createTestSession({
        id: 'session-1',
        startTime: '2024-12-01T10:00:00Z',
        endTime: '2024-12-01T11:00:00Z',
        status: 'confirmed',
      }),
    ];

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    const request: RescheduleRequest = {
      sessionId: 'session-1',
      newStartTime: futureDate.toISOString(),
    };

    const result = validateRescheduleRequest(request, existingSessions, 'mentor-1');
    return result.valid === true;
  });

  await runTest('Rejects reschedule to past time', () => {
    const existingSessions = [
      createTestSession({
        id: 'session-1',
        status: 'confirmed',
      }),
    ];

    const request: RescheduleRequest = {
      sessionId: 'session-1',
      newStartTime: '2020-01-01T10:00:00Z',
    };

    const result = validateRescheduleRequest(request, existingSessions, 'mentor-1');
    return result.valid === false && result.errorCode === 'PAST_DATE';
  });

  await runTest('Rejects reschedule with conflict', () => {
    const existingSessions = [
      createTestSession({
        id: 'session-1',
        status: 'confirmed',
      }),
      createTestSession({
        id: 'session-2',
        startTime: '2024-12-01T10:00:00Z',
        endTime: '2024-12-01T11:00:00Z',
        status: 'confirmed',
      }),
    ];

    const request: RescheduleRequest = {
      sessionId: 'session-1',
      newStartTime: '2024-12-01T10:30:00Z',
    };

    const result = validateRescheduleRequest(request, existingSessions, 'mentor-1');
    return result.valid === false && result.errorCode === 'DOUBLE_BOOKING';
  });

  console.log('\n✅ All session booking tests completed!\n');
};

main().catch(console.error);
