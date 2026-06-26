import React from 'react';

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Mentee Layout</h1>
      {children}
    </div>
  );
}