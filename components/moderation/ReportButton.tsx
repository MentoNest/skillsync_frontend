// components/moderation/ReportButton.tsx

'use client';

import { useState } from 'react';
import { Flag } from 'lucide-react';
import ReportDialog from './ReportDialog';
import type { ReportButtonProps, ReportSubmission } from '@/types/report';

export default function ReportButton({
  reportableType,
  reportableId,
  reportableTitle,
  variant = 'icon',
  size = 'md',
  className = '',
  onReportSubmitted,
}: ReportButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitReport = async (report: ReportSubmission) => {
    // In a real implementation, this would send the report to your backend
    console.log('Submitting report:', report);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (onReportSubmitted) {
      onReportSubmitted(report.id || 'new-report');
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 hover:bg-gray-100',
    md: 'p-2 hover:bg-gray-100',
    lg: 'p-2.5 hover:bg-gray-200',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <>
      {/* Report Trigger Button */}
      {variant === 'icon' ? (
        <button
          onClick={() => setIsDialogOpen(true)}
          className={`${sizeClasses[size]} ${className} text-gray-400 hover:text-red-600 transition-colors rounded-full`}
          aria-label={`Report this ${reportableType.replace('_', ' ')}`}
          title={`Report ${reportableTitle || reportableType}`}
        >
          <Flag className={iconSizes[size]} />
        </button>
      ) : variant === 'text' ? (
        <button
          onClick={() => setIsDialogOpen(true)}
          className={`px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 ${className}`}
        >
          <Flag className="w-4 h-4" />
          Report
        </button>
      ) : (
        <button
          onClick={() => setIsDialogOpen(true)}
          className={`text-sm text-gray-500 hover:text-red-600 underline decoration-dotted underline-offset-4 ${className}`}
        >
          Report inappropriate content
        </button>
      )}

      {/* Report Dialog */}
      <ReportDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        reportableType={reportableType}
        reportableId={reportableId}
        reportableTitle={reportableTitle}
        onSubmit={handleSubmitReport}
      />
    </>
  );
}
