import LearningPath from '@/components/LearningPath';
import PlatformStats from '@/components/PlatformStats';
import FeaturedLearningTracks from '@/components/FeaturedLearningTracks';
import MentorDiscovery from '@/components/MentorDiscovery';
import WhyChooseUs from '@/components/WhyChooseUs';

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
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Find a Mentor
              </button>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg">
                Become a Mentor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Section */}
      <PlatformStats />

      {/* Featured Learning Tracks Section */}
      <FeaturedLearningTracks />

      {/* Learning Path / Resources Section */}
      <LearningPath />

      {/* Mentor Discovery Section */}
      <MentorDiscovery />

      {/* Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
}
