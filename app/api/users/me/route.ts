import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const user = await AuthUtils.requireActiveUser(req);

    // Generate display name if not set (fallback for existing users)
    const displayName =
      user.displayName || user.email?.split('@')[0] || 'User';

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        displayName,
        status: user.status,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        usernameChangedAt: user.usernameChangedAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
