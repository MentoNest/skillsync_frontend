'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  heading: string;
  supportingText: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function EmptyState({
  icon,
  heading,
  supportingText,
  ctaText,
  onCtaClick
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon/Illustration */}
      {icon && (
        <div className="mb-6 text-gray-400">
          {icon}
        </div>
      )}
      
      {/* Heading */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {heading}
      </h3>
      
      {/* Supporting text */}
      <p className="text-gray-600 mb-8 max-w-md">
        {supportingText}
      </p>
      
      {/* CTA Button */}
      {ctaText && onCtaClick && (
        <Button onClick={onCtaClick}>
          {ctaText}
        </Button>
      )}
    </div>
  );
}