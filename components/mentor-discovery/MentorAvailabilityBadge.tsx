import { cn } from "@/lib/utils";

export type MentorAvailability = "available" | "busy" | "unavailable";

interface AvailabilityConfig {
  label: string;
  dotClassName: string;
}

const AVAILABILITY_CONFIG: Record<MentorAvailability, AvailabilityConfig> = {
  available: {
    label: "Available",
    dotClassName: "bg-emerald-500",
  },
  busy: {
    label: "Busy",
    dotClassName: "bg-amber-500",
  },
  unavailable: {
    label: "Fully Booked",
    dotClassName: "bg-slate-400",
  },
};

export interface MentorAvailabilityBadgeProps {
  availability: MentorAvailability;
  className?: string;
}

/**
 * Shows a mentor's availability as a colored dot paired with a text label.
 *
 * Color alone never carries the meaning: the label is always rendered as
 * visible text, and the whole badge is exposed to assistive tech via
 * role="status" + aria-label so screen readers announce the current state.
 */
export default function MentorAvailabilityBadge({
  availability,
  className,
}: MentorAvailabilityBadgeProps) {
  const { label, dotClassName } = AVAILABILITY_CONFIG[availability];

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      role="status"
      aria-label={`Mentor availability: ${label}`}
    >
      <span
        className={cn("w-2 h-2 rounded-full", dotClassName)}
        aria-hidden="true"
      />
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}
