// Backend API endpoint for report moderation - PATCH /api/reports/[id]
// This file should be placed in: app/api/reports/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH - Update report status (approve/reject)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { 
      status, 
      resolution, 
      resolutionNote,
      action // 'APPROVE' or 'REJECT'
    } = body;
    
    // Validate status
    if (!['PENDING', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid status. Must be PENDING, UNDER_REVIEW, RESOLVED, or REJECTED' 
        },
        { status: 400 }
      );
    }
    
    // Get current user (moderator) from session/auth
    // Replace with your actual auth logic
    const currentUser = await getCurrentUser(request);
    
    if (!currentUser || !['ADMIN', 'MODERATOR'].includes(currentUser.role)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized. Only admins and moderators can moderate reports' 
        },
        { status: 403 }
      );
    }
    
    // Update the report
    const updatedReport = await prisma.report.update({
      where: { id },
      data: {
        status: status as any,
        resolution: resolution,
        resolutionNote: resolutionNote,
        reviewedBy: currentUser.id,
        reviewedAt: new Date(),
      },
      include: {
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    
    // Take action based on approval/rejection
    if (action === 'APPROVE') {
      await handleApprovedReport(updatedReport);
    } else if (action === 'REJECT') {
      await handleRejectedReport(updatedReport);
    }
    
    // Log moderation action
    await prisma.moderationLog.create({
      data: {
        action: action || (status === 'RESOLVED' ? 'APPROVED' : 'REJECTED'),
        reportId: id,
        moderatorId: currentUser.id,
        reason: resolutionNote,
        metadata: {
          previousStatus: updatedReport.status,
          newStatus: status,
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      data: updatedReport,
      message: `Report ${action === 'APPROVE' ? 'approved' : 'rejected'} successfully`,
    });
  } catch (error) {
    console.error('Error moderating report:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update report' 
      },
      { status: 500 }
    );
  }
}

// Helper functions
async function handleApprovedReport(report: any) {
  // Take action based on report type
  switch (report.reportableType) {
    case 'MENTOR':
      // Deactivate mentor profile
      await prisma.mentor.update({
        where: { id: report.reportableId },
        data: { isActive: false, status: 'SUSPENDED' },
      });
      break;
      
    case 'COURSE':
    case 'LEARNING_TRACK':
      // Unpublish course/track
      await prisma.course.update({
        where: { id: report.reportableId },
        data: { isPublished: false, status: 'UNDER_REVIEW' },
      });
      break;
      
    case 'REVIEW':
    case 'COMMENT':
      // Hide/delete content
      await prisma.review.update({
        where: { id: report.reportableId },
        data: { isVisible: false, status: 'HIDDEN' },
      });
      break;
      
    case 'USER_PROFILE':
      // Suspend user account
      await prisma.user.update({
        where: { id: report.reportableId },
        data: { isActive: false, status: 'SUSPENDED' },
      });
      break;
  }
  
  // Notify the content owner
  await notifyContentOwner(report);
}

async function handleRejectedReport(report: any) {
  // No action taken on content, just close the report
  // Optionally notify the reporter
  await notifyReporter(report);
}

async function notifyContentOwner(report: any) {
  // Send email/notification to content owner
  // Implement based on your notification system
  console.log(`Notifying content owner about action on report ${report.id}`);
}

async function notifyReporter(report: any) {
  // Send email/notification to reporter
  console.log(`Notifying reporter about decision on report ${report.id}`);
}

async function getCurrentUser(request: NextRequest) {
  // Implement your authentication logic here
  // This is a placeholder
  return {
    id: 'user-id',
    role: 'ADMIN',
    name: 'Current User',
  };
}
