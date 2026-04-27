import { AuthUtils } from '@/lib/auth';

describe('AuthUtils', () => {
  describe('extractTokenFromAuthHeader', () => {
    it('should extract token from valid Bearer header', () => {
      const token = AuthUtils.extractTokenFromAuthHeader('Bearer abc123token');
      expect(token).toBe('abc123token');
    });

    it('should be case-insensitive for bearer', () => {
      const token = AuthUtils.extractTokenFromAuthHeader('bearer token123');
      expect(token).toBe('token123');
    });

    it('should return null for missing Authorization header', () => {
      const token = AuthUtils.extractTokenFromAuthHeader(null);
      expect(token).toBeNull();
    });

    it('should return null for malformed header (no space)', () => {
      const token = AuthUtils.extractTokenFromAuthHeader('bearertoken');
      expect(token).toBeNull();
    });

    it('should return null for header with only Bearer and no token', () => {
      const token = AuthUtils.extractTokenFromAuthHeader('Bearer ');
      expect(token).toBeNull();
    });
  });

  describe('extractTokenFromCookies', () => {
    it('should extract access_token from cookie string', () => {
      const cookie = 'session=xyz; access_token=jwt-token-abc; other=val';
      const token = AuthUtils.extractTokenFromCookies(cookie);
      expect(token).toBe('jwt-token-abc');
    });

    it('should handle cookie string with encoded characters', () => {
      const cookie = 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
      const token = AuthUtils.extractTokenFromCookies(cookie);
      expect(token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    });

    it('should return null for missing cookie', () => {
      const token = AuthUtils.extractTokenFromCookies(null);
      expect(token).toBeNull();
    });

    it('should return null if access_token not found', () => {
      const cookie = 'session=xyz; other=val';
      const token = AuthUtils.extractTokenFromCookies(cookie);
      expect(token).toBeNull();
    });
  });
});
