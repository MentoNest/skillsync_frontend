'use client';

import Link from 'next/link';

interface QuickAccessItem {
  label: string;
  href: string;
  icon: string;
  description: string;
}

const quickAccessItems: QuickAccessItem[] = [
  { label: 'Learning Resources', href: '/learning-resources', icon: '📚', description: 'Browse curated materials' },
  { label: 'Find a Mentor', href: '/mentors', icon: '🎯', description: 'Connect with an expert' },
  { label: 'My Progress', href: '/dashboard/progress', icon: '📈', description: 'Track your milestones' },
  { label: 'Community', href: '/community', icon: '💬', description: 'Join the conversation' },
];

export default function QuickAccessSection() {
  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickAccessItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-center bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group"
            >
              <span className="text-3xl mb-3">{item.icon}</span>
              <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                {item.label}
              </span>
              <span className="text-xs text-gray-400 mt-1">{item.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
