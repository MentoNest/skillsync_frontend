import { Repository } from 'typeorm';
import { AppDataSource } from '@/lib/database';
import { User } from '@/entities/User.entity';
import { AuditLog } from '@/entities/AuditLog.entity';
import { validateUsername, canChangeUsername } from '@/lib/username-validation';

export class UserService {
  private userRepository: Repository<User>;
  private auditLogRepository: Repository<AuditLog>;

  constructor(
    userRepository?: Repository<User>,
    auditLogRepository?: Repository<AuditLog>
  ) {
    this.userRepository = userRepository || AppDataSource.getRepository(User);
    this.auditLogRepository = auditLogRepository || AppDataSource.getRepository(AuditLog);
  }

  /**
   * Check if a username is available
   * @param username - The username to check (case-insensitive)
   * @param excludeUserId - Optional user ID to exclude (for username change)
   * @returns Promise<{ available: boolean; reason?: string }>
   */
  async checkUsernameAvailability(username: string, excludeUserId?: string): Promise<{ available: boolean; reason?: string }> {
    const normalizedUsername = username.trim().toLowerCase();
    const existingUser = await this.userRepository.findOne({
      where: { username: normalizedUsername },
    });

    if (existingUser && existingUser.id !== excludeUserId) {
      return { available: false, reason: 'Username is already taken' };
    }

    return { available: true };
  }

  /**
   * Change a user's username
   * @param userId - ID of the user changing username
   * @param newUsername - The desired new username
   * @param ipAddress - Optional IP address for audit
   * @param userAgent - Optional user agent for audit
   * @returns Promise<{ success: boolean; user?: User; error?: string; remainingDays?: number }>
   */
  async changeUsername(
    userId: string,
    newUsername: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{
    success: boolean;
    user?: User;
    error?: string;
    remainingDays?: number;
  }> {
    // Validate username format
    const validation = validateUsername(newUsername);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const normalizedUsername = newUsername.trim().toLowerCase();

    // Get the user
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Check if the new username is different from current (if set)
    if (user.username === normalizedUsername) {
      return { success: false, error: 'New username is the same as current username' };
    }

    // Check availability
    const availability = await this.checkUsernameAvailability(normalizedUsername, userId);
    if (!availability.available) {
      return { success: false, error: availability.reason };
    }

    // Check cooldown
    const cooldownCheck = canChangeUsername(user.usernameChangedAt);
    if (!cooldownCheck.canChange) {
      return {
        success: false,
        error: cooldownCheck.reason,
        remainingDays: cooldownCheck.remainingDays,
      };
    }

    const oldUsername = user.username;

    // Perform update and audit in a transaction
    await this.userRepository.manager.transaction(async (transactionalEntityManager) => {
      const userRepo = transactionalEntityManager.getRepository(User);
      const auditRepo = transactionalEntityManager.getRepository(AuditLog);

      // Update user
      await userRepo.update(
        { id: userId },
        { username: normalizedUsername, usernameChangedAt: new Date() }
      );

      // Create audit log
      const auditLog = new AuditLog();
      auditLog.userId = userId;
      auditLog.action = 'username_change';
      auditLog.oldValue = oldUsername;
      auditLog.newValue = normalizedUsername;
      auditLog.ipAddress = ipAddress;
      auditLog.userAgent = userAgent;
      await auditRepo.save(auditLog);
    });

    // Return updated user
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!updatedUser) {
      // Should not happen after successful update, but handle defensively
      return { success: false, error: 'Failed to retrieve updated user' };
    }

    return { success: true, user: updatedUser };
  }

  /**
   * Get user by username
   * @param username - The username to find
   * @returns Promise<User | null>
   */
  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username: username.toLowerCase() },
    });
  }
}
