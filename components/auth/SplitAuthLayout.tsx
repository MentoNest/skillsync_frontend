'use client';

import MentorCard from './MentorCard';

export default function SplitAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white">
        {children}
      </div>

      {/* Right side - Purple gradient and mentor card */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center p-8">
        <MentorCard />
      </div>
    </div>
  );
}
