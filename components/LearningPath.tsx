'use client';

import Link from 'next/link';

interface ResourceCard {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  icon: string;
}

const resources: ResourceCard[] = [
  {
    id: '1',
    title: 'Frontend Development Path',
    description: 'Master React, Next.js, and modern CSS frameworks with our comprehensive learning path.',
    category: 'Development',
    link: '/learning/frontend',
    icon: '💻',
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Learn Python, statistics, and machine learning basics for data-driven careers.',
    category: 'Data Science',
    link: '/learning/data-science',
    icon: '📊',
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Understand user research, wireframing, and prototyping with industry-standard tools.',
    category: 'Design',
    link: '/learning/ui-ux',
    icon: '🎨',
  },
  {
    id: '4',
    title: 'Cloud & DevOps Essentials',
    description: 'Explore AWS, Docker, CI/CD pipelines, and infrastructure as code concepts.',
    category: 'DevOps',
    link: '/learning/cloud-devops',
    icon: '☁️',
  },
  {
    id: '5',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile apps with React Native or Flutter from scratch.',
    category: 'Mobile',
    link: '/learning/mobile',
    icon: '📱',
  },
  {
    id: '6',
    title: 'Cybersecurity Basics',
    description: 'Learn security best practices, ethical hacking, and network protection fundamentals.',
    category: 'Security',
    link: '/learning/cybersecurity',
    icon: '🔒',
  },
];

export default function LearningPath() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Learning Paths & Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore curated learning paths designed to help you master in-demand skills with guidance from industry mentors.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{resource.icon}</span>
                  <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                    {resource.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {resource.description}
                </p>

                {/* CTA Link */}
                <Link
                  href={resource.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Start Learning
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/resources"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200"
          >
            View All Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
