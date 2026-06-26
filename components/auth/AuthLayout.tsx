import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side — form */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right side — mentor highlight panel (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 px-10 text-white">
        {/* Mentor card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm w-full mb-8 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center text-2xl font-bold text-white">
              A
            </div>
            <div>
              <p className="font-semibold text-lg">Amara Okonkwo</p>
              <p className="text-purple-200 text-sm">Senior Engineer @ Stripe</p>
            </div>
          </div>
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-purple-100 text-sm leading-relaxed">
            "Mentoring on SkillSync changed how I share expertise. The platform makes it effortless to connect with driven learners."
          </p>
        </div>

        {/* Testimonial */}
        <div className="max-w-sm text-center">
          <h2 className="text-2xl font-bold leading-snug mb-3">
            Grow confidently with support from skilled mentors who care
          </h2>
          <p className="text-purple-200 text-sm">
            Join thousands of learners accelerating their careers with personalised mentorship.
          </p>
        </div>
      </div>
    </div>
  );
}
