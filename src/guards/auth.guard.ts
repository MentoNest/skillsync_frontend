import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';
import { User } from '@/entities/User.entity';

export interface AuthenticatedRequest extends NextRequest {
  user?: User;
}

export type HandlerFunc = (
  req: AuthenticatedRequest,
  params: Record<string, string>
) => Promise<NextResponse>;

export function withAuth(
  handler: HandlerFunc
): (req: NextRequest, params: Record<string, string>) => Promise<NextResponse> {
  return async (
    req: NextRequest,
    params: Record<string, string>
  ): Promise<NextResponse> => {
    // Try to extract token from Authorization header or cookies
    const authHeader = req.headers.get('authorization');
    const cookieHeader = req.headers.get('cookie');

    const token =
      AuthUtils.extractTokenFromAuthHeader(authHeader) ||
      AuthUtils.extractTokenFromCookies(cookieHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const user = await AuthUtils.validateActiveUser(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token or user not active' },
        { status: 403 }
      );
    }

    // Attach user to request
    const authReq = req as AuthenticatedRequest;
    authReq.user = user;

    return handler(authReq, params);
  };
}

export function optionalAuth(
  handler: (req: NextRequest, user: User | null, params: Record<string, string>) => Promise<NextResponse>
): (req: NextRequest, params: Record<string, string>) => Promise<NextResponse> {
  return async (
    req: NextRequest,
    params: Record<string, string>
  ): Promise<NextResponse> => {
    const authHeader = req.headers.get('authorization');
    const cookieHeader = req.headers.get('cookie');

    const token =
      AuthUtils.extractTokenFromAuthHeader(authHeader) ||
      AuthUtils.extractTokenFromCookies(cookieHeader);

    let user: User | null = null;

    if (token) {
      user = await AuthUtils.getUserFromToken(token);
    }

    return handler(req, user, params);
  };
}
