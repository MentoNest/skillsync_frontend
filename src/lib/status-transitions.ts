import { UserStatus } from '@/types/enums';

export const ALLOWED_TRANSITIONS: Record<UserStatus, UserStatus[]> = {
  [UserStatus.ACTIVE]: [UserStatus.SUSPENDED, UserStatus.DELETED],
  [UserStatus.PENDING_VERIFICATION]: [UserStatus.ACTIVE, UserStatus.DELETED],
  [UserStatus.SUSPENDED]: [UserStatus.ACTIVE, UserStatus.DELETED],
  [UserStatus.DELETED]: [], // No transitions allowed from deleted
};

export function canTransition(
  from: UserStatus,
  to: UserStatus
): boolean {
  const allowed = ALLOWED_TRANSITIONS[from];
  return allowed.includes(to);
}

export function validateStatusTransition(
  currentStatus: UserStatus,
  newStatus: UserStatus
): { valid: boolean; error?: string } {
  if (currentStatus === newStatus) {
    return { valid: true };
  }

  if (!canTransition(currentStatus, newStatus)) {
    return {
      valid: false,
      error: `Cannot transition user from '${currentStatus}' to '${newStatus}'.`,
    };
  }

  return { valid: true };
}
