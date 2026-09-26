const BENEFITS = [
  {
    title: "Vetted Experts Only",
    description: "Every mentor goes through a rigorous screening process. We verify credentials, experience, and teaching ability so you learn from the best.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Personalized Matching",
    description: "Our AI-powered matching algorithm considers your goals, learning style, and schedule to connect you with the ideal mentor for your needs.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions that fit your calendar. Mentors offer various time slots across time zones, and you can reschedule up to 24 hours before.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Hands-On Learning",
    description: "Go beyond theory with practical exercises, code reviews, portfolio projects, and real-world scenarios tailored to your career goals.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 16l4-16M6 12a4 4 0 11-8 0 4 4 0 018 0m0 0v6m0-6H2m16 0H6" />
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    description: "Monitor your growth with session notes, action items, and milestone tracking. See tangible progress toward your career objectives.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Community Access",
    description: "Join a network of 18,000+ learners. Participate in group discussions, peer learning sessions, and exclusive community events.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Money-Back Guarantee",
    description: "If you're not satisfied after your first session, we'll refund you in full. No questions asked. Your growth is our priority.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "No Long-Term Contracts",
    description: "Pay as you go or choose a subscription. Cancel anytime with no penalties. We believe in earning your trust every session.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Industry-Recognized Certificates",
    description: "Earn verifiable certificates for completed mentorship programs. Showcase your commitment to continuous learning on LinkedIn and your resume.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="py-20 lg:py-28 bg-slate-50"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3" aria-hidden="true">
            Why Choose SkillSync
          </span>
          <h2
            id="why-choose-us-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Built for your career growth
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Every feature is designed to help you learn faster, grow further, and achieve your professional goals.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" role="list" aria-label="Platform benefits">
          {BENEFITS.map((benefit, index) => (
            <article
              key={benefit.title}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
              role="listitem"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}