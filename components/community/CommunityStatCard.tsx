'use client';

interface CommunityStatCardProps {
  label: string;
  value: number | string;
  trend?: { value: number; isPositive: boolean };
  icon?: React.ReactNode;
}

export default function CommunityStatCard({ label, value, trend, icon }: CommunityStatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
      {icon && (
        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0 text-cyan-600">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 truncate">{label}</p>
      </div>
      {trend && (
        <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? '+' : ''}{trend.value}%
        </span>
      )}
    </div>
  );
}
