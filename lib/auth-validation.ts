/**
 * Client-side validation for the authentication forms (#1172).
 *
 * The rules live in one place so login, registration, and the shared form
 * components cannot disagree about what a valid email or password is. Every
 * validator returns a human-readable message or `null`, and the `validate*Form`
 * helpers return only the fields that actually failed, so a caller can render
 * an inline error under the offending input without pre-filling empty ones.
 *
 * This is deliberately dependency-free: it must run before the network request
 * and inside a client component, and it needs no schema library to express a
 * handful of rules.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_PASSWORD_LENGTH = 8;

export const AUTH_VALIDATION = {
  minPasswordLength: MIN_PASSWORD_LENGTH,
} as const;

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;
export type RegisterFormErrors = Partial<
  Record<keyof RegisterFormValues, string>
>;

/** Returns an error message for `value`, or `null` when it is valid. */
export function validateEmail(value: string): string | null {
  const email = value.trim();

  if (!email) {
    return "Email is required";
  }
  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address";
  }
  return null;
}

/** Returns an error message for `value`, or `null` when it is valid. */
export function validatePassword(value: string): string | null {
  if (!value) {
    return "Password is required";
  }
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return null;
}

/** Returns an error message for `value`, or `null` when it is valid. */
export function validateFullName(value: string): string | null {
  if (!value.trim()) {
    return "Full name is required";
  }
  return null;
}

/**
 * Returns an error message for the confirmation field, or `null` when it
 * matches `password`. The password is passed in rather than read from state so
 * the caller can validate both fields from one submit.
 */
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (!confirmPassword) {
    return "Confirm your password";
  }
  if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return null;
}

/** Validates a login form, returning only the fields that failed. */
export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
}

/** Validates a registration form, returning only the fields that failed. */
export function validateRegisterForm(
  values: RegisterFormValues
): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  const fullNameError = validateFullName(values.fullName);
  if (fullNameError) errors.fullName = fullNameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(
    values.password,
    values.confirmPassword
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
}

/** True when a field-error map has no entries. */
export function hasFormErrors(
  errors: LoginFormErrors | RegisterFormErrors
): boolean {
  return Object.keys(errors).length > 0;
}
