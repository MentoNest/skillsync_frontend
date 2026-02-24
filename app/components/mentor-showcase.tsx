'use client'

import MentorCard from './MentorCard'

const mentors = [
  {
    id: '1',
    name: 'Cole Hathane',
    role: 'Expert Career Counselor',
    description:
      'UX years building products, business strategy, GTM and leading Gen & Leadership Cadre',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 3,
    reviewCount: 12,
    price: '$25/month',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Tech Leadership Coach',
    description:
      '10+ years in software engineering and tech leadership, specializing in scaling teams & building great organizations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 45,
    price: '$50/month',
  },
  {
    id: '3',
    name: 'Marcus Williams',
    role: 'Business Strategy Consultant',
    description:
      '20+ years advising startups and established companies on growth strategies',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 67,
    price: '$75/month',
  },
  {
    id: '4',
    name: 'Emily Chen',
    role: 'Product Manager',
    description:
      '8+ years leading design teams at top tech companies',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 38,
    price: '$40/month',
  },
  {
    id: '5',
    name: 'David Martinez',
    role: 'Data Scientist',
    description:
      '12+ years in AI/ML and data analytics across multiple industries',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 52,
    price: '$55/month',
  },
  {
    id: '6',
    name: 'Kate Cornell',
    role: 'Marketing Specialist',
    description:
      'Expert in growth marketing, content strategy, and digital transformation',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 41,
    price: '$30/month',
  },
]

export function MentorShowcase() {
  return (
    <section className="w-full py-responsive px-4 md:px-6 lg:px-8">
      <div className="container-responsive max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-3">
            <span className="text-balance">
              Discover Some of Africa's Best Mentors
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced professionals who can guide your journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex justify-center">
              <MentorCard {...mentor} imageSrc={mentor.image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
