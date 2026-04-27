import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { User } from '@/entities/User.entity';
import { hashPassword } from '@/lib/password';
import { JwtService } from '@/auth/jwt';
import { UserStatus } from '@/types/enums';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, fullName, password } = await req.json();

    if (!email || !fullName || !password) {
      return NextResponse.json(
        { error: 'Email, full name, and password are required' },
        { status: 400 }
      );
    }

    const userRepository = AppDataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Determine default status
    // For now, default to 'active'. If email verification is enabled in future, use 'pending_verification'
    const defaultStatus = process.env.EMAIL_VERIFICATION_ENABLED === 'true'
      ? UserStatus.PENDING_VERIFICATION
      : UserStatus.ACTIVE;

    // Create user
    const user = new User();
    user.email = email;
    user.fullName = fullName;
    user.password = hashedPassword;
    user.status = defaultStatus;
    user.isAdmin = false;

    await userRepository.save(user);

    // Generate tokens
    const { accessToken, refreshToken } = JwtService.generateTokens(user);

    // Set token in HTTP-only cookie (for security)
    const response = NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          status: user.status,
          isAdmin: user.isAdmin,
        },
      },
      { status: 201 }
    );

    // Set cookies
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 minutes
      path: '/',
    });

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
