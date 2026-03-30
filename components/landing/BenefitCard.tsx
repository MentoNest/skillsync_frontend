// components/landing/BenefitCard.tsx

'use client';

import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function BenefitCard({ icon: IconComponent, title, description, index }: BenefitCardProps) {
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-xl bg-gradient-to-br from-white to-purple-50 border border-purple-100 hover:shadow-lg transition-shadow duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center mb-4">
        <IconComponent className="w-7 h-7 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
