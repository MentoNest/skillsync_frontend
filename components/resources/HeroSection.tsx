import { SearchIcon } from "@/components/resources/icons";

/**
 * HeroSection — Resources page gradient hero.
 *
 * Design intent:
 * - Rich purple-to-indigo gradient background that visually separates the
 *   resources area from the rest of the site.
 * - Clear "Learning Resources" heading as the LCP text element, followed by
 *   a short subtitle that sets user expectation.
 * - Decorative blurred orbs reinforce the gradient depth without using images
 *   (zero network requests, no layout shift).
 * - Stat row provides social proof and adds visual rhythm below the text.
 * - Fully responsive: single-column on mobile, wider paddings on desktop.
 * - Dark mode: section already looks dark, so only subtle adjustments needed.
 *
 * Accessibility:
 * - <section> carries aria-labelledby pointing at the <h1>.
 * - Decorative orbs are aria-hidden so screen readers skip them.
 * - Stat values are wrapped in <dl>/<dt>/<dd> for semantic meaning.
 */
export default function HeroSection() {
  return (
    <section
      aria-labelledby="resources-hero-heading"
      className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-700 to-indigo-900"
    >
      {/* ── Decorative blurred orbs — aria-hidden, no images ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[100px]"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Eyebrow */}
        <div className="flex justify-center mb-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-100 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-purple-300"
              aria-hidden="true"
            />
            SkillSync Resources
          </span>
        </div>

        {/* Heading + subtitle */}
        <div className="text-center">
          <h1
            id="resources-hero-heading"
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Learning Resources
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base font-normal leading-8 text-purple-100/90 sm:text-lg">
            Explore our curated collection of guides, tutorials, and tools —
            hand-picked to help you build real skills and accelerate your career
            at every stage.
          </p>

          {/* Search prompt CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-purple-200 backdrop-blur-sm sm:w-auto sm:min-w-[320px]">
              <SearchIcon className="h-4 w-4 shrink-0 text-purple-300" />
              <span className="text-purple-200/80">
                Search guides, tutorials, tools…
              </span>
            </div>
            <a
              href="#categories"
              aria-label="Browse resource topics"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-700"
            >
              Browse topics
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Stats row ── */}
        <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
          {[
            { value: "200+", label: "Guides & tutorials" },
            { value: "6", label: "Topic categories" },
            { value: "50+", label: "Tools & templates" },
            { value: "Free", label: "Always free to access" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur-sm"
            >
              <dd className="text-2xl font-extrabold text-white sm:text-3xl">
                {value}
              </dd>
              <dt className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-purple-200/80">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Bottom fade into page background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50/60 to-transparent dark:from-gray-950/60"
      />
    </section>
  );
}
