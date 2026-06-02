export type AvailabilityStatus = 'available' | 'busy' | 'fully_booked';

const config: Record<AvailabilityStatus, { label: string; dot: string; badge: string }> = {
  available: {
    label: 'Available',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  busy: {
    label: 'Busy',
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  fully_booked: {
    label: 'Fully Booked',
    dot: 'bg-red-400',
    badge: 'bg-red-50 text-red-600 border-red-200',
  },
};

type Props = {
  status: AvailabilityStatus;
  /** 'badge' renders a pill; 'dot' renders only the colored dot */
  variant?: 'badge' | 'dot';
};

export default function AvailabilityBadge({ status, variant = 'badge' }: Props) {
  const { label, dot, badge } = config[status];

  if (variant === 'dot') {
    return <span className={`inline-block w-2.5 h-2.5 rounded-full ${dot}`} aria-label={label} />;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium px-2 py-0.5 rounded-full border ${badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </span>
  );
}
