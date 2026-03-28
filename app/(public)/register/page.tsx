import Link from "next/link";

import PasswordField from "@/components/auth/PasswordField";

export default function RegisterPage() {
  return (
    <section className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Register</h1>
      <p className="mt-2 text-sm text-slate-600">Create your SkillSync account.</p>

      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="register-name" className="block text-sm font-medium text-slate-800">
            Full Name
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="register-email" className="block text-sm font-medium text-slate-800">
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <PasswordField
          id="register-password"
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          required
        />

        <PasswordField
          id="register-confirm-password"
          label="Confirm Password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your password"
          required
        />

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-slate-900 underline underline-offset-2">
          Login
        </Link>
      </p>
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import Divider from '@/components/auth/Divider';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual registration logic
      console.log('Registration attempt:', { fullName, email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form on success
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Register with ${provider}`);
    // TODO: Implement social registration logic
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'fullName') setFullName(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 py-8 md:py-0">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">SkillSync</h2>
          <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
          <p className="text-gray-600 text-sm mt-1">
            Join our community of skilled mentors and learners
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="John Doe"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent
                           disabled:bg-gray-100 disabled:cursor-not-allowed
                           ${
                             errors.fullName
                               ? 'border-red-500 bg-red-50'
                               : 'border-gray-300 hover:border-gray-400'
                           }`}
              required
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent
                           disabled:bg-gray-100 disabled:cursor-not-allowed
                           ${
                             errors.email
                               ? 'border-red-500 bg-red-50'
                               : 'border-gray-300 hover:border-gray-400'
                           }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Min. 8 characters"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent
                           disabled:bg-gray-100 disabled:cursor-not-allowed
                           ${
                             errors.password
                               ? 'border-red-500 bg-red-50'
                               : 'border-gray-300 hover:border-gray-400'
                           }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                handleInputChange('confirmPassword', e.target.value)
              }
              placeholder="Confirm your password"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal
                           transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent
                           disabled:bg-gray-100 disabled:cursor-not-allowed
                           ${
                             errors.confirmPassword
                               ? 'border-red-500 bg-red-50'
                               : 'border-gray-300 hover:border-gray-400'
                           }`}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 
                       text-white font-semibold py-3 rounded-lg mt-6
                       hover:from-purple-600 hover:to-purple-700 
                       active:from-purple-700 active:to-purple-800
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:ring-offset-2 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       transition-all duration-200"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <Divider text="or sign up with" />

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <SocialLoginButton
            provider="google"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          />
          <SocialLoginButton
            provider="facebook"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
          />
        </div>

        {/* Login Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-purple-600 hover:text-purple-700 font-semibold 
                       transition-colors duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                       rounded px-1"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
