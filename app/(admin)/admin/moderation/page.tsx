// app/(admin)/admin/moderation/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock, Filter, RefreshCw } from 'lucide-react';
import type { ReportSubmission, ReportStatus, ReportReason, ReportableType } from '@/types/report';

interface Report extends Omit<ReportSubmission, 'createdAt' | 'status'> {
  id: string;
  status: ReportStatus | 'pending' | 'under_review' | 'resolved' | 'rejected';
  reporter?: {
    id: string;
    name: string;
    email: string;
  };
  reviewer?: {
    id: string;
    name: string;
  };
  reviewedAt?: Date;
  resolution?: string;
  resolutionNote?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AdminModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'ALL' | ''>('');
  const [typeFilter, setTypeFilter] = useState<ReportableType | 'ALL'>('ALL');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch reports
  useEffect(() => {
    fetchReports();
  }, [statusFilter, typeFilter, pagination.page]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(typeFilter !== 'ALL' && { type: typeFilter }),
      });
      
      const response = await fetch(`/api/reports?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setReports(data.data.reports);
        setPagination(data.data.pagination);
      } else {
        setError('Failed to fetch reports');
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('An error occurred while fetching reports');
    } finally {
      setLoading(false);
    }
  };

  const handleModerate = async (reportId: string, action: 'APPROVE' | 'REJECT', resolutionNote?: string) => {
    try {
      setActionLoading(reportId);
      
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: action === 'APPROVE' ? 'RESOLVED' : 'REJECTED',
          action,
          resolution: action === 'APPROVE' ? 'Content removed/hidden' : 'No violation found',
          resolutionNote: resolutionNote || `Report ${action === 'APPROVE' ? 'approved' : 'rejected'} by moderator`,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setReports(prev => prev.filter(r => r.id !== reportId));
        setSelectedReport(null);
        
        // Show success message (you can use a toast library)
        alert(`Report ${action === 'APPROVE' ? 'approved' : 'rejected'} successfully`);
      } else {
        alert(`Failed to ${action.toLowerCase()} report: ${data.error}`);
      }
    } catch (err) {
      console.error('Error moderating report:', err);
      alert('An error occurred while processing the report');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'under_review': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getReasonIcon = (reason: string) => {
    switch (reason.toLowerCase()) {
      case 'spam': return '📧';
      case 'inappropriate': return '⚠️';
      case 'misleading': return '❌';
      case 'harassment': return '🚫';
      case 'fake_info': return '🎭';
      case 'other': return '📋';
      default: return '📋';
    }
  };

  const getTypeLabel = (type: ReportableType) => {
    return type.replace('_', ' ').toLowerCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchReports}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
              <p className="mt-1 text-sm text-gray-500">
                Review and manage reported content
              </p>
            </div>
            <button
              onClick={fetchReports}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Pending Reports"
            value={reports.filter(r => r.status.toLowerCase() === 'pending').length}
            icon={<Clock className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard
            title="Under Review"
            value={reports.filter(r => r.status.toLowerCase() === 'under_review').length}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Resolved"
            value={reports.filter(r => r.status.toLowerCase() === 'resolved').length}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            title="Rejected"
            value={reports.filter(r => r.status.toLowerCase() === 'rejected').length}
            icon={<XCircle className="w-6 h-6" />}
            color="red"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ReportStatus | 'ALL')}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ReportableType | 'ALL')}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="ALL">All Types</option>
              <option value="MENTOR">Mentors</option>
              <option value="COURSE">Courses</option>
              <option value="LEARNING_TRACK">Learning Tracks</option>
              <option value="REVIEW">Reviews</option>
              <option value="COMMENT">Comments</option>
              <option value="USER_PROFILE">User Profiles</option>
            </select>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              Reports ({pagination.total} total)
            </h2>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No reports found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onSelect={setSelectedReport}
                  getStatusColor={getStatusColor}
                  getReasonIcon={getReasonIcon}
                  getTypeLabel={getTypeLabel}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reports
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onApprove={() => handleModerate(selectedReport.id, 'APPROVE')}
          onReject={() => handleModerate(selectedReport.id, 'REJECT')}
          actionLoading={actionLoading === selectedReport.id}
          getStatusColor={getStatusColor}
          getReasonIcon={getReasonIcon}
          getTypeLabel={getTypeLabel}
        />
      )}
    </div>
  );
}

// Sub-components
function StatCard({ title, value, icon, color }: any) {
  const colorClasses = {
    yellow: 'bg-yellow-50 border-yellow-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    red: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-white shadow-sm`}>{icon}</div>
      </div>
    </div>
  );
}

function ReportCard({ report, onSelect, getStatusColor, getReasonIcon, getTypeLabel }: any) {
  return (
    <div
      onClick={() => onSelect(report)}
      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">{getReasonIcon(report.reason)}</span>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(report.status)}`}>
              {report.status}
            </span>
            <span className="text-xs text-gray-500 capitalize">{getTypeLabel(report.reportableType)}</span>
          </div>
          
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            Report ID: {report.id.slice(0, 8)}...
          </h3>
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {report.description || 'No description provided'}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Reported: {new Date(report.createdAt).toLocaleDateString()}</span>
            {report.reporter && (
              <span>By: {report.reporter.name}</span>
            )}
          </div>
        </div>
        
        <div className="ml-4">
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Review →
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportDetailModal({ report, onClose, onApprove, onReject, actionLoading, getStatusColor, getReasonIcon, getTypeLabel }: any) {
  const [note, setNote] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Report Details</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getReasonIcon(report.reason)}</span>
            <div>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
              <span className="ml-2 text-sm text-gray-600 capitalize">{getTypeLabel(report.reportableType)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Reason</h3>
            <p className="text-sm text-gray-900">{report.reason}</p>
          </div>

          {report.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
              <p className="text-sm text-gray-900">{report.description}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Reported Content</h3>
            <p className="text-sm text-gray-900">ID: {report.reportableId}</p>
          </div>

          {report.reporter && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Reporter</h3>
              <p className="text-sm text-gray-900">{report.reporter.name} ({report.reporter.email})</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Reported On</h3>
            <p className="text-sm text-gray-900">{new Date(report.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resolution Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 text-sm"
              placeholder="Add notes about this decision..."
            />
          </div>
        </div>

        <div className="p-6 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onReject(note)}
            disabled={actionLoading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 rounded-lg transition-colors"
          >
            {actionLoading ? 'Processing...' : 'Reject Report'}
          </button>
          <button
            onClick={() => onApprove(note)}
            disabled={actionLoading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 rounded-lg transition-colors"
          >
            {actionLoading ? 'Processing...' : 'Approve & Take Action'}
          </button>
        </div>
      </div>
    </div>
  );
}
