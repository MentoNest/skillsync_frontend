'use client';

import React from 'react';
import Link from 'next/link';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isLoading = false,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      {/* Email Input */}
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 
                     focus:border-transparent disabled:bg-gray-100 
                     disabled:cursor-not-allowed transition-all duration-200"
          required
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 
                     focus:border-transparent disabled:bg-gray-100 
                     disabled:cursor-not-allowed transition-all duration-200"
          required
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 
                   text-white font-semibold py-3 rounded-lg 
                   hover:from-purple-600 hover:to-purple-700 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 
                   focus:ring-offset-2 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
