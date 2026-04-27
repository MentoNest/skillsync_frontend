'use client';

import Image from 'next/image';

interface MentorCard {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  specialties: string[];
}

const mentors: MentorCard[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Frontend Developer',
    description: 'Expert in React, Next.js, and modern web technologies with 8+ years of industry experience.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    specialties: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Data Science Lead',
    description: 'Machine learning engineer specializing in predictive analytics and AI-driven solutions.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    specialties: ['Python', 'Machine Learning', 'TensorFlow'],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX/UI Design Director',
    description: 'Award-winning designer focused on user-centered design and accessibility best practices.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    specialties: ['Figma', 'User Research', 'Design Systems'],
  },
  {
    id: '4',
    name: 'David Park',
    role: 'DevOps Architect',
    description: 'Cloud infrastructure expert with deep knowledge of AWS, Docker, and CI/CD pipelines.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    specialties: ['AWS', 'Docker', 'Kubernetes'],
  },
  {
    id: '5',
    name: 'Jessica Williams',
    role: 'Mobile Development Lead',
    description: 'Cross-platform mobile app developer specializing in React Native and Flutter ecosystems.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    specialties: ['React Native', 'Flutter', 'iOS/Android'],
  },
  {
    id: '6',
    name: 'Alex Thompson',
    role: 'Cybersecurity Specialist',
    description: 'Security consultant focused on penetration testing, threat analysis, and secure architecture.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    specialties: ['Security Audits', 'Ethical Hacking', 'Network Security'],
  },
];

export default function MentorDiscovery() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Mentors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with industry professionals who are passionate about sharing their knowledge and helping you achieve your goals.
          </p>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                {/* Avatar & Info */}
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100">
                    <Image
                      src={mentor.avatar}
                      alt={`${mentor.name}'s avatar`}
                      fill
                      sizes="64px"
                      className="object-cover"
                      priority={mentor.id === '1'}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {mentor.role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {mentor.description}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-medium transition-colors duration-200">
            View All Mentors
          </button>
        </div>
      </div>
    </section>
  );
}
