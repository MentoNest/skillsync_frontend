"use client";

import React from 'react';

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  errors?: LoginFormErrors;
  isValid?: boolean;
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isLoading = false,
  errors = {},
  isValid = true,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="mb-4">
        <label htmlFor="login-email" className="sr-only">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          disabled={isLoading}
          aria-invalid={Boolean(errors.email)}
          className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="login-password" className="sr-only">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          disabled={isLoading}
          aria-invalid={Boolean(errors.password)}
          className={`w-full px-4 py-3 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading || !isValid}
        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
