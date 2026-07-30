import { z } from "zod";

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .max(80, "Name must be 80 characters or fewer"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be 128 characters or fewer"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword && password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ---------------------------------------------------------------------------
// Password strength helpers (shared with PasswordStrengthMeter component)
// ---------------------------------------------------------------------------

export type StrengthLevel = "empty" | "weak" | "fair" | "good" | "strong";

export interface StrengthResult {
  score: number; // 0–4
  level: StrengthLevel;
  label: string;
  checks: {
    length: boolean;
    number: boolean;
    lowercase: boolean;
    uppercaseOrSymbol: boolean;
  };
}

export function getPasswordStrength(password: string): StrengthResult {
  if (!password) {
    return {
      score: 0,
      level: "empty",
      label: "",
      checks: {
        length: false,
        number: false,
        lowercase: false,
        uppercaseOrSymbol: false,
      },
    };
  }

  const checks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    lowercase: /[a-z]/.test(password),
    uppercaseOrSymbol: /[A-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(
      password,
    ),
  };

  const score = Object.values(checks).filter(Boolean).length as
    0 | 1 | 2 | 3 | 4;

  const levelMap: Record<number, StrengthLevel> = {
    0: "weak",
    1: "weak",
    2: "fair",
    3: "good",
    4: "strong",
  };
  const labelMap: Record<StrengthLevel, string> = {
    empty: "",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
  };

  const level = levelMap[score];
  return { score, level, label: labelMap[level], checks };
}
