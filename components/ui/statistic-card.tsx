'use client';

import React from 'react';

interface StatisticCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
}

export function StatisticCard({ label, value, icon }: StatisticCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
      {icon && (
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          {icon}
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}