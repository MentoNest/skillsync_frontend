'use client';

import React from 'react';
import ResourceCategoryCard from '@/components/resources/ResourceCategoryCard';

const quickAccessItems = [
  {
    title: 'Resume Templates',
    description: 'Professional templates to craft standout resumes for tech roles.',
    link: '/resources/resume-templates',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides on career skills and technical topics.',
    link: '/resources/video-tutorials',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Career Guides',
    description: 'In-depth guides for navigating career transitions and growth.',
    link: '/resources/career-guides',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Downloadable Tools',
    description: 'Worksheets, checklists, and planners to support your learning.',
    link: '/resources/downloadable-tools',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

export default function QuickAccessSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-900">Quick Access</h2>
      <p className="mt-2 text-sm text-slate-600">Jump into popular resource categories</p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {quickAccessItems.map((item) => (
          <ResourceCategoryCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
