import { NextRequest, NextResponse } from 'next/server';
import { validateUsername } from '@/lib/username-validation';
import { UserService } from '@/services/user.service';

const userService = new UserService();

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username query parameter is required' },
        { status: 400 }
      );
    }

    // Validate format first
    const validation = validateUsername(username);
    if (!validation.valid) {
      return NextResponse.json(
        { available: false, reason: validation.error },
        { status: 200 }
      );
    }

    const availability = await userService.checkUsernameAvailability(username);
    return NextResponse.json(
      { available: availability.available, reason: availability.reason },
      { status: 200 }
    );
  } catch (error) {
    console.error('Username availability check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
