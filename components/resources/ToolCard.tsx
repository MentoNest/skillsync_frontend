import Link from "next/link";
import type { ReactNode } from "react";

export type ToolCardGradient = "indigo" | "emerald" | "amber" | "rose";

export interface ToolCardProps {
  title: string;
  description: string;
  /** Short feature bullets shown under the description. */
  features?: string[];
  /** Decorative icon; rendered `aria-hidden`. */
  icon: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  /** Background gradient. Defaults to `indigo`. */
  gradient?: ToolCardGradient;
}

const GRADIENTS: Record<ToolCardGradient, string> = {
  indigo: "from-indigo-600 via-indigo-500 to-violet-500 shadow-indigo-500/25",
  emerald: "from-emerald-600 via-teal-500 to-cyan-500 shadow-emerald-500/25",
  amber: "from-amber-500 via-orange-500 to-rose-500 shadow-orange-500/25",
  rose: "from-rose-600 via-pink-500 to-fuchsia-500 shadow-rose-500/25",
};

/**
 * Gradient card for a tool or template, with one CTA button.
 *
 * Only the CTA is a link, so the card's text is not swallowed into one long
 * link announcement. All text is white on a saturated gradient; the CTA is a
 * white pill so it keeps contrast whichever gradient is used.
 */
export default function ToolCard({
  title,
  description,
  features,
  icon,
  ctaLabel,
  ctaHref,
  gradient = "indigo",
}: ToolCardProps) {
  return (
    <article
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-xl sm:p-8 ${GRADIENTS[gradient]}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
      />

      <div className="relative flex flex-1 flex-col">
        <span
          aria-hidden="true"
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25"
        >
          {icon}
        </span>

        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
        <p className="mt-2 leading-relaxed text-white/85">{description}</p>

        {features && features.length > 0 ? (
          <ul className="mt-5 space-y-2 text-sm text-white/90">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <svg
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-8">
          <Link
            href={ctaHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600 sm:w-auto"
          >
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
