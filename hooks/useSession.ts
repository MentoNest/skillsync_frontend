'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Session,
  BookingRequest,
  SessionFilters,
  SessionStats,
  SessionRating,
  RescheduleRequest,
  BookingResponse,
  TimeSlot,
  MentorAvailability,
} from '@/types/session';
import {
  bookSession,
  cancelSession,
  rescheduleSession,
  rateSession,
  getMentorSessions,
  getMenteeSessions,
  getMentorAvailability,
  confirmSession,
} from '@/lib/sessionApi';

/**
 * Hook for session booking operations
 */
export const useSessionBooking = (currentUserId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);

  const bookNewSession = useCallback(
    async (request: BookingRequest): Promise<BookingResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await bookSession(request);
        setBookingResult(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Booking failed';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const cancelBooking = useCallback(
    async (sessionId: string, reason?: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await cancelSession(sessionId, currentUserId, reason);
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Cancellation failed';
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [currentUserId]
  );

  const rescheduleBooking = useCallback(
    async (request: RescheduleRequest): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await rescheduleSession(request, currentUserId);
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Rescheduling failed';
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [currentUserId]
  );

  return {
    bookNewSession,
    cancelBooking,
    rescheduleBooking,
    isLoading,
    error,
    bookingResult,
  };
};

/**
 * Hook for session history
 */
export const useSessionHistory = (userId: string, role: 'mentor' | 'mentee') => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SessionFilters>({});

  const loadSessions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = role === 'mentor'
        ? await getMentorSessions(userId, filters)
        : await getMenteeSessions(userId, filters);
      
      setSessions(response.sessions);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load sessions';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [userId, role, filters]);

  const updateFilters = useCallback((newFilters: Partial<SessionFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  return {
    sessions,
    isLoading,
    error,
    filters,
    updateFilters,
    refresh: loadSessions,
  };
};

/**
 * Hook for mentor availability
 */
export const useMentorAvailability = (mentorId: string) => {
  const [availability, setAvailability] = useState<MentorAvailability | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAvailability = useCallback(
    async (startDate: string, endDate: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMentorAvailability(mentorId, startDate, endDate);
        setAvailability(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load availability';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [mentorId]
  );

  return {
    availability,
    isLoading,
    error,
    loadAvailability,
  };
};

/**
 * Hook for session actions (confirm, rate, etc.)
 */
export const useSessionActions = (currentUserId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmBooking = useCallback(
    async (sessionId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await confirmSession(sessionId, currentUserId);
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Confirmation failed';
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [currentUserId]
  );

  const rateSessionAction = useCallback(
    async (sessionId: string, rating: SessionRating): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await rateSession(sessionId, rating);
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Rating failed';
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    confirmBooking,
    rateSession: rateSessionAction,
    isLoading,
    error,
  };
};

/**
 * Hook for session statistics
 */
export const useSessionStats = (userId: string, role: 'mentor' | 'mentee') => {
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // This would call your API endpoint
      const response = await fetch(`/api/sessions/${role}/${userId}/stats`);
      
      if (!response.ok) {
        throw new Error('Failed to load session statistics');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load stats';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [userId, role]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    isLoading,
    error,
    refresh: loadStats,
  };
};
