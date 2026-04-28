import Image from 'next/image';

interface FeaturedMentorProps {
  name?: string;
  title?: string;
  bio?: string;
  imageSrc?: string;
  specialties?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function FeaturedMentor({
  name = "Dr. Sarah Johnson",
  title = "Senior Software Engineer & Tech Lead",
  bio = "With over 15 years of experience in software development, Dr. Johnson has led teams at top tech companies and mentored hundreds of developers. She specializes in system architecture, cloud computing, and career development for engineers.",
  imageSrc = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  specialties = ["System Architecture", "Cloud Computing", "Leadership", "Career Development"],
  ctaText = "Book a Session",
  ctaLink = "/mentor/dr-sarah-johnson"
}: FeaturedMentorProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨ Featured Mentor
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Spotlight Mentor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exceptional mentors who are ready to guide your journey
          </p>
        </div>

        {/* Featured Mentor Card */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-200 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-80 lg:h-auto bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Available</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {name}
                  </h3>
                  <p className="text-lg text-indigo-600 font-semibold mb-4">
                    {title}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium border border-indigo-100"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={ctaLink}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {ctaText}
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                  <a
                    href="/mentors"
                    className="inline-flex items-center justify-center bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                  >
                    View All Mentors
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
