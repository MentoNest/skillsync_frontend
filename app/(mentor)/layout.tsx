import ProtectedRoute from '@/components/auth/ProtectedRoute';
import React from 'react';

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div>
        <h1>Mentor Layout</h1>
        {children}
      </div>
    </ProtectedRoute>
  );
}
