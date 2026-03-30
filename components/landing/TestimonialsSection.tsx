// components/landing/TestimonialsSection.tsx

'use client';

import Image from 'next/image';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "SkillSync connected me with an amazing mentor who helped me transition into a product design role. The structured sessions and real-world feedback accelerated my learning significantly.",
    name: "Sarah Johnson",
    role: "Product Designer at TechCorp",
    avatar: "/Image (Sarah Johnson).svg"
  },
  {
    id: 2,
    quote: "As a career changer, I was nervous about breaking into tech. My mentor's guidance and the platform's resources gave me the confidence to land my dream job in 6 months.",
    name: "Colin Brown",
    role: "Frontend Developer at StartupX",
    avatar: "/Image (Cole Hathans).svg"
  },
  {
    id: 3,
    quote: "The personalized matching system is fantastic. I was paired with a mentor who truly understood my goals and provided actionable advice throughout my journey.",
    name: "James Williams",
    role: "Business Analyst at FinTech Inc",
    avatar: "/Image (Marcus Williams).svg"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Hear from professionals who transformed their careers through our mentorship platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm p-6 md:p-8 flex flex-col"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 text-sm md:text-base mb-6 flex-grow leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}