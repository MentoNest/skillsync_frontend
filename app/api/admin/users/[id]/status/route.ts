import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { User } from '@/entities/User.entity';
import { AuthUtils } from '@/lib/auth';
import { validateStatusTransition } from '@/lib/status-transitions';
import { UserStatus } from '@/types/enums';

export const PATCH = async (
  req: NextRequest,
  params: Record<string, string>
): Promise<NextResponse> => {
  try {
    const { id: userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Authenticate and ensure admin
    const adminUser = await AuthUtils.requireActiveUser(req);
    if (!adminUser.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { status } = await req.json();

    if (!status || !Object.values(UserStatus).includes(status as UserStatus)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${Object.values(UserStatus).join(', ')}` },
        { status: 400 }
      );
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent admins from changing their own status
    if (user.id === adminUser.id) {
      return NextResponse.json(
        { error: 'Cannot change your own status' },
        { status: 403 }
      );
    }

    // Validate status transition
    const validation = validateStatusTransition(user.status, status as UserStatus);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Update status
    user.status = status as UserStatus;
    await userRepository.save(user);

    return NextResponse.json({
      message: 'User status updated successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        status: user.status,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Update user status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
