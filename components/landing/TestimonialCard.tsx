export interface TestimonialCardProps {
  name: string;
  /** Role and employer, e.g. "Senior Product Designer · Figma". */
  role: string;
  /** The testimonial itself, written the way a person would say it. */
  quote: string;
  /** Two-letter monogram used in place of a photo. See the note on the avatar. */
  initials: string;
  /** Tailwind background classes for the monogram tile. */
  avatarColor: string;
  /**
   * Optional. Omit it entirely rather than passing `0` — a card with no rating
   * and a card rating zero stars are different claims, and only one of them is
   * something a mentor consented to.
   */
  rating?: number;
  /** How the person came to SkillSync. One short clause, rendered under the name. */
  context?: string;
}

/**
 * One testimonial.
 *
 * ## The avatar
 *
 * A monogram, not an image. The repository has no portrait assets and no image
 * pipeline configured, and a `<img>` pointing at a file that does not exist is a
 * broken image icon in a testimonial — the one place on a page where a broken
 * image is most conspicuous. The monogram is also `aria-hidden`, because the
 * name is right next to it and announcing "JD" before "Jordan Diaz" is noise.
 *
 * When real photographs arrive, this becomes a `next/image` with the same
 * `alt=""`, and the card is unchanged.
 *
 * ## The rating
 *
 * `<div role="img" aria-label="Rated 4.9 out of 5">` around the stars, plus the
 * number as real text beside it.
 *
 * The wrapper matters. Five bare `<svg aria-hidden="true">` stars with a "4.9"
 * next to them is the common version, and it is silent: a screen reader hears
 * nothing at all about the rating, because the stars are hidden and "4.8" alone
 * does not say "out of what". One `role="img"` with a label gives the whole
 * group a single accessible name and costs one attribute.
 *
 * The stars themselves stay `aria-hidden` so the group is not announced twice,
 * and they are drawn filled/empty from the rounded value — a fractional star
 * drawn with a gradient overlay would be prettier and would overstate a 4.8 as
 * a 4.8 when a reader is counting pips. The exact number is always visible
 * next to them, so the rounding never misinforms anyone.
 */
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  /** Person giving the testimonial */
  name: string;
  /** Role or job title of the person */
  role: string;
  /** The testimonial text */
  quote: string;
  /** Initials shown in the avatar fallback */
  avatarInitials: string;
  /** Tailwind gradient classes for the avatar */
  avatarColor: string;
  /** Optional rating out of 5, e.g. 5 or 4.5 */
  rating?: number;
  /** Whether this card should be visually emphasised (e.g. featured quote) */
  featured?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= Math.round(rating);
        return (
          <svg
            key={index}
            className={
              filled ? "w-4 h-4 text-amber-400" : "w-4 h-4 text-slate-300"
            }
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

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
    <figure className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50">
      {rating !== undefined ? (
        <div className="mb-4 flex items-center gap-2">
          <div
            role="img"
            aria-label={`Rated ${rating} out of 5`}
            className="flex items-center gap-0.5"
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <svg
                key={index}
                aria-hidden="true"
                className={`w-4 h-4 ${
                  index < Math.round(rating) ? "text-amber-400" : "text-slate-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* The precise value, always visible, so the pip rounding above never
              becomes the number a reader quotes back to us. */}
          <span className="text-sm font-semibold text-slate-800 tabular-nums">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-500">/ 5</span>
        </div>
      ) : null}

      <blockquote className="flex-1">
        <p className="text-slate-700 leading-relaxed">
          <span aria-hidden="true" className="text-indigo-300 font-serif text-2xl leading-none">
            &ldquo;
          </span>
          {quote}
          <span aria-hidden="true" className="text-indigo-300 font-serif text-2xl leading-none">
            &rdquo;
          </span>
        </p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <div
          aria-hidden="true"
          className={`shrink-0 w-11 h-11 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm`}
        >
          {initials}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-slate-900 truncate">{name}</p>
          <p className="text-sm text-slate-500 truncate">{role}</p>
          {context ? (
            <p className="mt-1 text-xs text-indigo-600 font-medium truncate">
              {context}
            </p>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
