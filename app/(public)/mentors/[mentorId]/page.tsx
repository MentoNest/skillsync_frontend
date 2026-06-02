'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Mock mentor data - in a real app, this would come from an API
const mentorsData = [
  {
    id: 1,
    name: 'Kwame Asante',
    role: 'Staff Engineer',
    company: 'Stripe',
    category: 'Engineering',
    initials: 'KA',
    accent: '#3b82f6',
    bg: '#0f1f3d',
    image: '/tony-adebanjo.jpg',
    available: true,
    rating: 4.95,
    rate: 180,
    sessions: 204,
    description:
      'Helps engineers level up to Staff and beyond. Specialises in distributed systems, technical leadership, and promo packets.',
    tags: ['System Design', 'Leadership', 'Go'],
    bio: 'With over 10 years of experience at leading tech companies, Kwame specializes in helping engineers transition to senior and staff-level roles. His expertise spans distributed systems, technical leadership, and navigating promotion packets.',
    experience: [
      'Staff Engineer at Stripe (3 years)',
      'Senior Engineer at Google (4 years)',
      'Software Engineer at Uber (3 years)',
    ],
  },
  {
    id: 2,
    name: 'Priya Menon',
    role: 'Head of Product Design',
    company: 'Figma',
    category: 'Design',
    initials: 'PM',
    accent: '#a855f7',
    bg: '#1e0f3d',
    image: '/Image (Sarah Johnson).svg',
    available: true,
    rating: 4.98,
    rate: 145,
    sessions: 187,
    description:
      'Portfolio reviews, design system strategy, and breaking into senior IC or management tracks at top-tier product companies.',
    tags: ['Figma', 'Design Systems', 'Portfolio'],
    bio: 'Priya has led design at world-class companies and helped hundreds of designers grow their careers. She excels at portfolio reviews, design system strategy, and career guidance.',
    experience: [
      'Head of Product Design at Figma (2 years)',
      'Design Lead at Adobe (4 years)',
      'Senior Designer at Airbnb (3 years)',
    ],
  },
  {
    id: 3,
    name: 'Tomás Reyes',
    role: 'Senior PM',
    company: 'Notion',
    category: 'Product',
    initials: 'TR',
    accent: '#10b981',
    bg: '#0a2318',
    image: '/Image (Marcus Williams).svg',
    available: false,
    rating: 4.91,
    rate: 160,
    sessions: 139,
    description:
      'From APM to PM to Group PM — Tomás has made every jump and guides others through the same transitions with precision.',
    tags: ['Roadmapping', 'Stakeholders', 'APM'],
    bio: 'Tomás has successfully navigated every step of the PM career ladder and now helps others do the same. His guidance on APM hiring, PM transitions, and group PM dynamics is invaluable.',
    experience: [
      'Senior PM at Notion (2 years)',
      'PM at Stripe (3 years)',
      'APM at Google (2 years)',
    ],
  },
  {
    id: 4,
    name: 'Aisha Nwosu',
    role: 'Data Science Lead',
    company: 'Spotify',
    category: 'Data',
    initials: 'AN',
    accent: '#f59e0b',
    bg: '#2a1800',
    image: '/Image (Cole Hathans).svg',
    available: true,
    rating: 4.93,
    rate: 155,
    sessions: 256,
    description:
      'ML pipelines, A/B testing at scale, and transitioning from academia to industry. Obsessed with making data teams actually functional.',
    tags: ['Python', 'ML', 'Analytics'],
    bio: 'Aisha brings both academic rigor and industry pragmatism to her mentoring. She specializes in helping data scientists transition to industry and building high-performing data teams.',
    experience: [
      'Data Science Lead at Spotify (3 years)',
      'Data Scientist at Netflix (3 years)',
      'Researcher at MIT (2 years)',
    ],
  },
  {
    id: 5,
    name: 'Leon Fischer',
    role: 'Founding Engineer',
    company: '3× YC Startups',
    category: 'Engineering',
    initials: 'LF',
    accent: '#ef4444',
    bg: '#2a0a0a',
    image: '/tony-adebanjo.jpg',
    available: true,
    rating: 4.89,
    rate: 135,
    sessions: 98,
    description:
      'Zero to one builder. Helps early-career devs ship fast, make technical decisions under uncertainty, and navigate startup chaos.',
    tags: ['React', 'Node', 'Startup'],
    bio: 'Leon has founded and scaled multiple successful startups. He excels at helping engineers move fast, make technical decisions in uncertain environments, and thrive in startup culture.',
    experience: [
      'Founding Engineer at 3 YC Startups',
      'Senior Engineer at Coinbase (2 years)',
      'Software Engineer at Twilio (3 years)',
    ],
  },
  {
    id: 6,
    name: 'Sara Lindqvist',
    role: 'VP of Growth',
    company: 'Duolingo',
    category: 'Business',
    initials: 'SL',
    accent: '#06b6d4',
    bg: '#011f26',
    image: '/Image (Sarah Johnson).svg',
    available: false,
    rating: 4.96,
    rate: 170,
    sessions: 321,
    description:
      'Growth loops, retention mechanics, and go-to-market for consumer apps. Former founder. Brutally practical and candid.',
    tags: ['Growth', 'GTM', 'Retention'],
    bio: 'Sara has built growth functions at multiple billion-dollar companies and founded her own startup. She provides brutally honest, practical guidance on scaling products and companies.',
    experience: [
      'VP of Growth at Duolingo (3 years)',
      'VP of Growth at Lyft (2 years)',
      'Founder of Growth startup (2 years)',
    ],
  },
];

