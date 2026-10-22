import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Sign in · SkillSync",
    template: "%s · SkillSync",
  },
  description:
    "Sign in or create a SkillSync account to find mentors and grow your career.",
};

const FEATURED_MENTOR = {
  initials: "AO",
  name: "Amara Osei",
  role: "VP of Engineering · Flutterwave",
  quote:
    "I mentor engineers and new managers on the IC-to-leadership transition. One focused conversation about the decision in front of you can replace a year of guessing.",
};

/**
 * Shared layout for the `(auth)` route group (#1167, #1171).
 *
 * Split-screen on desktop: a brand-gradient panel with a mentor highlight on
 * the left, the form on the right. On mobile the highlight panel is hidden so
 * the form is the first thing the user sees and the viewport is not spent on
 * marketing copy. `overflow-hidden` on the panel keeps the decorative glows
 * from widening the layout on short screens.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-12 py-10 text-white lg:flex xl:px-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl"
        />

        <Link
          href="/"
          className="relative text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          SkillSync
        </Link>

        <div className="relative max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-indigo-100">
            Grow with intention
          </p>
          <h2 className="text-5xl font-semibold leading-tight">
            Your next chapter starts with a conversation.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/80">
            Find the people, guidance, and momentum to move your career forward.
          </p>
        </div>

        {/* Mentor highlight */}
        <figure className="relative mt-12 max-w-md rounded-2xl bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-sm">
          <blockquote className="text-sm leading-relaxed text-white/90">
            &ldquo;{FEATURED_MENTOR.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-400 text-sm font-bold text-white"
            >
              {FEATURED_MENTOR.initials}
            </span>
            <span>
              <span className="block text-sm font-semibold">
                {FEATURED_MENTOR.name}
              </span>
              <span className="block text-xs text-white/70">
                {FEATURED_MENTOR.role}
              </span>
            </span>
          </figcaption>
        </figure>

        <p className="relative border-t border-white/20 pt-5 text-sm text-white/70">
          Learn together. Build what&apos;s next.
        </p>
      </aside>

      <section className="flex min-h-screen items-center justify-center overflow-x-hidden bg-[var(--background)] px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
