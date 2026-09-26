import Link from "next/link";

export type BrandTone = "onLight" | "onDark";

export interface BrandProps {
  /**
   * Which background the mark sits on.
   *
   * The indigo tile is identical either way; only the wordmark's colour differs.
   * Taking it as a prop rather than reading a theme means the header and the
   * footer cannot disagree about what colour the logo is — which is the whole
   * reason the logo was extracted from both files in the first place.
   */
  tone?: BrandTone;
  /** Overrides the wordmark. The link always returns to the landing page. */
  className?: string;
}

/**
 * The SkillSync logo and wordmark, linking to `/`.
 *
 * This markup previously appeared twice — once in `Navbar`, once in `Footer` —
 * and the two copies had already drifted: the header used `text-xl` and the
 * footer `text-lg`. A brand that renders differently in two places on the same
 * page is a bug report waiting to be filed, so it lives here once.
 *
 * The lightning-bolt glyph is `aria-hidden` and the wordmark is real text, so
 * the accessible name of the link is exactly "SkillSync" rather than
 * "SkillSync, link, graphic".
 */
export default function Brand({ tone = "onLight", className = "" }: BrandProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 ${className}`.trim()}
      aria-label="SkillSync home"
    >
      <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </span>
      <span
        className={`text-xl font-bold ${
          tone === "onDark" ? "text-white" : "text-slate-900"
        }`}
      >
        SkillSync
      </span>
    </Link>
  );
}
