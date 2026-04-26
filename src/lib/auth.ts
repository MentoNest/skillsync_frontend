import { User } from '@/entities/User.entity';
import { AppDataSource } from '@/lib/database';
import { JwtService } from '@/auth/jwt';
import { NextRequest } from 'next/server';

export class AuthUtils {
  static async getUserFromToken(token: string): Promise<User | null> {
    try {
      const payload = JwtService.verifyAccessToken(token);
      if (!payload) {
        return null;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: payload.sub },
      });

      return user || null;
    } catch {
      return null;
    }
  }

  static async validateActiveUser(token: string): Promise<User | null> {
    const user = await this.getUserFromToken(token);
    if (!user) {
      return null;
    }

    if (user.status !== 'active') {
      return null;
    }

    return user;
  }

  static extractTokenFromAuthHeader(authHeader: string | null): string | null {
    if (!authHeader) {
      return null;
    }

    const [type, token] = authHeader.split(' ');
    if (type.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }

  static extractTokenFromCookies(cookies: string | null): string | null {
    if (!cookies) {
      return null;
    }

    const match = cookies.match(/access_token=([^;]+)/);
    return match ? match[1] : null;
  }

  static async getUserFromRequest(req: NextRequest): Promise<User | null> {
    const authHeader = req.headers.get('authorization');
    const cookieHeader = req.headers.get('cookie');

    const token =
      this.extractTokenFromAuthHeader(authHeader) ||
      this.extractTokenFromCookies(cookieHeader);

    if (!token) {
      return null;
    }

    // Get user regardless of status (for some internal checks)
    return this.getUserFromToken(token);
  }

  static async requireActiveUser(req: NextRequest): Promise<User> {
    const user = await this.getUserFromRequest(req);
    if (!user) {
      throw new Error('Unauthorized');
    }
    if (user.status !== 'active') {
      throw new Error('User not active');
    }
    return user;
  }
}
