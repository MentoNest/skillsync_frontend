import BenefitCard from "./BenefitCard";

const BENEFITS = [
  {
    title: "Vetted Mentors",
    description:
      "Every mentor passes a screening process covering credentials, communication skill, and a track record of actually helping people grow. No self-serve profiles.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Matched to Your Goal",
    description:
      "Tell us what you are trying to achieve and we match you with someone who has done it — not just someone with a similar job title.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Book Around Your Life",
    description:
      "Mentors publish real availability across time zones. Pick a slot, get a calendar invite, reschedule up to 24 hours before — no email ping-pong.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Session Notes Included",
    description:
      "Every session ends with written notes and action items, so progress does not depend on what you managed to remember.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "First Session Guarantee",
    description:
      "If the first session is not useful, it is free. Matching is only worth anything if the fit is right, and we would rather fix a mismatch than defend one.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Cancel Anytime",
    description:
      "Pay per session or subscribe — either way there is no contract and no cancellation penalty. Stay because it works, not because it is hard to leave.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
] as const;

/**
 * "Why Choose Us" section (#1158).
 *
 * Six benefits rendered through the reusable `BenefitCard` in a responsive
 * 1/2/3-column grid.
 */
export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="bg-slate-50 py-20 lg:py-28"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Why SkillSync
          </p>
          <h2
            id="why-choose-us-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Mentorship without the usual friction
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            The parts of mentorship that usually go wrong — bad matching,
            scheduling chaos, advice with no follow-through — are the parts we
            built the product around.
          </p>
        </header>

        <ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          aria-label="Platform benefits"
        >
          {BENEFITS.map((benefit) => (
            <li key={benefit.title} className="min-w-0">
              <BenefitCard {...benefit} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
