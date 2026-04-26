'use client';

import ResourceCategoryCard from './ResourceCategoryCard';

interface QuickAccessItem {
  title: string;
  link: string;
  icon: string;
  description: string;
}

const quickAccessItems: QuickAccessItem[] = [
  { title: 'Learning Resources', link: '/learning-resources', icon: '📚', description: 'Browse curated materials' },
  { title: 'Find a Mentor', link: '/mentors', icon: '🎯', description: 'Connect with an expert' },
  { title: 'My Progress', link: '/dashboard/progress', icon: '📈', description: 'Track your milestones' },
  { title: 'Community', link: '/community', icon: '💬', description: 'Join the conversation' },
];

export default function QuickAccessSection() {
  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickAccessItems.map((item) => (
            <ResourceCategoryCard
              key={item.link}
              icon={item.icon}
              title={item.title}
              description={item.description}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
