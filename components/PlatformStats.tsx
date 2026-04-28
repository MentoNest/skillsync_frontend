'use client';

interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

const stats: StatItem[] = [
  {
    id: '1',
    value: '5,000+',
    label: 'Active Mentees',
    icon: '👥',
  },
  {
    id: '2',
    value: '1,200+',
    label: 'Expert Mentors',
    icon: '🎓',
  },
  {
    id: '3',
    value: '50+',
    label: 'Learning Paths',
    icon: '📚',
  },
  {
    id: '4',
    value: '95%',
    label: 'Success Rate',
    icon: '⭐',
  },
];

export default function PlatformStats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Platform Statistics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of learners and mentors achieving their goals together
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{stat.icon}</div>
              
              {/* Value */}
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-gray-700 font-medium text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
