// Community statistics widget (#880)
import React from "react";

interface Stat {
  label: string;
  value: string | number;
}

interface CommunityStatisticsWidgetProps {
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { label: "Total Members", value: "12,483" },
  { label: "Active Discussions", value: 347 },
  { label: "Total Discussions", value: "4,201" },
  { label: "Events This Month", value: 8 },
];

const CommunityStatisticsWidget = ({
  stats = DEFAULT_STATS,
}: CommunityStatisticsWidgetProps) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4">
    <h3 className="font-semibold text-gray-900 mb-3">Community Stats</h3>
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-gray-50 rounded-lg p-3">
          <p className="text-lg font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CommunityStatisticsWidget;
