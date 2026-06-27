'use client';

import React, { useState } from 'react';
import MentorCard from '@/components/MentorCard';
import MentorSearchBar from '@/components/MentorSearchBar';
import { Button } from '@/components/ui/button';

interface Mentor {
  mentorId: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  rating: number;
  reviewCount?: number;
  pricePerSession: number;
  skills: string[];
  availability?: 'available' | 'busy' | 'fully-booked';
}

const mentors: Mentor[] = [
  {
    mentorId: 'sarah-doe',
    name: 'Sarah Doe',
    title: 'Software Engineer @ Google',
    bio: 'Expert in React, Node.js, and cloud infrastructure with over 10 years of experience building scalable applications.',
    avatarUrl: '/avatars/sarah.jpg',
    rating: 4.8,
    reviewCount: 124,
    pricePerSession: 85,
    skills: ['React', 'Node.js', 'Cloud', 'System Design'],
  },
  {
    mentorId: 'john-smith',
    name: 'John Smith',
    title: 'Product Manager @ Microsoft',
    bio: 'Specializes in product strategy, user-centric design, and agile methodologies. Led 3 major product launches.',
    avatarUrl: '/avatars/john.jpg',
    rating: 4.6,
    reviewCount: 98,
    pricePerSession: 75,
    skills: ['Product Strategy', 'UX', 'Agile', 'Leadership'],
  },
  {
    mentorId: 'jane-roe',
    name: 'Jane Roe',
    title: 'UX Designer @ Apple',
    bio: 'Passionate about creating beautiful and intuitive user experiences. Expertise in design systems and accessibility.',
    avatarUrl: '/avatars/jane.jpg',
    rating: 4.9,
    reviewCount: 156,
    pricePerSession: 90,
    skills: ['UX Design', 'Design Systems', 'Figma', 'Prototyping'],
  },
  {
    mentorId: 'mike-chen',
    name: 'Mike Chen',
    title: 'Engineering Lead @ Meta',
    bio: 'Full-stack engineer specializing in scalable architectures and team leadership. Built systems serving 100M+ users.',
    rating: 4.7,
    reviewCount: 112,
    pricePerSession: 95,
    skills: ['Full-Stack', 'Architecture', 'Python', 'React'],
  },
  {
    mentorId: 'emma-wilson',
    name: 'Emma Wilson',
    title: 'Data Scientist @ Netflix',
    bio: 'Data science expert with deep experience in ML, analytics, and recommendation systems.',
    rating: 4.5,
    reviewCount: 87,
    pricePerSession: 80,
    skills: ['Machine Learning', 'Python', 'SQL', 'Statistics'],
  },
  {
    mentorId: 'james-brown',
    name: 'James Brown',
    title: 'CTO @ TechStartup',
    bio: 'Serial entrepreneur and CTO who has built and scaled multiple products from zero to millions of users.',
    rating: 4.9,
    reviewCount: 203,
    pricePerSession: 120,
    skills: ['Startups', 'Leadership', 'Strategy', 'Fundraising'],
  },
  {
    mentorId: 'priya-patel',
    name: 'Priya Patel',
    title: 'DevOps Lead @ Amazon',
    bio: 'Cloud infrastructure expert specializing in CI/CD, Kubernetes, and site reliability engineering.',
    rating: 4.7,
    reviewCount: 76,
    pricePerSession: 100,
    skills: ['DevOps', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    mentorId: 'carlos-garcia',
    name: 'Carlos Garcia',
    title: 'AI Research Scientist @ DeepMind',
    bio: 'Published researcher in deep learning and NLP, passionate about making AI accessible to everyone.',
    rating: 4.8,
    reviewCount: 64,
    pricePerSession: 110,
    skills: ['Deep Learning', 'NLP', 'Python', 'Research'],
  },
];

const PAGE_SIZE = 6;

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredMentors = mentors.filter((mentor) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(q) ||
      mentor.title.toLowerCase().includes(q) ||
      mentor.bio.toLowerCase().includes(q) ||
      mentor.skills.some((skill) => skill.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.ceil(filteredMentors.length / PAGE_SIZE);
  const displayedMentors = filteredMentors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors">
      {/* Hero Section */}
      <section
        className="bg-gradient-to-r from-cyan-700 to-blue-800 py-16 px-4 text-center sm:py-24 lg:px-6 shadow-md"
        aria-labelledby="mentors-hero-heading"
      >
        <div className="max-w-screen-xl mx-auto">
          <h1
            id="mentors-hero-heading"
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
          >
            Discover Mentors
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg font-normal text-cyan-100/90 leading-relaxed">
            Find experienced professionals who can guide you on your career
            journey. Browse our curated network of mentors and book a session
            today.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section
        className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors"
        aria-labelledby="mentors-search-heading"
      >
        <h2 id="mentors-search-heading" className="sr-only">
          Search Mentors
        </h2>
        <MentorSearchBar
          onSearch={(q) => {
            setSearchQuery(q);
            setPage(1);
          }}
        />
      </section>

      {/* Mentors Grid Section */}
      <section
        className="max-w-screen-xl px-4 py-12 mx-auto lg:py-16"
        aria-labelledby="mentors-grid-heading"
      >
        <div className="mb-8">
          <h2
            id="mentors-grid-heading"
            className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            {filteredMentors.length > 0
              ? `${filteredMentors.length} mentor${filteredMentors.length !== 1 ? 's' : ''} available`
              : 'No mentors found'}
          </h2>
          {searchQuery && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {filteredMentors.length === 0
                ? `No results matching &ldquo;${searchQuery}&rdquo;. Try a different search term.`
                : `Showing results for &ldquo;${searchQuery}&rdquo;`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedMentors.map((mentor) => (
            <MentorCard key={mentor.mentorId} {...mentor} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-2">
            <Button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400 px-3">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
