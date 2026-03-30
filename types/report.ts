// types/report.ts

/**
 * Types of reportable content
 */
export type ReportableType = 
  | 'mentor'
  | 'course'
  | 'learning_track'
  | 'review'
  | 'comment'
  | 'user_profile';

/**
 * Reasons for reporting content
 */
export enum ReportReason {
  SPAM = 'spam',
  INAPPROPRIATE = 'inappropriate',
  MISLEADING = 'misleading',
  HARASSMENT = 'harassment',
  FAKE_INFO = 'fake_info',
  OTHER = 'other',
}

/**
 * Status of a submitted report
 */
export enum ReportStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

/**
 * Report submission data
 */
export interface ReportSubmission {
  id?: string;
  reportableType: ReportableType;
  reportableId: string;
  reason: ReportReason;
  description?: string;
  reporterId?: string;
  createdAt?: Date;
  status?: ReportStatus;
}

/**
 * Report form props
 */
export interface ReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reportableType: ReportableType;
  reportableId: string;
  reportableTitle?: string;
  onSubmit?: (report: ReportSubmission) => Promise<void>;
}

/**
 * Report button props
 */
export interface ReportButtonProps {
  reportableType: ReportableType;
  reportableId: string;
  reportableTitle?: string;
  variant?: 'icon' | 'text' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onReportSubmitted?: (reportId: string) => void;
}
