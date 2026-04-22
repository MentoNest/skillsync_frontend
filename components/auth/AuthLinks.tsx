'use client';

import React from 'react';
import Link from 'next/link';

interface AuthLinksProps {
  onForgotPassword?: () => void;
}

export default function AuthLinks({ onForgotPassword }: AuthLinksProps) {
  return (
    <div className="flex justify-between text-sm mt-3">
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-purple-600 hover:text-purple-700 font-medium 
                   transition-colors duration-200 focus:outline-none 
                   focus:underline"
      >
        Forgot Password?
      </button>
      <Link
        href="/register"
        className="text-purple-600 hover:text-purple-700 font-medium 
                   transition-colors duration-200 focus:outline-none 
                   focus:underline"
      >
        Register
      </Link>
    </div>
  );
}
