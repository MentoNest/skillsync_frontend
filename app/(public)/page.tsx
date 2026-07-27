import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/landing/HeroSection';
import WhyChooseUsSection from '@/components/landing/WhyChooseUsSection';
import PlatformStatisticsSection from '@/components/landing/PlatformStatisticsSection';
import LearningPathResourcesSection from '@/components/landing/LearningPathResourcesSection';
import MentorDiscoverySection from '@/components/landing/MentorDiscoverySection';
import FeaturedMentorHighlight from '@/components/landing/FeaturedMentorHighlight';
import FeaturedArticles from '@/components/FeaturedArticles';
import ToolsAndTemplates from '@/components/ToolsAndTemplates';
import ResourceSearchBar from '@/components/ResourceSearchBar';
import TestimonialsSection from '@/components/TestimonialsSection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />

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
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto max-w-md md:max-w-full rounded-2xl shadow-md border border-gray-100 dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
              alt="SkillSync web platform interface preview showing mentors list and schedule builder"
            />
            <Image
              width={1200}
              height={800}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
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

      <MentorDiscoverySection />

      <FeaturedMentorHighlight />

      {/* Why Choose Us — Issue #599 */}
      <WhyChooseUsSection />

      {/* Learning Path & Resources — Issue #600 */}
      <LearningPathResourcesSection />

      {/* Platform Statistics — Issue #601 */}
      <PlatformStatisticsSection />

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
