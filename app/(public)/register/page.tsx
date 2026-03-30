"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import Divider from '@/components/auth/Divider';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      nextErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Registration attempt:', { fullName, email, password });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'fullName') {
      setFullName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
    } else if (field === 'confirmPassword') {
      setConfirmPassword(value);
    }

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const isFormValid =
    fullName.trim().length > 0 &&
    emailRegex.test(email) &&
    password.length >= 8 &&
    password === confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 py-8 md:py-0">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">SkillSync</h2>
          <h1 className="text-2xl font-semibold text-gray-900">Create Account</h1>
          <p className="text-gray-600 text-sm mt-1">
            Join our community of skilled mentors and learners
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => handleInputChange('fullName', event.target.value)}
              placeholder="John Doe"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => handleInputChange('email', event.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => handleInputChange('password', event.target.value)}
              placeholder="Min. 8 characters"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => handleInputChange('confirmPassword', event.target.value)}
              placeholder="Confirm your password"
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg text-sm font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200">
            Login
          </Link>
        </div>

        <Divider text="or sign up with" />

        <div className="space-y-2 mt-4">
          <SocialLoginButton
            provider="google"
            onClick={() => console.log('Register with google')}
            disabled={isLoading}
          />
          <SocialLoginButton
            provider="facebook"
            onClick={() => console.log('Register with facebook')}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
