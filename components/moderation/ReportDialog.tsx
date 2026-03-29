// components/moderation/ReportDialog.tsx

'use client';

import { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import type { ReportDialogProps, ReportSubmission } from '@/types/report';
import { ReportReason } from '@/types/report';

const reportReasons = [
  { value: ReportReason.SPAM, label: 'Spam', description: 'Misleading or repetitive content' },
  { value: ReportReason.INAPPROPRIATE, label: 'Inappropriate', description: 'Offensive or harmful content' },
  { value: ReportReason.MISLEADING, label: 'Misleading', description: 'False or deceptive information' },
  { value: ReportReason.HARASSMENT, label: 'Harassment', description: 'Bullying or threatening behavior' },
  { value: ReportReason.FAKE_INFO, label: 'Fake Information', description: 'Impersonation or false credentials' },
  { value: ReportReason.OTHER, label: 'Other', description: 'Something else' },
];

export default function ReportDialog({
  isOpen,
  onClose,
  reportableType,
  reportableId,
  reportableTitle,
  onSubmit,
}: ReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState<ReportReason | ''>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReason) return;

    setIsSubmitting(true);

    try {
      const report: ReportSubmission = {
        reportableType,
        reportableId,
        reason: selectedReason as ReportReason,
        description: description.trim() || undefined,
      };

      if (onSubmit) {
        await onSubmit(report);
      }

      setSubmitted(true);
      
      // Close after showing success message
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedReason('');
    setDescription('');
    setIsSubmitting(false);
    setSubmitted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-dialog-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 id="report-dialog-title" className="text-lg font-semibold text-gray-900">
              Report Content
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* What's being reported */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                You are reporting this{' '}
                <span className="font-medium text-gray-900">
                  {reportableType.replace('_', ' ')}
                </span>
                {reportableTitle && (
                  <>
                    {' '}
                    <span className="text-gray-500">"</span>
                    <span className="font-medium text-gray-900">{reportableTitle}</span>
                    <span className="text-gray-500">"</span>
                  </>
                )}
              </p>
            </div>

            {!submitted ? (
              <>
                {/* Reason Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Reason for reporting *
                  </label>
                  <div className="space-y-2">
                    {reportReasons.map((reason) => (
                      <label
                        key={reason.value}
                        className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedReason === reason.value
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={reason.value}
                          checked={selectedReason === reason.value}
                          onChange={(e) => setSelectedReason(e.target.value as ReportReason)}
                          className="mt-0.5 w-4 h-4 text-red-600 focus:ring-red-500"
                          required
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{reason.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{reason.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Additional Details <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please provide any additional context that might help us understand your report..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none text-sm"
                  />
                </div>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Report Submitted
                </h3>
                <p className="text-sm text-gray-600">
                  Thank you for helping keep our community safe. We'll review this report shortly.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {!submitted && (
            <div className="flex gap-3 px-6 pb-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedReason || isSubmitting}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
