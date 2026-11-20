export interface CommunityStatsProps {
  totalMembers: number;
  activeDiscussions: number;
  totalDiscussions: number;
  eventsThisMonth: number;
  className?: string;
}

export default function CommunityStats({
  totalMembers,
  activeDiscussions,
  totalDiscussions,
  eventsThisMonth,
  className,
}: CommunityStatsProps) {
  const stats = [
    { label: "Total Members", value: totalMembers },
    { label: "Active Discussions", value: activeDiscussions },
    { label: "Total Discussions", value: totalDiscussions },
    { label: "Events This Month", value: eventsThisMonth },
  ];

  return (
    <section
      aria-label="Community statistics"
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className ?? ""}`}
    >
      <h2 className="text-base font-semibold text-slate-900">Community at a glance</h2>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs font-medium text-slate-500">{stat.label}</dt>
            <dd className="mt-1 text-xl font-semibold text-slate-900">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
