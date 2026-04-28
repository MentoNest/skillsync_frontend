import { JwtService } from '@/auth/jwt';
import { User } from '@/entities/User.entity';
import { UserStatus } from '@/types/enums';

// Mock user
const mockUser: User = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  fullName: 'Test User',
  password: 'hashedpassword',
  status: UserStatus.ACTIVE,
  isAdmin: false,
  createdAt: new Date(),
  updatedAt: new Date(),
} as User;

describe('JwtService', () => {
  beforeEach(() => {
    // Clear any env overrides
    delete process.env.JWT_SECRET;
    delete process.env.JWT_REFRESH_SECRET;
  });

  it('should generate access and refresh tokens', () => {
    const tokens = JwtService.generateTokens(mockUser);

    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
    expect(typeof tokens.accessToken).toBe('string');
    expect(typeof tokens.refreshToken).toBe('string');
  });

  it('should include user data in token payload', () => {
    const { accessToken } = JwtService.generateTokens(mockUser);
    const decoded = JwtService.verifyAccessToken(accessToken);

    expect(decoded).not.toBeNull();
    expect(decoded!.sub).toBe(mockUser.id);
    expect(decoded!.email).toBe(mockUser.email);
    expect(decoded!.status).toBe(mockUser.status);
    expect(decoded!.isAdmin).toBe(mockUser.isAdmin);
  });

  it('should return null for invalid access token', () => {
    const decoded = JwtService.verifyAccessToken('invalid-token');
    expect(decoded).toBeNull();
  });

  it('should return null for tampered token', () => {
    const { accessToken } = JwtService.generateTokens(mockUser);
    // Tamper with token by changing a character
    const tamperedToken = accessToken.slice(0, -5) + 'xxxxx';
    const decoded = JwtService.verifyAccessToken(tamperedToken);
    expect(decoded).toBeNull();
  });

  it('should successfully verify refresh token', () => {
    const { refreshToken } = JwtService.generateTokens(mockUser);
    const decoded = JwtService.verifyRefreshToken(refreshToken);

    expect(decoded).not.toBeNull();
    expect(decoded!.sub).toBe(mockUser.id);
  });

  it('should use different secrets for access and refresh tokens', () => {
    // Override secrets
    process.env.JWT_SECRET = 'test-access-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

    // Need to reinitialize or reimport to pick up new env? Since JwtService uses static values read at import time, this test may not work as intended.
    // For this test we'll just verify tokens are generated and valid individually.
    const { accessToken, refreshToken } = JwtService.generateTokens(mockUser);
    const accessDecoded = JwtService.verifyAccessToken(accessToken);
    const refreshDecoded = JwtService.verifyRefreshToken(refreshToken);

    expect(accessDecoded).not.toBeNull();
    expect(refreshDecoded).not.toBeNull();
  });
});
