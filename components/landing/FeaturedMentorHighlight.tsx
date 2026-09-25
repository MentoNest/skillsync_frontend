import Link from "next/link";

const FEATURED_MENTOR = {
  name: "Sarah Chen",
  title: "Senior Product Designer · Airbnb",
  bio: "Designing for trust and belonging at global scale. I help designers grow into leadership roles and build inclusive design practices. Previously led design at Dropbox and advised 50+ startups on product strategy.",
  avatarInitials: "SC",
  avatarColor: "bg-gradient-to-br from-rose-500 to-pink-500",
  skills: ["Product Design", "Design Systems", "User Research", "Accessibility", "Design Leadership", "Inclusive Design"],
  rating: 4.9,
  sessions: 156,
  hourlyRate: 180,
  availability: "available" as const,
  expertise: [
    "Transitioning from IC to Design Lead",
    "Building scalable design systems",
    "User research methodologies",
    "Accessibility-first design",
    "Portfolio review & career coaching",
  ],
  testimonials: [
    {
      author: "Marcus L.",
      role: "Senior Designer at Figma",
      content: "Sarah's guidance helped me land my dream role at Figma. Her insights on design leadership are invaluable.",
      rating: 5,
    },
    {
      author: "Priya K.",
      role: "Product Designer at Stripe",
      content: "The most practical mentorship I've ever had. Sarah gives actionable feedback you can apply immediately.",
      rating: 5,
    },
  ],
};

export default function FeaturedMentorHighlight() {
  return (
    <section
      id="featured-mentor"
      className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-rose-50"
      aria-labelledby="featured-mentor-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Mentor Profile */}
          <div className="sticky top-24 lg:sticky lg:top-32">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 lg:p-10">
              {/* Featured Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-semibold text-rose-700 uppercase tracking-wide">
                  Featured Mentor of the Month
                </span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div
                  className={`shrink-0 w-24 h-24 rounded-2xl ${FEATURED_MENTOR.avatarColor} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                  aria-hidden="true"
                >
                  {FEATURED_MENTOR.avatarInitials}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{FEATURED_MENTOR.name}</h3>
                  <p className="text-lg text-rose-600 font-medium mt-1">{FEATURED_MENTOR.title}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      FEATURED_MENTOR.availability === "available"
                        ? "bg-emerald-50 text-emerald-700"
                        : FEATURED_MENTOR.availability === "busy"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-50 text-slate-700"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        FEATURED_MENTOR.availability === "available"
                          ? "bg-emerald-500"
                        : FEATURED_MENTOR.availability === "busy"
                          ? "bg-amber-500"
                        : "bg-slate-400"
                      }`} aria-hidden="true" />
                      {FEATURED_MENTOR.availability.charAt(0).toUpperCase() + FEATURED_MENTOR.availability.slice(1)}
                    </span>
                    <span className="text-sm text-slate-500">${FEATURED_MENTOR.hourlyRate}/hr</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-2xl font-bold text-slate-900">{FEATURED_MENTOR.rating.toFixed(1)}</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <p className="text-sm font-medium text-slate-700">{FEATURED_MENTOR.sessions}+ sessions</p>
                  <p className="text-xs text-slate-500">Completed successfully</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_MENTOR.expertise.map((exp) => (
                    <span key={exp} className="text-sm px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-100">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                <p className="text-slate-700 leading-relaxed text-sm">
                  &ldquo;{FEATURED_MENTOR.bio}&rdquo;
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/register"
                  className="block w-full text-center px-6 py-3.5 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-500/25 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  Book a session with Sarah
                </Link>
                <Link
                  href="#mentors"
                  className="block w-full text-center px-6 py-3.5 rounded-xl border border-rose-300 text-rose-600 font-semibold hover:bg-rose-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                >
                  View full profile
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Testimonials & Skills */}
          <div className="space-y-8">
            {/* Testimonials */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
              <h4 className="text-lg font-bold text-slate-900 mb-6">What mentees say</h4>
              <div className="space-y-6" role="list" aria-label="Testimonials">
                {FEATURED_MENTOR.testimonials.map((testimonial, index) => (
                  <article key={index} className="p-4 bg-slate-50 rounded-xl" role="listitem">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex" aria-label={`${testimonial.rating} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-slate-700 leading-relaxed mb-3">&ldquo;{testimonial.content}&rdquo;</blockquote>
                    <footer className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm" aria-hidden="true">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{testimonial.author}</p>
                        <p className="text-xs text-slate-500">{testimonial.role}</p>
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
              <h4 className="text-lg font-bold text-slate-900 mb-6">Core Skills</h4>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Skills">
                {FEATURED_MENTOR.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default"
                    role="listitem"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}