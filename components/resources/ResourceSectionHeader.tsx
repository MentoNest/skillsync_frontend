import Link from "next/link";

export interface ResourceSectionHeaderProps {
  /** `id` for the `h2`, so the parent `<section>` can use `aria-labelledby`. */
  headingId: string;
  eyebrow?: string;
  title: string;
  description?: string;
  viewAllHref: string;
  /** Visible link text. Defaults to "View all". */
  viewAllLabel?: string;
}

/** Heading + "View all" link row shared by the featured resource sections. */
export default function ResourceSectionHeader({
  headingId,
  eyebrow,
  title,
  description,
  viewAllHref,
  viewAllLabel = "View all",
}: ResourceSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-slate-600 leading-relaxed">{description}</p>
        ) : null}
      </div>

      <Link
        href={viewAllHref}
        // The visible text is just "View all"; name the target for screen
        // readers, which may list every "View all" link on the page together.
        aria-label={`${viewAllLabel} ${title.toLowerCase()}`}
        className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        {viewAllLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
