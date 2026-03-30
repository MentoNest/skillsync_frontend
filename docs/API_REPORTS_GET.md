// Backend API endpoint for reports - GET /api/reports
// This file should be placed in: app/api/reports/route.ts (Next.js App Router)

import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all reports with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Query parameters
    const status = searchParams.get('status') || 'PENDING';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type'); // Filter by reportableType
    const reason = searchParams.get('reason'); // Filter by reason
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {
      status: status as any,
    };
    
    if (type) {
      where.reportableType = type as any;
    }
    
    if (reason) {
      where.reason = reason as any;
    }
    
    // Fetch reports with relations
    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take: limit,
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
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.report.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        reports,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reports' 
      },
      { status: 500 }
    );
  }
}
