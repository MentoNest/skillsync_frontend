import React from 'react';

interface FeaturedMentorProps {
  mentor?: {
    id: string;
    name: string;
    title: string;
    bio: string;
    image: string;
    expertise: string[];
    stats: {
      mentees: number;
      sessions: number;
      rating: number;
    };
  };
}

const FeaturedMentorSection: React.FC<FeaturedMentorProps> = ({ mentor }) => {
  // Default featured mentor data
  const defaultMentor = {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Senior Software Architect & Tech Lead',
    bio: 'With over 15 years of experience in software development and team leadership, I specialize in helping developers transition into senior roles. My passion is mentoring the next generation of tech leaders through practical guidance and real-world insights.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    expertise: ['Software Architecture', 'Leadership', 'System Design', 'Career Growth'],
    stats: {
      mentees: 150,
      sessions: 500,
      rating: 4.9,
    },
  };

  const featuredMentor = mentor || defaultMentor;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            ✨ Featured Mentor
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Star Mentor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from the best in the industry and accelerate your career growth
          </p>
        </div>

        {/* Featured Mentor Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Column - Image & Stats */}
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25"></div>
                <div className="relative">
                  <img
                    src={featuredMentor.image}
                    alt={featuredMentor.name}
                    className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {featuredMentor.stats.rating}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{featuredMentor.stats.mentees}+</div>
                  <div className="text-sm text-gray-600 mt-1">Mentees</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">{featuredMentor.stats.sessions}+</div>
                  <div className="text-sm text-gray-600 mt-1">Sessions</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600 mt-1">Years</div>
                </div>
              </div>
            </div>

            {/* Right Column - Info & CTA */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Name & Title */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {featuredMentor.name}
                </h3>
                <p className="text-xl text-gray-600 font-medium">
                  {featuredMentor.title}
                </p>
              </div>

              {/* Bio */}
              <p className="text-gray-700 leading-relaxed text-lg">
                {featuredMentor.bio}
              </p>

              {/* Expertise Tags */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {featuredMentor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Session
                </button>
                <button className="flex-1 bg-white border-2 border-gray-300 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  View Profile
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 pt-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified mentor • Background checked • 100% satisfaction rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want to become a featured mentor?
          </p>
          <button className="text-blue-600 font-semibold hover:text-blue-700 underline underline-offset-4">
            Apply Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentorSection;