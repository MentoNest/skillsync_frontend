import React from "react";

interface FeaturedMentor {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  skills: string[];
}

const featuredMentor: FeaturedMentor = {
  name: "Dr. Aisha Okafor",
  title: "Senior Product Designer @ Google",
  avatar: "AO",
  rating: 4.9,
  reviews: 127,
  skills: ["UX Design", "Product Strategy", "Figma"],
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side – Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-white lg:px-16">
        {/* Logo */}
        <div className="w-full max-w-md mb-10">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Skill<span className="text-violet-600">Sync</span>
          </span>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side – Mentor Highlight Panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col justify-between p-12 bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-800">
        {/* Decorative circles for good ui */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-indigo-400/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-white/5" />

        {/* Header text */}
        <div className="relative z-10">
          <p className="text-white/60 text-sm font-medium uppercase tracking-widest mb-3">
            Featured Mentor
          </p>
          <h2 className="text-white text-3xl font-bold leading-tight max-w-xs">
            Learn from the best in your field
          </h2>
        </div>

        {/* Mentor Card */}
        <div className="relative z-10 my-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
            {/* Avatar & Info */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {featuredMentor.avatar}
              </div>
              <div>
                <p className="text-white font-semibold text-base leading-tight">
                  {featuredMentor.name}
                </p>
                <p className="text-white/60 text-sm mt-0.5">
                  {featuredMentor.title}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(featuredMentor.rating)
                        ? "text-amber-400"
                        : "text-white/30"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-semibold text-sm">
                {featuredMentor.rating}
              </span>
              <span className="text-white/50 text-sm">
                ({featuredMentor.reviews} reviews)
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {featuredMentor.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/15 text-white border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <blockquote className="text-white/90 text-lg font-medium leading-relaxed italic">
            &ldquo;Grow confidently with support from skilled mentors who care&rdquo;
          </blockquote>
          <div className="mt-4 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all ${
                  i === 0 ? "w-6 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}