import Link from "next/link";
import MentorCard, { MentorCardProps } from "./MentorCard";

const FEATURED_MENTORS: MentorCardProps[] = [
  {
    name: "James Okafor",
    title: "Staff Software Engineer · Meta",
    description:
      "10+ years building distributed systems at scale. I help engineers crack senior and staff-level interviews, improve system design skills, and navigate big-tech transitions.",
    skills: ["System Design", "Distributed Systems", "Go", "Kubernetes", "Career Growth"],
    avatarInitials: "JO",
    avatarColor: "bg-gradient-to-br from-violet-500 to-indigo-600",
    rating: 4.9,
    sessions: 320,
  },
  {
    name: "Aisha Nwosu",
    title: "Principal Product Manager · Stripe",
    description:
      "Turned 3 zero-to-one products into market leaders. I mentor aspiring PMs and help experienced PMs move into leadership with a structured, data-informed approach.",
    skills: ["Product Strategy", "0-to-1 Products", "Stakeholder Management", "Analytics"],
    avatarInitials: "AN",
    avatarColor: "bg-gradient-to-br from-rose-500 to-orange-400",
    rating: 4.8,
    sessions: 210,
  },
  {
    name: "Marcus Liu",
    title: "Lead UX Designer · Figma",
    description:
      "Obsessed with craft and clarity. I help designers build strong portfolios, master design systems, and land roles at top-tier product companies.",
    skills: ["UX Research", "Design Systems", "Figma", "Prototyping", "Portfolio Review"],
    avatarInitials: "ML",
    avatarColor: "bg-gradient-to-br from-cyan-500 to-teal-500",
    rating: 4.9,
    sessions: 175,
  },
  {
    name: "Priya Sharma",
    title: "Senior Data Scientist · Netflix",
    description:
      "Bridging ML and business impact at Netflix. I mentor data scientists on model deployment, stakeholder communication, and breaking into ML engineering.",
    skills: ["Machine Learning", "Python", "MLOps", "SQL", "Data Strategy"],
    avatarInitials: "PS",
    avatarColor: "bg-gradient-to-br from-emerald-500 to-green-400",
    rating: 4.7,
    sessions: 142,
  },
  {
    name: "David Torres",
    title: "Engineering Manager · Shopify",
    description:
      "From IC to EM in 18 months. I coach engineers transitioning into management, help EMs build high-performing teams, and work through common leadership challenges.",
    skills: ["Engineering Leadership", "Team Building", "1-on-1s", "Roadmapping"],
    avatarInitials: "DT",
    avatarColor: "bg-gradient-to-br from-amber-500 to-yellow-400",
    rating: 4.8,
    sessions: 198,
  },
  {
    name: "Fatima Al-Rashid",
    title: "Startup Founder & Angel Investor",
    description:
      "Built and sold two startups. I work with founders on fundraising strategy, product-market fit, and building lean teams that punch above their weight.",
    skills: ["Fundraising", "GTM Strategy", "Product-Market Fit", "Pitch Decks"],
    avatarInitials: "FA",
    avatarColor: "bg-gradient-to-br from-pink-500 to-fuchsia-500",
    rating: 4.9,
    sessions: 87,
  },
];

export default function MentorDiscoverySection() {
  return (
    <section
      id="mentors"
      className="py-20 lg:py-28 bg-slate-50"
      aria-labelledby="mentors-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Mentor Discovery
          </span>
          <h2
            id="mentors-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Learn from people who&rsquo;ve been there
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Every mentor on SkillSync is vetted, experienced, and genuinely invested
            in your success. Find the right fit for where you want to go.
          </p>
        </div>

        {/* Mentor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_MENTORS.map((mentor) => (
            <MentorCard key={mentor.name} {...mentor} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            These are just a few of our{" "}
            <span className="font-semibold text-slate-800">2,400+</span> mentors.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Explore all mentors
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
