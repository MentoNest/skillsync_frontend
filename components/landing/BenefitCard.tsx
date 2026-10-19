import { ReactNode } from "react";

export interface BenefitCardProps {
  /** Short benefit name, rendered as the card heading */
  title: string;
  /** One or two sentences explaining the benefit */
  description: string;
  /** Decorative glyph */
  icon: ReactNode;
}

/**
 * One benefit tile in the "Why Choose Us" grid (#1158).
 *
 * Extracted from the section so the same card shape can be reused wherever a
 * benefit or feature needs presenting — the section itself is just data plus a
 * grid. The icon is always `aria-hidden` inside an `aria-hidden` wrapper: it
 * is decoration next to a real heading, and announcing a raw SVG path helps
 * nobody.
 */
export default function BenefitCard({
  title,
  description,
  icon,
}: BenefitCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50">
      <span
        aria-hidden="true"
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600 text-white"
      >
        {icon}
      </span>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </article>
  );
}
