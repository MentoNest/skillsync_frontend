import Link from "next/link";

import PasswordField from "@/components/auth/PasswordField";

export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
      <p className="mt-2 text-sm text-slate-600">Access your SkillSync account.</p>

      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="login-email" className="block text-sm font-medium text-slate-800">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <PasswordField
          id="login-password"
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Need an account?{" "}
        <Link href="/register" className="font-medium text-slate-900 underline underline-offset-2">
          Register
        </Link>
      </p>
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import SocialLoginButton from '@/components/auth/SocialLoginButton';
import Divider from '@/components/auth/Divider';
import AuthLinks from '@/components/auth/AuthLinks';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual login logic
    console.log('Login attempt:', { email, password });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // TODO: Navigate to forgot password page or show modal
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="text-purple-600 font-bold text-2xl mb-2">
            SkillSync
          </h2>
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome Back
          </h1>
        </div>

        {/* Login Form */}
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Auth Links */}
        <AuthLinks onForgotPassword={handleForgotPassword} />

        {/* Divider */}
        <Divider text="or sign in with" />

        {/* Social Login Buttons */}
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

        {/* Register Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-purple-600 hover:text-purple-700 font-medium 
                       transition-colors duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
