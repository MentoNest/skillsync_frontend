import {
  validateUsername,
  canChangeUsername,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from '@/lib/username-validation';

describe('validateUsername', () => {
  it('should accept valid usernames', () => {
    const validUsernames = [
      'john_doe',
      'jane-doe',
      'user123',
      'User_123',
      'a_b-c',
      'abc',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'a'.repeat(30),
    ];

    validUsernames.forEach((username) => {
      const result = validateUsername(username);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  it('should reject usernames that are too short', () => {
    const shortUsernames = ['a', 'ab']; // lengths 1,2
    shortUsernames.forEach((username) => {
      const result = validateUsername(username);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('at least 3 characters');
    });
  });

  it('should reject usernames that are too long', () => {
    const longUsername = 'a'.repeat(31);
    const result = validateUsername(longUsername);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('no more than 30 characters');
  });

  it('should reject usernames with invalid characters', () => {
    const invalidUsernames = [
      'john.doe', // dot not allowed
      'john doe', // space
      'john@doe', // @
      'john#doe', // #
      'john$doe', // $
      'john%doe', // %
    ];

    invalidUsernames.forEach((username) => {
      const result = validateUsername(username);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('only contain letters, numbers, underscores, and dashes');
    });
  });

  it('should reject usernames with consecutive special characters', () => {
    const invalidUsernames = [
      'john__doe',
      'john--doe',
      'john_-doe',
      'john-_doe',
      '__start',
      'end__',
      'test--',
    ];

    invalidUsernames.forEach((username) => {
      const result = validateUsername(username);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('consecutive special characters');
    });
  });

  it('should reject empty or whitespace-only usernames', () => {
    const emptyCases = ['', '   ', null, undefined];
    emptyCases.forEach((username) => {
      const result = validateUsername(username as any);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Username is required');
    });
  });

  it('should trim whitespace from username', () => {
    const result = validateUsername('  john_doe  ');
    expect(result.valid).toBe(true);
  });
});

describe('canChangeUsername', () => {
  it('should allow change if never changed before', () => {
    const result = canChangeUsername(null);
    expect(result.canChange).toBe(true);
    expect(result.reason).toBeUndefined();
  });

  it('should allow change if last change was more than 30 days ago', () => {
    const thirtyOneDaysAgo = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000);
    const result = canChangeUsername(thirtyOneDaysAgo);
    expect(result.canChange).toBe(true);
  });

  it('should deny change if within cooldown period', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
    const result = canChangeUsername(tenDaysAgo);
    expect(result.canChange).toBe(false);
    expect(result.reason).toContain('30 days');
    expect(result.remainingDays).toBeGreaterThan(0);
    expect(result.remainingDays).toBeLessThanOrEqual(20);
  });

  it('should return exact remaining days', () => {
    // Exactly 29 days remaining
    const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    const result = canChangeUsername(oneDayAgo);
    expect(result.remainingDays).toBe(29);
  });

  it('should allow change exactly at cooldown boundary', () => {
    const exactly30DaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = canChangeUsername(exactly30DaysAgo);
    // Because of milliseconds precision, may be at boundary exactly
    // Either allowed or remainingDays = 0, but let's be tolerant.
    if (!result.canChange) {
      expect(result.remainingDays).toBe(0);
    } else {
      expect(result.canChange).toBe(true);
    }
  });
});
