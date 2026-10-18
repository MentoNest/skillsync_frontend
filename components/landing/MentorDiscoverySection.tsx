import Link from "next/link";
import MentorCard, { MentorCardProps } from "./MentorCard";

const FEATURED_MENTORS: MentorCardProps[] = [
  {
    id: "101",
    name: "Chidi Eze",
    title: "Principal Engineer · Datadog",
    description:
      "I have spent a decade keeping distributed systems upright under load. I mentor engineers on observability, incident response, and the unspoken skills that get ICs promoted to staff.",
    skills: ["Distributed Systems", "Observability", "Go", "Incident Response"],
    avatarInitials: "CE",
    avatarColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
    rating: 4.9,
    sessions: 286,
  },
  {
    id: "102",
    name: "Elena Petrova",
    title: "Head of Design · Bolt",
    description:
      "Design leader with three zero-to-one launches behind me. I help designers build portfolios that get callbacks and run design critiques that actually improve the work.",
    skills: ["Product Design", "Design Systems", "Portfolio Review", "Critique"],
    avatarInitials: "EP",
    avatarColor: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
    rating: 4.8,
    sessions: 164,
  },
  {
    id: "103",
    name: "Raj Malhotra",
    title: "Senior Engineering Manager · Atlassian",
    description:
      "From staff engineer to managing a 20-person org. I coach new managers through their first year: 1-on-1s, difficult conversations, and earning trust without authority.",
    skills: ["Engineering Management", "1-on-1s", "Team Health", "Hiring"],
    avatarInitials: "RM",
    avatarColor: "bg-gradient-to-br from-amber-500 to-orange-500",
    rating: 5.0,
    sessions: 132,
  },
  {
    id: "104",
    name: "Grace Kim",
    title: "Staff Data Scientist · Shopify",
    description:
      "I turn messy product data into decisions executives will sign off on. Mentoring data scientists on experiment design, causal inference, and communicating uncertainty.",
    skills: ["Experimentation", "Causal Inference", "Python", "SQL"],
    avatarInitials: "GK",
    avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
    rating: 4.9,
    sessions: 203,
  },
  {
    id: "105",
    name: "Tobi Adeyemi",
    title: "Founding Engineer · Paystack",
    description:
      "Built payment infrastructure used by 200k+ businesses across Africa. I help engineers navigate early-stage startups: wearing many hats, shipping fast, and knowing when to refactor.",
    skills: ["Fintech", "Backend", "Startup Engineering", "System Design"],
    avatarInitials: "TA",
    avatarColor: "bg-gradient-to-br from-rose-500 to-red-500",
    rating: 4.7,
    sessions: 97,
  },
  {
    id: "106",
    name: "Maya Johansson",
    title: "Director of Product · Klarna",
    description:
      "PM turned product director across fintech and e-commerce. I mentor aspiring PMs on case interviews and experienced PMs on stakeholder management at scale.",
    skills: ["Product Strategy", "Stakeholders", "Growth", "Case Interviews"],
    avatarInitials: "MJ",
    avatarColor: "bg-gradient-to-br from-sky-500 to-cyan-500",
    rating: 4.8,
    sessions: 178,
  },
];

/**
 * Mentor discovery section (#1156).
 *
 * Renders the shared `MentorCard` in a responsive grid. The cards are the same
 * component the mentee mentor browser uses, so a fix here fixes both.
 */
export default function MentorDiscoverySection() {
  return (
    <section
      id="mentors"
      className="bg-white py-20 lg:py-28"
      aria-labelledby="mentors-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Mentor discovery
          </p>
          <h2
            id="mentors-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            People who have done it, ready to help you do it
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Every mentor is vetted for real-world experience and a track record
            of helping others grow. Browse a few below, or explore the full
            catalogue.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          aria-label="Featured mentors"
        >
          {FEATURED_MENTORS.map((mentor) => (
            <li key={mentor.id} className="min-w-0">
              <MentorCard {...mentor} />
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <p className="mb-4 text-slate-600">
            These are six of over{" "}
            <span className="font-semibold text-slate-800">2,400+</span>{" "}
            mentors on SkillSync.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-md shadow-indigo-500/25 transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Explore all mentors
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
