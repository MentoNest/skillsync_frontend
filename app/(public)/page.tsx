import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MentorCard from '@/components/MentorCard';
import FeaturedLearningTracks from '@/components/FeaturedLearningTracks';
import FeaturedArticles from '@/components/FeaturedArticles';
import ToolsAndTemplates from '@/components/ToolsAndTemplates';
import ResourceSearchBar from '@/components/ResourceSearchBar';
import TestimonialsSection from '@/components/TestimonialsSection';
import Image from 'next/image';

const mentors = [
  {
    mentorId: 'sarah-doe',
    name: 'Sarah Doe',
    title: 'Software Engineer @ Google',
    bio: 'Expert in React, Node.js, and cloud infrastructure.',
    avatarUrl: '/avatars/sarah.jpg',
    rating: 4.8,
    reviewCount: 124,
    pricePerSession: 85,
    skills: ['React', 'Node.js', 'Cloud'],
  },
  {
    mentorId: 'john-smith',
    name: 'John Smith',
    title: 'Product Manager @ Microsoft',
    bio: 'Specializes in product strategy and user-centric design.',
    avatarUrl: '/avatars/john.jpg',
    rating: 4.6,
    reviewCount: 98,
    pricePerSession: 75,
    skills: ['Product Strategy', 'UX', 'Agile'],
  },
  {
    mentorId: 'jane-roe',
    name: 'Jane Roe',
    title: 'UX Designer @ Apple',
    bio: 'Passionate about creating beautiful and intuitive user experiences.',
    avatarUrl: '/avatars/jane.jpg',
    rating: 4.9,
    reviewCount: 156,
    pricePerSession: 90,
    skills: ['UX Design', 'Figma', 'Prototyping'],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 transition-colors" aria-label="Hero Section">
        <div className="grid max-w-screen-xl px-4 py-12 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 items-center">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Find Your Perfect Mentor
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              SkillSync helps you connect with experienced professionals to
              guide you on your career path.
            </p>
            <Link href="/register" className="inline-flex">
              <Button>Get Started</Button>
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center animate-pulse">
              <span className="text-6xl font-bold text-cyan-600/40 dark:text-cyan-400/40">
                S²
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="block lg:hidden">
        <Link
          href="/mentors"
          className="block text-center mx-auto max-w-xs bg-cyan-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-cyan-700 transition-colors mb-6"
        >
          Browse Mentors
        </Link>
      </div>

      {/* Resource Search Section */}
      <section
        className="bg-slate-50 dark:bg-gray-800/40 border-y border-slate-100 dark:border-gray-800 transition-colors"
        aria-label="Resource Search"
      >
        <ResourceSearchBar />
      </section>

      {/* About SkillSync Section */}
      <section
        className="bg-white dark:bg-gray-900 transition-colors"
        aria-label="About SkillSync tools"
      >
        <div className="gap-8 items-center py-12 px-4 mx-auto max-w-screen-xl xl:gap-16 grid grid-cols-1 md:grid-cols-2 lg:px-6">
          <div className="w-full flex justify-center">
            <Image
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-auto max-w-md md:max-w-full rounded-2xl shadow-md border border-gray-100 dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
              alt="SkillSync web platform interface preview showing mentors list and schedule builder"
            />
            <Image
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-auto max-w-md md:max-w-full rounded-2xl shadow-md border border-gray-800 hidden dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
              alt="SkillSync dark mode platform interface preview showcasing career progress dashboard"
            />
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-start">
            <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Let&apos;s create more tools and ideas that bring us together.
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              SkillSync helps you connect with professional communities, find
              vetted mentors, and collaborate with peers who share your
              professional interests. Empower your career growth through custom
              roadmaps and expert coaching.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-cyan-900 transition-colors"
            >
              Get started
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Mentors Grid Section */}
      <section
        className="bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 transition-colors"
        aria-labelledby="mentors-heading"
      >
        <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-10 lg:mb-14">
            <h2
              id="mentors-heading"
              className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
            >
              Meet Our Mentors
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Our mentors are industry experts with a passion for sharing their
              knowledge and guiding you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.mentorId} {...mentor} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/mentors">
              <Button variant="secondary">View All Mentors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Landing Sections */}
      <FeaturedLearningTracks />
      <FeaturedArticles />
      <ToolsAndTemplates />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Bottom CTA / Sign Up Section */}
      <section
        className="bg-cyan-600 dark:bg-cyan-800 transition-colors"
        aria-label="CTA Sign Up"
      >
        <div className="py-16 px-4 mx-auto max-w-screen-xl sm:py-20 lg:px-6 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-white">
            Ready to elevate your career?
          </h2>
          <p className="mb-8 font-light text-cyan-100 md:text-lg max-w-xl mx-auto">
            Join SkillSync today and connect with mentors who can help you
            achieve your goals. Take control of your career journey.
          </p>
          <Link href="/register" className="inline-flex">
            <Button
              variant="secondary"
              className="bg-white text-cyan-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-xl transition"
            >
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
