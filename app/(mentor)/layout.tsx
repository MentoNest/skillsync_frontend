import React from 'react';
import Footer from '@/components/navigation/Footer';

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <h1>Mentor Layout</h1>
        {children}
      </div>
      <Footer />
    </div>
  );
}