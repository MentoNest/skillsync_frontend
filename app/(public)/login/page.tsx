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
