import type { ReactNode } from "react";

export interface CommunityStatCardProps {
  /** The headline number or percentage, e.g. "1,200+" or "98%" */
  value: string;
  /** Descriptive label beneath the value, e.g. "Active Mentors" */
  label: string;
  /** Optional icon rendered above the value */
  icon?: ReactNode;
}

export default function CommunityStatCard({
  value,
  label,
  icon,
}: CommunityStatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {icon && (
        <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          {icon}
        </div>
      )}
      <p className="text-4xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
