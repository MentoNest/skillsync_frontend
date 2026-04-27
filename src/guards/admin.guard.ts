import { NextRequest, NextResponse } from 'next/server';
import { withAuth, HandlerFunc, AuthenticatedRequest } from '@/guards/auth.guard';

export function withAdmin(
  handler: HandlerFunc
): (req: NextRequest, params: Record<string, string>) => Promise<NextResponse> {
  return withAuth(async (req: AuthenticatedRequest, params: Record<string, string>): Promise<NextResponse> => {
    if (!req.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    return handler(req, params);
  });
}
