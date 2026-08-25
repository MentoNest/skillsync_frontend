import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React from "react";

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div>
        <h1>Mentee Layout</h1>
        {children}
      </div>
    </ProtectedRoute>
  );
}
