import React from 'react';

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Mentor Layout</h1>
      {children}
    </div>
  );
}