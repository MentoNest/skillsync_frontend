/** Client-side validation for login and registration forms (#1364). */
export type FieldErrors = Partial<Record<string, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkEmail(email: string, errors: FieldErrors) {
  if (!email.trim()) errors.email = "Email is required.";
  else if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
}

export function validateLogin(values: { email: string; password: string }): FieldErrors {
  const errors: FieldErrors = {};
  checkEmail(values.email, errors);
  if (!values.password) errors.password = "Password is required.";
  return errors;
}

export function validateRegister(values: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  checkEmail(values.email, errors);
  if (values.password.length < 8) errors.password = "Password must be at least 8 characters.";
  else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password))
    errors.password = "Password must include a letter and a number.";
  if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords do not match.";
  return errors;
}

export const isValid = (errors: FieldErrors) => Object.keys(errors).length === 0;