export default function MentorProfilePage() {
  const params = useParams();
  const mentorId = parseInt(params.mentorId as string);
  const mentor = mentorsData.find(m => m.id === mentorId);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-[#f7f5f2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#141210] mb-4">Mentor not found</h1>
            <p className="text-[#6b6860] mb-6">The mentor profile you're looking for doesn't exist.</p>
            <Link href="/mentors" className="text-[#3b82f6] hover:underline font-semibold">
              Back to mentors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/mentors" className="text-[#3b82f6] hover:underline font-semibold text-sm">
          ← Back to mentors
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] overflow-hidden">
          {/* Header section */}
          <div className="p-6 sm:p-10 border-b border-[rgba(20,18,16,0.07)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className="w-20 h-20 rounded-[16px] flex-shrink-0 flex items-center justify-center text-2xl font-bold relative overflow-hidden"
                style={{ background: mentor.bg, color: mentor.accent, fontFamily: "'Syne', sans-serif" }}
              >
                {mentor.image ? (
                  <Image
                    src={mentor.image}
                    alt={`${mentor.name} profile`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{mentor.initials}</span>
                )}
                <span
                  className={`absolute bottom-[-2px] right-[-2px] w-4 h-4 rounded-full border-2 border-white ${
                    mentor.available ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1
                  className="text-[clamp(28px,4vw,36px)] font-extrabold text-[#141210] leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {mentor.name}
                </h1>
                <p className="text-[15px] text-[#6b6860] mt-1">{mentor.role}</p>
                <p className="text-[14px] font-semibold mt-1" style={{ color: mentor.accent }}>
                  {mentor.company}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-1 bg-[#f7f5f2] rounded-lg px-3 py-1.5">
                    <span className="text-amber-400 text-sm">★</span>
                    <span className="text-sm font-semibold text-[#141210]">{mentor.rating}</span>
                  </div>
                  <p className="text-sm text-[#6b6860]">
                    <strong className="text-[#141210]">${mentor.rate}</strong>/hr
                  </p>
                  <p className="text-sm text-[#6b6860]">
                    <strong className="text-[#141210]">{mentor.sessions}</strong> sessions
                  </p>
                </div>
              </div>

              <button
                className={`text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 ${
                  mentor.available
                    ? 'bg-[#141210] text-[#f7f5f2] hover:bg-[#2d2a27]'
                    : 'bg-[#f0efed] text-[#94928d] cursor-default pointer-events-none'
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {mentor.available ? 'Book session' : 'Fully booked'}
              </button>
            </div>
          </div>

          {/* About section */}
          <div className="p-6 sm:p-10 border-b border-[rgba(20,18,16,0.07)]">
            <h2 className="text-lg font-bold text-[#141210] mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
              About
            </h2>
            <p className="text-[15px] leading-7 text-[#6b6860]">{mentor.bio}</p>
          </div>

          {/* Expertise section */}
          <div className="p-6 sm:p-10 border-b border-[rgba(20,18,16,0.07)]">
            <h2 className="text-lg font-bold text-[#141210] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {mentor.tags.map(tag => (
                <span
                  key={tag}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[#f7f5f2] text-[#6b6860] border border-[rgba(20,18,16,0.08)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Experience section */}
          <div className="p-6 sm:p-10">
            <h2 className="text-lg font-bold text-[#141210] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Experience
            </h2>
            <ul className="space-y-3">
              {mentor.experience.map((exp, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#3b82f6] font-bold mt-1">•</span>
                  <span className="text-[15px] text-[#6b6860]">{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Help section */}
        <div className="mt-8 mb-12 bg-white rounded-2xl border border-[rgba(20,18,16,0.07)] p-6 sm:p-10">
          <h2 className="text-lg font-bold text-[#141210] mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            How {mentor.name} can help
          </h2>
          <p className="text-[15px] leading-7 text-[#6b6860]">{mentor.description}</p>
        </div>
      </div>
    </div>
  );
}
