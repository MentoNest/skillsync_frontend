import Link from 'next/link';

/**
 * HeroSection — above-the-fold, server-rendered, no images.
 *
 * Performance notes:
 * - No <Image> needed here: the S² mark is pure CSS so there is nothing to
 *   lazy-load and no layout shift to worry about.
 * - The decorative circle no longer uses `animate-pulse`.  Continuous CSS
 *   animations on paint-heavy elements hurt Lighthouse "Avoid non-composited
 *   animations" and trigger unnecessary repaints.  A static gradient achieves
 *   the same visual quality with zero runtime cost.
 * - Text content is rendered server-side so it is immediately readable even
 *   before any JS hydrates, benefiting both FCP and SEO.
 *
 * Accessibility notes:
 * - Section labelled via aria-labelledby pointing at the h1 so screen readers
 *   announce the landmark correctly.
 * - CTA is a plain <Link> styled as a button — avoids the invalid nested
 *   interactive element pattern of <Link><Button>.
 * - Decorative orb is aria-hidden so it is skipped by assistive technology.
 */
export default function HeroSection() {
  return (
    <section
      className="bg-white dark:bg-gray-900 transition-colors"
      aria-labelledby="hero-heading"
    >
      <div className="grid max-w-screen-xl px-4 py-12 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 items-center">

        {/* Copy column */}
        <div className="mr-auto place-self-center lg:col-span-7 text-center sm:text-left w-full">
          <h1
            id="hero-heading"
            className="max-w-2xl mx-auto sm:mx-0 mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none dark:text-white"
          >
            Find Your Perfect Mentor
          </h1>
          <p className="max-w-2xl mx-auto sm:mx-0 mb-6 font-light text-gray-500 lg:mb-8 text-base md:text-lg lg:text-xl dark:text-gray-400">
            SkillSync helps you connect with experienced professionals to
            guide you on your career path.
          </p>
          {/* Styled as a button but rendered as a link — no nested interactive elements */}
          <Link
            href="/register"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-md bg-cyan-600 px-6 py-3 text-base sm:text-sm font-semibold text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-900 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Decorative mark column — desktop only.
            Static gradient; no animation to avoid layout thrashing. */}
        <div
          className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center"
          aria-hidden="true"
        >
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-6xl font-bold text-cyan-600/40 dark:text-cyan-400/40 select-none">
              S²
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
