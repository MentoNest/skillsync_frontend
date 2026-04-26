import { User } from '@/entities/User.entity';

export interface JwtPayload {
  sub: string;
  email: string;
  status: string;
  isAdmin: boolean;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
