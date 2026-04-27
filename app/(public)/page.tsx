import Link from 'next/link';
import LearningPath from '@/components/LearningPath';
import FeaturedMentor from '@/components/FeaturedMentor';
import dynamic from 'next/dynamic';

// Static imports for above-the-fold content
import PlatformStats from '@/components/PlatformStats';

// Dynamic imports for below-the-fold sections with loading state
const LearningPath = dynamic(() => import('@/components/LearningPath'), {
  loading: () => <SectionSkeleton />,
});

const FeaturedLearningTracks = dynamic(
  () => import('@/components/FeaturedLearningTracks'),
  { loading: () => <SectionSkeleton /> }
);

const MentorDiscovery = dynamic(
  () => import('@/components/MentorDiscovery'),
  { loading: () => <SectionSkeleton /> }
);

const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 bg-gray-200 rounded w-1/3 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    </section>
  );
}

export default function PublicPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Connect, Learn & Grow with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSync
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              Bridge the gap between knowledge and experience. Find expert mentors, 
              share your expertise, or discover personalized learning paths tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Find a Mentor
              </Link>
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg text-center"
              >
                Become a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentor Section */}
      <FeaturedMentor />

      {/* Learning Path / Resources Section */}
      {/* Platform Statistics Section - Loaded immediately */}
      <PlatformStats />

      {/* Featured Learning Tracks Section - Lazy loaded */}
      <FeaturedLearningTracks />

      {/* Learning Path / Resources Section - Lazy loaded */}
      <LearningPath />

      {/* Mentor Discovery Section - Lazy loaded */}
      <MentorDiscovery />

      {/* Why Choose Us Section - Lazy loaded */}
      <WhyChooseUs />
    </div>
  );
}
