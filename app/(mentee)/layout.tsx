import React from 'react';
import Footer from '@/components/navigation/Footer';

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <h1>Mentee Layout</h1>
        {children}
      </div>
      <Footer />
    </div>
  );
}