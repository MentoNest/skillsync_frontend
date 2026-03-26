// components/landing/WhyChooseUsSection.tsx

'use client';

import { 
  Users, 
  Lightbulb, 
  Target, 
  Award,
  Clock,
  HeartHandshake
} from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Expert Mentors',
    description: 'Learn from industry professionals with proven track records in their fields.',
  },
  {
    icon: Lightbulb,
    title: 'Personalized Learning',
    description: 'Get customized guidance tailored to your unique goals and learning style.',
  },
  {
    icon: Target,
    title: 'Goal-Oriented Approach',
    description: 'Set clear objectives and achieve measurable results with structured mentorship.',
  },
  {
    icon: Award,
    title: 'Verified Quality',
    description: 'All mentors are thoroughly vetted to ensure top-notch expertise and teaching ability.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book sessions at times that work for you with our easy-to-use scheduling system.',
  },
  {
    icon: HeartHandshake,
    title: 'Supportive Community',
    description: 'Join a network of like-minded learners and mentors committed to your success.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-purple-600">SkillSync</span>?
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Discover the advantages that make our platform the perfect choice for your learning journey.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gradient-to-br from-white to-purple-50 border border-purple-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center mb-4">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
