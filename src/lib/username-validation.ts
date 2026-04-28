/**
 * Username validation utility
 * Rules:
 * - Alphanumeric + underscore + dash only
 * - Length: 3-30 characters
 * - No consecutive special characters (__, --, _-, -_)
 */

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
export const USERNAME_COOLDOWN_DAYS = 30;

/**
 * Validates username format
 * @param username - The username to validate
 * @returns { valid: boolean, error?: string } validation result
 */
export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username || username.trim().length === 0) {
    return { valid: false, error: 'Username is required' };
  }

  const trimmed = username.trim();

  if (trimmed.length < USERNAME_MIN_LENGTH) {
    return {
      valid: false,
      error: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
    };
  }

  if (trimmed.length > USERNAME_MAX_LENGTH) {
    return {
      valid: false,
      error: `Username must be no more than ${USERNAME_MAX_LENGTH} characters`,
    };
  }

  // Only allow alphanumeric, underscore, and dash
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  if (!validPattern.test(trimmed)) {
    return {
      valid: false,
      error:
        'Username can only contain letters, numbers, underscores, and dashes',
    };
  }

  // No consecutive special characters
  const consecutiveSpecial = /[_\-]{2,}|[_\-]{1,2}[_\-]{1,2}/;
  if (consecutiveSpecial.test(trimmed)) {
    return {
      valid: false,
      error: 'Username cannot contain consecutive special characters',
    };
  }

  // Alternative simpler check: check for __, --, _-, -_
  if (trimmed.includes('__') || trimmed.includes('--') || trimmed.includes('_-') || trimmed.includes('-_')) {
    return {
      valid: false,
      error: 'Username cannot contain consecutive special characters',
    };
  }

  return { valid: true };
}

/**
 * Checks if a username is available (not taken by another user)
 * @param username - The username to check
 * @param excludeUserId - Optional user ID to exclude (for username changes)
 * @returns { available: boolean, reason?: string }
 */
export async function isUsernameAvailable(
  username: string,
  excludeUserId?: string
): Promise<{ available: boolean; reason?: string }> {
  // This function will be used by the API endpoint.
  // The actual database query will be done in the route handler.
  // This utility just provides the interface definition.
  // We'll call the service from the route.
  return { available: true };
}

/**
 * Checks if a user can change their username based on cooldown
 * @param lastChangedAt - Date of last username change (null if never changed)
 * @returns { canChange: boolean; reason?: string; remainingDays?: number }
 */
export function canChangeUsername(
  lastChangedAt: Date | null | undefined
): {
  canChange: boolean;
  reason?: string;
  remainingDays?: number;
} {
  if (!lastChangedAt) {
    return { canChange: true };
  }

  const cooldownMs = USERNAME_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  const now = new Date();
  const lastChange = new Date(lastChangedAt);
  const msSinceChange = now.getTime() - lastChange.getTime();

  if (msSinceChange < cooldownMs) {
    const remainingMs = cooldownMs - msSinceChange;
    const remainingDays = Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
    return {
      canChange: false,
      reason: `Username can only be changed once every ${USERNAME_COOLDOWN_DAYS} days`,
      remainingDays,
    };
  }

  return { canChange: true };
}
