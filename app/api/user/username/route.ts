import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';
import { UserService } from '@/services/user.service';

const userService = new UserService();

export const PATCH = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const user = await AuthUtils.requireActiveUser(req);

    const body = await req.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Get client info for audit log
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

    const result = await userService.changeUsername(user.id, username, ipAddress, userAgent);

    if (!result.success) {
      const status = result.error?.includes('cooldown') ? 403 : 400;
      return NextResponse.json(
        { error: result.error, remainingDays: result.remainingDays },
        { status }
      );
    }

    // Return updated user info
    const updatedUser = result.user!;
    return NextResponse.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        displayName: updatedUser.displayName,
        status: updatedUser.status,
        isAdmin: updatedUser.isAdmin,
        usernameChangedAt: updatedUser.usernameChangedAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Username change error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
