import jwt from 'jsonwebtoken';
import { JwtPayload, TokenPair } from './types';
import { User } from '@/entities/User.entity';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export class JwtService {
  static generateTokens(user: User): TokenPair {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      status: user.status,
      isAdmin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload as jwt.JwtPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any,
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload as jwt.JwtPayload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN as any,
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
