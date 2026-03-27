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
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // TODO: Implement actual registration logic
    console.log('Registration attempt:', { fullName, email, password });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Register with ${provider}`);
    // TODO: Implement social registration logic
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
            Create Account
          </h1>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Full Name Input */}
          <div className="mb-4">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent disabled:bg-gray-100 
                         disabled:cursor-not-allowed transition-all duration-200"
              required
            />
          </div>

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
          <div className="mb-4">
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
              minLength={8}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 
                         focus:border-transparent disabled:bg-gray-100 
                         disabled:cursor-not-allowed transition-all duration-200"
              required
              minLength={8}
            />
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="mb-6">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                disabled={isLoading}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded 
                           focus:ring-purple-500 focus:ring-2 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading || !agreeToTerms}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 
                       text-white font-semibold py-3 rounded-lg 
                       hover:from-purple-600 hover:to-purple-700 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:ring-offset-2 disabled:opacity-50 
                       disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <Divider text="or sign up with" />

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

        {/* Login Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-purple-600 hover:text-purple-700 font-medium 
                       transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
