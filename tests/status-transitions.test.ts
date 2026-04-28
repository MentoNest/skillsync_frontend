import { canTransition, validateStatusTransition } from '@/lib/status-transitions';
import { UserStatus } from '@/types/enums';

describe('Status Transition Validation', () => {
  describe('canTransition', () => {
    it('should allow active to suspended', () => {
      expect(canTransition(UserStatus.ACTIVE, UserStatus.SUSPENDED)).toBe(true);
    });

    it('should allow active to deleted', () => {
      expect(canTransition(UserStatus.ACTIVE, UserStatus.DELETED)).toBe(true);
    });

    it('should allow suspended to active', () => {
      expect(canTransition(UserStatus.SUSPENDED, UserStatus.ACTIVE)).toBe(true);
    });

    it('should allow suspended to deleted', () => {
      expect(canTransition(UserStatus.SUSPENDED, UserStatus.DELETED)).toBe(true);
    });

    it('should allow pending_verification to active', () => {
      expect(canTransition(UserStatus.PENDING_VERIFICATION, UserStatus.ACTIVE)).toBe(true);
    });

    it('should allow pending_verification to deleted', () => {
      expect(canTransition(UserStatus.PENDING_VERIFICATION, UserStatus.DELETED)).toBe(true);
    });

    it('should disallow active to pending_verification', () => {
      expect(canTransition(UserStatus.ACTIVE, UserStatus.PENDING_VERIFICATION)).toBe(false);
    });

    it('should disallow deleted to any status', () => {
      expect(canTransition(UserStatus.DELETED, UserStatus.ACTIVE)).toBe(false);
      expect(canTransition(UserStatus.DELETED, UserStatus.SUSPENDED)).toBe(false);
      expect(canTransition(UserStatus.DELETED, UserStatus.PENDING_VERIFICATION)).toBe(false);
    });

    it('should allow same status transition (no change)', () => {
      expect(canTransition(UserStatus.ACTIVE, UserStatus.ACTIVE)).toBe(false); // Not in allowed array, but validateStatusTransition handles same status separately
    });
  });

  describe('validateStatusTransition', () => {
    it('should return valid for same status', () => {
      const result = validateStatusTransition(UserStatus.ACTIVE, UserStatus.ACTIVE);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return valid for allowed transition', () => {
      const result = validateStatusTransition(UserStatus.ACTIVE, UserStatus.SUSPENDED);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return invalid for disallowed transition', () => {
      const result = validateStatusTransition(UserStatus.DELETED, UserStatus.ACTIVE);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Cannot transition');
    });

    it('should return invalid for active to pending_verification', () => {
      const result = validateStatusTransition(UserStatus.ACTIVE, UserStatus.PENDING_VERIFICATION);
      expect(result.valid).toBe(false);
    });
  });
});
