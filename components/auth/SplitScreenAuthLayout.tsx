'use client';

import React from 'react';
import AuthRightPanel from './AuthRightPanel';

interface SplitScreenAuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function SplitScreenAuthLayout({
  children,
  title,
  description,
}: SplitScreenAuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            <p className="text-slate-600">{description}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right Side - Purple Gradient Background with Featured Mentor & Testimonial */}
      <AuthRightPanel />
    </div>
  );
}
