import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const user = await AuthUtils.requireActiveUser(req);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        status: user.status,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
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
