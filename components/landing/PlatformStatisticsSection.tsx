// components/landing/PlatformStatisticsSection.tsx

'use client';

import { Users, BookOpen, Award, MessageCircle } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Learners',
  },
  {
    icon: BookOpen,
    value: '5,000+',
    label: 'Expert Mentors',
  },
  {
    icon: Award,
    value: '15,000+',
    label: 'Courses Completed',
  },
  {
    icon: MessageCircle,
    value: '98%',
    label: 'Success Rate',
  },
];

export default function PlatformStatisticsSection() {
  return (
    <section className="w-full bg-gradient-to-r from-purple-600 to-purple-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Platform Statistics
          </h2>
          <p className="mt-4 text-purple-100 text-base md:text-lg max-w-2xl mx-auto">
            Join a growing community of learners and mentors achieving remarkable results together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <p className="text-purple-100 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
