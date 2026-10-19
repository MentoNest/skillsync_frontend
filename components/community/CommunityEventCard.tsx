"use client";

import { cn } from "@/lib/utils";
import type { CommunityEvent } from "@/lib/community-types";

export interface CommunityEventCardProps {
  /** The event to render. */
  event: CommunityEvent;
  /**
   * Called with the event id when the viewer registers. When omitted the
   * register action renders disabled, which keeps the card safe to use in
   * read-only contexts.
   */
  onRegister?: (eventId: string) => void;
  /** Shows a pending state and blocks repeat clicks while registering. */
  isRegistering?: boolean;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

/** Format an ISO date-time as e.g. "Tue, Sep 30". Invalid input renders "". */
function formatEventDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
}

/** Format an ISO time range as e.g. "5:00 PM – 7:00 PM". */
function formatEventTime(startsAt: string, endsAt?: string): string {
  const start = new Date(startsAt);
  if (Number.isNaN(start.getTime())) return "";

  const startLabel = timeFormatter.format(start);
  if (!endsAt) return startLabel;

  const end = new Date(endsAt);
  return Number.isNaN(end.getTime())
    ? startLabel
    : `${startLabel} – ${timeFormatter.format(end)}`;
}

function formatCount(value: number): string {
  return Number.isFinite(value) ? value.toLocaleString("en-US") : "0";
}

/**
 * Reusable card for a community event (#989).
 *
 * Renders the event title, host, date, time, registration count and a
 * register action. Purely presentational: all data comes in via props so the
 * card can be reused on the feed, the events page or the sidebar.
 */
export function CommunityEventCard({
  event,
  onRegister,
  isRegistering = false,
  className,
}: CommunityEventCardProps) {
  const isRegistered = Boolean(event.isRegistered);
  const isFull =
    event.capacity !== undefined && event.registrationCount >= event.capacity;
  const isDisabled = isRegistered || isFull || isRegistering || !onRegister;

  let actionLabel = "Register";
  if (isRegistered) actionLabel = "Registered";
  else if (isFull) actionLabel = "Full";
  else if (isRegistering) actionLabel = "Registering…";

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 transition-shadow hover:shadow-md focus-within:shadow-md",
        className
      )}
      aria-labelledby={`community-event-title-${event.id}`}
    >
      <div className="flex flex-col gap-1">
        <h3
          id={`community-event-title-${event.id}`}
          className="text-base font-semibold text-[var(--foreground)]"
        >
          {event.title}
        </h3>
        <p className="text-sm text-[var(--muted)]">
          Hosted by{" "}
          <span className="font-medium text-[var(--foreground)]">
            {event.host}
          </span>
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-sm text-[var(--muted)]">
        <div>
          <dt className="sr-only">Date</dt>
          <dd>
            <time dateTime={event.startsAt}>
              {formatEventDate(event.startsAt)}
            </time>
          </dd>
        </div>
        <div>
          <dt className="sr-only">Time</dt>
          <dd>
            <time dateTime={event.startsAt}>
              {formatEventTime(event.startsAt, event.endsAt)}
            </time>
          </dd>
        </div>
        {event.location ? (
          <div className="col-span-2">
            <dt className="sr-only">Location</dt>
            <dd>{event.location}</dd>
          </div>
        ) : null}
      </dl>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">
          <span className="font-semibold text-[var(--foreground)]">
            {formatCount(event.registrationCount)}
          </span>{" "}
          registered
          {event.capacity !== undefined
            ? ` of ${formatCount(event.capacity)}`
            : ""}
        </p>
        <button
          type="button"
          onClick={() => onRegister?.(event.id)}
          disabled={isDisabled}
          aria-label={`Register for ${event.title}`}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
            isDisabled
              ? "cursor-not-allowed bg-[var(--secondary)] text-[var(--muted)]"
              : "bg-[var(--primary)] text-white hover:opacity-90"
          )}
        >
          {actionLabel}
        </button>
      </div>
    </article>
  );
}
