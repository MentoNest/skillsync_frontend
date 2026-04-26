interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    id: '1',
    icon: '🎯',
    title: 'Expert Mentorship',
    description: 'Learn directly from industry professionals with years of real-world experience and proven track records.',
  },
  {
    id: '2',
    icon: '📚',
    title: 'Curated Learning Paths',
    description: 'Follow structured, personalized learning roadmaps designed to help you achieve your career goals efficiently.',
  },
  {
    id: '3',
    icon: '🤝',
    title: 'Meaningful Connections',
    description: 'Build lasting professional relationships with mentors and peers who share your passion for growth.',
  },
  {
    id: '4',
    icon: '⚡',
    title: 'Accelerated Growth',
    description: 'Fast-track your skill development with guided mentorship, avoiding common pitfalls and learning best practices.',
  },
  {
    id: '5',
    icon: '🌐',
    title: 'Flexible Learning',
    description: 'Access mentorship sessions and resources on your schedule, from anywhere in the world.',
  },
  {
    id: '6',
    icon: '💡',
    title: 'Practical Guidance',
    description: 'Get hands-on advice and real-world insights that you can immediately apply to your projects and career.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SkillSync?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes our platform the ideal choice for your professional development journey.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{benefit.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
