import ProtectedRoute from '@/components/auth/ProtectedRoute';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div>
        <h1>Admin Layout</h1>
        {children}
      </div>
    </ProtectedRoute>
  );
}
