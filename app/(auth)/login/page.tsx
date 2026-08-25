"use client";

import LoginForm from "@/components/auth/LoginForm";

/**
 * LoginPage
 *
 * Renders the production-ready LoginForm component which handles:
 *  1. Form validation with Zod and React Hook Form
 *  2. API integration with the backend auth service
 *  3. Session management via the production AuthContext
 *  4. Automatic redirection to dashboard on successful login
 */
export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto py-12">
      <LoginForm />
    </div>
  );
}