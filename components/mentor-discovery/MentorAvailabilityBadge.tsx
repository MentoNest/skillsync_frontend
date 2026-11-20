export type MentorAvailability = "available" | "busy" | "fully-booked";

export interface MentorAvailabilityBadgeProps {
  status: MentorAvailability;
  className?: string;
}

const STYLES: Record<MentorAvailability, string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  busy: "bg-amber-50 text-amber-700 border-amber-200",
  "fully-booked": "bg-slate-100 text-slate-600 border-slate-200",
};

const LABELS: Record<MentorAvailability, string> = {
  available: "Available",
  busy: "Busy",
  "fully-booked": "Fully Booked",
};

export default function MentorAvailabilityBadge({
  status,
  className,
}: MentorAvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[status]} ${className ?? ""}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status]}
    </span>
  );
}
