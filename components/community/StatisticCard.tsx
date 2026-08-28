// Reusable statistic card component (#881)
import React from "react";

interface StatisticCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatisticCard = ({ label, value, icon }: StatisticCardProps) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
    {icon && (
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
        {icon}
      </div>
    )}
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

export default StatisticCard;
