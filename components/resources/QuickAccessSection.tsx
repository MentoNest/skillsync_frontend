'use client';

import React from 'react';
import ResourceCategoryCard from '@/components/resources/ResourceCategoryCard';
import { DocumentIcon, PlayIcon, MapIcon, DownloadIcon } from '@/components/Icons';

const quickAccessItems = [
  {
    title: 'Resume Templates',
    description: 'Professional templates to craft standout resumes for tech roles.',
    link: '/resources/resume-templates',
    icon: <DocumentIcon />,
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides on career skills and technical topics.',
    link: '/resources/video-tutorials',
    icon: <PlayIcon />,
  },
  {
    title: 'Career Guides',
    description: 'In-depth guides for navigating career transitions and growth.',
    link: '/resources/career-guides',
    icon: <MapIcon />,
  },
  {
    title: 'Downloadable Tools',
    description: 'Worksheets, checklists, and planners to support your learning.',
    link: '/resources/downloadable-tools',
    icon: <DownloadIcon />,
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
