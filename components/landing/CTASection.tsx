import Link from "next/link";

/**
 * Final call-to-action section.
 *
 * Sits at the end of the page, after the reader has seen the product, the
 * proof, and the people. A `<section>` with `aria-labelledby`, matching every
 * other landing section, and both actions are real links (not buttons that
 * only work with a mouse) so they are reachable by keyboard and screen
 * readers alike.
 */
export default function CTASection() {
  return (
    <section
      id="get-started"
      className="py-20 lg:py-28 bg-gradient-to-br from-indigo-600 via-indigo-600 to-cyan-600"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
        >
          Ready to accelerate your growth?
        </h2>
        <p className="mt-5 text-lg text-indigo-100 leading-relaxed max-w-2xl mx-auto">
          Join thousands of learners who found the right mentor to help them
          reach their next career milestone. Getting started takes less than
          two minutes.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-semibold text-base hover:bg-indigo-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            Get started for free
          </Link>
          <Link
            href="/mentors"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            Discover mentors
          </Link>
        </div>
      </div>
    </section>
  );
}
