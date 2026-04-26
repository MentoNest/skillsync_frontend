import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { User } from '@/entities/User.entity';
import { AuthUtils } from '@/lib/auth';

export const GET = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    // Require active admin user
    const adminUser = await AuthUtils.requireActiveUser(req);
    if (!adminUser.isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'email', 'fullName', 'status', 'isAdmin', 'createdAt'],
      order: { createdAt: 'DESC' },
    });

    return NextResponse.json({ users });
   } catch (error) {
     console.error('Get all users error:', error);
     return NextResponse.json(
       { error: 'Internal server error' },
       { status: 500 }
     );
   }
 };
