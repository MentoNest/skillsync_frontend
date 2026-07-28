import React from 'react';

export default function LearningResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="learning-resources-layout">
      {children}
    </div>
  );
}
