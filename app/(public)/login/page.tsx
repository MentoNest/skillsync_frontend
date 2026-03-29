"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import Divider from '@/components/auth/Divider';
import AuthLinks from '@/components/auth/AuthLinks';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateLogin = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateLogin()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Login attempt:', { email, password });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.password;
        return next;
      });
    }
  };

  const isFormValid = emailRegex.test(email) && password.trim().length > 0;

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-purple-600 font-bold text-2xl mb-2">SkillSync</h2>
          <h1 className="text-xl font-semibold text-gray-900">Welcome Back</h1>
        </div>

        <LoginForm
          email={email}
          setEmail={handleEmailChange}
          password={password}
          setPassword={handlePasswordChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          errors={errors}
          isValid={isFormValid}
        />

        <AuthLinks onForgotPassword={handleForgotPassword} />

        <Divider text="or sign in with" />

        <div className="space-y-2">
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

        <div className="text-center mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
          >
            Sign up
          </Link>
        </div>
'use client';

import Link from "next/link";
import SplitScreenAuthLayout from "@/components/auth/SplitScreenAuthLayout";
import PasswordField from "@/components/auth/PasswordField";

export default function LoginPage() {
  return (
    <SplitScreenAuthLayout
      title="Welcome Back"
      description="Access your SkillSync account to continue your learning journey."
    >
      <form className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="login-email" className="block text-sm font-medium text-slate-800">
            Email Address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
        </div>

        {/* Password Input */}
        <PasswordField
          id="login-password"
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-purple-700 hover:to-indigo-700"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 mb-6 flex items-center">
        <div className="flex-1 border-t border-slate-300"></div>
        <span className="mx-4 text-sm text-slate-600">Or</span>
        <div className="flex-1 border-t border-slate-300"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-400"
        >
          Continue with Google
        </button>
        <button
          type="button"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-400"
        >
          Continue with GitHub
        </button>
      </div>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link href="/register" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
          Create one
        </Link>
      </p>
    </SplitScreenAuthLayout>
  );
}
