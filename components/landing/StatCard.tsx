import { ReactNode } from "react";

export interface StatCardProps {
  /**
   * The number, already formatted — "2,400+", "98%", "4.9/5".
   *
   * A string rather than a number because a stat is nearly always a formatted
   * claim, not a measurement, and the moment it becomes a number somebody adds
   * `toLocaleString()` in the component and the caller loses the ability to
   * write "18k+". Passing the literal also stops a placeholder from silently
   * rendering as `NaN` or `0`.
   */
  value: string;
  /** What the number measures. Reads as the term for the value above it. */
  label: string;
  /** Optional glyph. Always decorative — see the note on `aria-hidden` below. */
  icon?: ReactNode;
}

/**
 * One platform statistic.
 *
 * ## Why this is a `<dt>`/`<dd>` pair inside a `<dl>`
 *
 * A statistic is a term and its description: "Expert Mentors" *is* 2,400+. That
 * is exactly what a description list is for, and it is the only markup that
 * states the relationship to a screen reader. Two loose paragraphs do not: they
 * read as "2,400 plus. Expert Mentors." — two unrelated strings that happen to
 * be adjacent, with nothing telling the listener which number belongs to which
 * label. On a grid of four that is genuinely hard to follow.
 *
 * So the grid in `StatsSection` is the `<dl>`, and this component is the
 * `<div>` wrapper around one `<dt>`/`<dd>` pair, which is the shape HTML
 * allows.
 *
 * ## Why the DOM order is inverted relative to the visual order
 *
 * `<dt>` must precede `<dd>`, but the design wants the number on top. That is
 * what `flex-col-reverse` is for: the accessible and DOM order stay
 * "label, then value" while the eye reads "value, then label".
 *
 * The upside is not incidental — announcing the label *before* the number is
 * the better order anyway, because it tells the listener what the number is
 * before they have to hold it in memory.
 */
export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="group flex flex-col-reverse items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50">
      <dt className="text-sm font-medium text-slate-600">{label}</dt>

      <dd className="flex flex-col items-center gap-3">
        {icon ? (
          // Decorative. The label beside it already names the statistic, so an
          // announced icon is the same words twice. Hiding it here rather than
          // asking each caller to remember keeps that guarantee with the one
          // component that owns the icon slot.
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors duration-300 group-hover:bg-indigo-100"
          >
            {icon}
          </span>
        ) : null}

        {/* `tabular-nums` so the digits share a width. These animate in some
            layouts, and a proportional-figure stat visibly re-flows as it
            counts. Harmless when nothing animates. */}
        <span className="text-4xl sm:text-5xl font-extrabold tabular-nums tracking-tight text-slate-900">
          {value}
        </span>
      </dd>
    </div>
  );
}
