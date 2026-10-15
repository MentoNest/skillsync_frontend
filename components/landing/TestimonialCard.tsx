export interface TestimonialCardProps {
  name: string;
  /** Role and employer, e.g. "Software Engineer · Monzo" */
  role: string;
  /** The testimonial itself */
  quote: string;
  /** Two-letter monogram used in place of a photo */
  initials: string;
  /** Tailwind background classes for the monogram tile */
  avatarColor: string;
  /** Optional. Omit entirely rather than passing 0 — no rating and zero stars are different claims */
  rating?: number;
  /** Optional short clause about how the person got results, shown under the quote */
  context?: string;
}

/**
 * One testimonial (#1161).
 *
 * The avatar is a monogram, not an image: the repo has no portrait assets, and
 * a broken `<img>` in a testimonial is the most conspicuous broken image there
 * is. It is `aria-hidden` because the name sits right beside it.
 *
 * The rating wrapper is `role="img"` with a single accessible label so the
 * group of stars is announced once, as a rating — bare `aria-hidden` stars
 * with a bare "4.8" next to them announce nothing about "out of what". The
 * stars render filled/empty from the rounded value and the exact number stays
 * visible as text, so rounding never becomes the number someone quotes back.
 */
export default function TestimonialCard({
  name,
  role,
  quote,
  initials,
  avatarColor,
  rating,
  context,
}: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div
          aria-hidden="true"
          className={`flex h-11 w-11 items-center justify-center rounded-full font-bold text-white ${avatarColor}`}
        >
          {initials}
        </div>

        {rating !== undefined ? (
          <div
            role="img"
            aria-label={`Rated ${rating} out of 5`}
            className="flex items-center gap-1"
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <svg
                key={index}
                aria-hidden="true"
                className={`h-4 w-4 ${index < Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm font-semibold text-slate-700 tabular-nums">
              {rating.toFixed(1)}
            </span>
          </div>
        ) : null}
      </div>

      <blockquote className="flex-1">
        <p className="text-sm leading-relaxed text-slate-700">&ldquo;{quote}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
        {context ? (
          <p className="mt-1.5 text-xs font-medium text-indigo-600">{context}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
