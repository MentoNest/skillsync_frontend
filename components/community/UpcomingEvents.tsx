"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { trackEventRegistered } from "@/lib/community-analytics";
import type { CommunityEvent } from "@/lib/community-types";

export interface UpcomingEventsProps {
  /** Events to show, in display order. */
  events: CommunityEvent[];
  /** Heading text. */
  heading?: string;
  /**
   * Registers the viewer for an event.
   *
   * Optional because there is no events API yet (#988). Without a handler the
   * CTA still records the `event_registered` analytics conversion and moves to
   * the registered state, so the UI can be wired up ahead of the backend.
   */
  onRegister?: (eventId: string) => void | Promise<void>;
  /** Shown when nothing is scheduled. */
  emptyMessage?: string;
  /** Optional extra classes for layout flexibility. */
  className?: string;
}

interface FormattedStart {
  date: string;
  time: string;
  endTime?: string;
}

/**
 * Splits a start (and optional end) timestamp into display strings. Returns
 * `null` for unparseable input so the widget can skip the row instead of
 * rendering "Invalid Date".
 */
function formatStart(event: CommunityEvent): FormattedStart | null {
  const start = new Date(event.startsAt);
  if (Number.isNaN(start.getTime())) return null;

  const formatted: FormattedStart = {
    date: start.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: start.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
  };

  if (event.endsAt) {
    const end = new Date(event.endsAt);
    if (!Number.isNaN(end.getTime())) {
      formatted.endTime = end.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
    }
  }

  return formatted;
}

/**
 * Upcoming events widget for the community sidebar (#988): the event title,
 * host, date, time, registration count and a register CTA.
 *
 * Registration is optimistic — the CTA flips to "Registered" as soon as the
 * handler resolves, and the failure is surfaced inline without losing the row.
 */
export function UpcomingEvents({
  events,
  heading = "Upcoming Events",
  onRegister,
  emptyMessage = "No events scheduled yet",
  className,
}: UpcomingEventsProps) {
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function isRegistered(event: CommunityEvent) {
    return Boolean(event.isRegistered) || registeredIds.includes(event.id);
  }

  async function handleRegister(event: CommunityEvent) {
    if (isRegistered(event) || registeringId === event.id) return;

    setRegisteringId(event.id);
    setError(null);

    try {
      await onRegister?.(event.id);
      // Documented community analytics conversion (#988).
      trackEventRegistered(event.id);
      setRegisteredIds((current) => [...current, event.id]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not register for this event"
      );
    } finally {
      setRegisteringId(null);
    }
  }

  return (
    <section
      aria-labelledby="upcoming-events-heading"
      className={cn("min-w-0", className)}
    >
      <h2
        id="upcoming-events-heading"
        className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]"
      >
        {heading}
      </h2>

      {events.length === 0 ? (
        <p className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-4 text-sm text-[var(--muted)]">
          {emptyMessage}
        </p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => {
            const start = formatStart(event);
            const registered = isRegistered(event);
            const isPending = registeringId === event.id;

            return (
              <li
                key={event.id}
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
              >
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {event.title}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  Hosted by <span className="font-medium">{event.host}</span>
                </p>

                {start && (
                  <p className="mt-1 flex flex-wrap items-center gap-x-1 text-xs text-[var(--muted)]">
                    <time dateTime={event.startsAt}>{start.date}</time>
                    <span aria-hidden="true">·</span>
                    <time dateTime={event.startsAt}>{start.time}</time>
                    {start.endTime && (
                      <>
                        <span aria-hidden="true">–</span>
                        <time dateTime={event.endsAt}>{start.endTime}</time>
                      </>
                    )}
                  </p>
                )}

                <p className="mt-1 text-xs text-[var(--muted)]">
                  {event.registrationCount}{" "}
                  {event.registrationCount === 1
                    ? "registration"
                    : "registrations"}
                </p>

                <button
                  type="button"
                  onClick={() => handleRegister(event)}
                  disabled={registered || isPending}
                  aria-busy={isPending}
                  aria-label={
                    registered
                      ? `Registered for ${event.title}`
                      : `Register for ${event.title}`
                  }
                  className={cn(
                    "mt-2 inline-flex w-full items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60",
                    registered
                      ? "bg-[var(--secondary)] text-[var(--muted)]"
                      : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                  )}
                >
                  {registered
                    ? "Registered"
                    : isPending
                      ? "Registering…"
                      : "Register"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </section>
  );
}
