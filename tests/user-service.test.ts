import { UserService } from '@/services/user.service';
import { Repository } from 'typeorm';
import { User } from '@/entities/User.entity';
import { AuditLog } from '@/entities/AuditLog.entity';

// Helper to create mock repository
function createMockRepository(): jest.Mocked<Repository<any>> {
  return {
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      setParameters: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    })),
    manager: {
      transaction: jest.fn(),
    } as any,
  } as any;
}

describe('UserService', () => {
  let mockUserRepo: jest.Mocked<Repository<any>>;
  let mockAuditRepo: jest.Mocked<Repository<any>>;
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUserRepo = createMockRepository();
    mockAuditRepo = createMockRepository();

    userService = new UserService(mockUserRepo as any, mockAuditRepo as any);
  });

  describe('checkUsernameAvailability', () => {
    it('should return available if username does not exist', async () => {
      mockUserRepo.findOne.mockResolvedValue(null);
      const result = await userService.checkUsernameAvailability('newuser');
      expect(result.available).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    it('should return not available if username exists', async () => {
      const existingUser = { id: '123', username: 'taken' } as User;
      mockUserRepo.findOne.mockResolvedValue(existingUser);
      const result = await userService.checkUsernameAvailability('taken');
      expect(result.available).toBe(false);
      expect(result.reason).toBe('Username is already taken');
    });

    it('should ignore excluded userId', async () => {
      const existingUser = { id: '123', username: 'myuser' } as User;
      mockUserRepo.findOne.mockResolvedValue(existingUser);
      const result = await userService.checkUsernameAvailability('myuser', '123');
      expect(result.available).toBe(true);
    });

    it('should normalize username to lowercase', async () => {
      mockUserRepo.findOne.mockResolvedValue(null);
      await userService.checkUsernameAvailability('NewUser');
      expect(mockUserRepo.findOne).toHaveBeenCalledWith({
        where: { username: 'newuser' },
      });
    });
  });

  describe('changeUsername', () => {
    const userId = 'user-123';
    const oldUsername = 'olduser';
    const baseUser = {
      id: userId,
      username: oldUsername,
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'hashed',
      status: 'active',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      usernameChangedAt: undefined,
    } as any;

    beforeEach(() => {
      mockUserRepo.findOne.mockResolvedValue(baseUser);
    });

    it('should reject invalid username format', async () => {
      const result = await userService.changeUsername(userId, 'ab');
      expect(result.success).toBe(false);
      expect(result.error).toContain('at least 3 characters');
    });

    it('should reject if new username same as current', async () => {
      const result = await userService.changeUsername(userId, 'olduser');
      expect(result.success).toBe(false);
      expect(result.error).toBe('New username is the same as current username');
    });

    it('should reject if username is taken by another user', async () => {
      mockUserRepo.findOne
        .mockResolvedValueOnce(baseUser) // initial user fetch
        .mockResolvedValueOnce({ id: 'other', username: 'newuser' } as any); // availability check finds taken
      const result = await userService.changeUsername(userId, 'newuser');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Username is already taken');
    });

    it('should reject if within cooldown period', async () => {
      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      baseUser.usernameChangedAt = tenDaysAgo;

      const result = await userService.changeUsername(userId, 'newuser');
      expect(result.success).toBe(false);
      expect(result.error).toContain('30 days');
      if (result.remainingDays) {
        expect(result.remainingDays).toBeGreaterThan(19);
        expect(result.remainingDays).toBeLessThanOrEqual(20);
      }
    });

    it('should succeed and perform transaction correctly', async () => {
      baseUser.usernameChangedAt = undefined;

      const mockUpdate = jest.fn().mockResolvedValue({ affected: 1 });
      const mockAuditSave = jest.fn().mockResolvedValue({});

      const mockTransaction = jest.fn(async (callback) => {
        const txManager = {
          getRepository: jest.fn((entity) => {
            if (entity === User) {
              return { update: mockUpdate } as any;
            }
            if (entity === AuditLog) {
              return { save: mockAuditSave } as any;
            }
            return {} as any;
          }),
        };
        return await callback(txManager);
      });

      mockUserRepo.manager.transaction = mockTransaction;

      const updatedUser = { ...baseUser, username: 'newuser_123', usernameChangedAt: new Date() } as any;
      mockUserRepo.findOne
        .mockResolvedValueOnce(baseUser) // initial fetch
        .mockResolvedValueOnce(null)     // availability check (not taken)
        .mockResolvedValueOnce(updatedUser); // final fetch

      const result = await userService.changeUsername(userId, 'NewUser_123', '127.0.0.1', 'test-agent');

      expect(result.success).toBe(true);
      expect(result.user?.username).toBe('newuser_123');

      expect(mockUserRepo.manager.transaction).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledWith(
        { id: userId },
        expect.objectContaining({
          username: 'newuser_123',
          usernameChangedAt: expect.any(Date),
        })
      );
      expect(mockAuditSave).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          action: 'username_change',
          oldValue: oldUsername,
          newValue: 'newuser_123',
          ipAddress: '127.0.0.1',
          userAgent: 'test-agent',
        })
      );
    });
  });

  describe('getUserByUsername', () => {
    it('should return user by username', async () => {
      const user = { id: '1', username: 'johndoe' } as User;
      mockUserRepo.findOne.mockResolvedValue(user);
      const result = await userService.getUserByUsername('johndoe');
      expect(result).toBe(user);
      expect(mockUserRepo.findOne).toHaveBeenCalledWith({
        where: { username: 'johndoe' },
      });
    });

    it('should return null if user not found', async () => {
      mockUserRepo.findOne.mockResolvedValue(null);
      const result = await userService.getUserByUsername('nonexistent');
      expect(result).toBeNull();
    });
  });
});
