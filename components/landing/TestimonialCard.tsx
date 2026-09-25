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
  avatarInitials,
  avatarColor,
  rating,
  featured = false,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex flex-col h-full rounded-2xl border transition-all duration-300",
        featured
          ? "bg-white border-indigo-200 shadow-lg shadow-indigo-100/50"
          : "bg-white border-slate-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-100"
      )}
    >
      <div className="flex-1 p-6 lg:p-7">
        {/* Optional rating */}
        {rating !== undefined && (
          <div className="mb-4">
            <StarRating rating={rating} />
          </div>
        )}

        {/* Testimonial text */}
        <blockquote className="text-slate-700 leading-relaxed">
          <p
            className={cn(
              "before:content-['“'] after:content-['”']",
              featured ? "text-lg" : "text-base"
            )}
          >
            {quote}
          </p>
        </blockquote>
      </div>

      {/* Author */}
      <figcaption className="flex items-center gap-3 px-6 lg:px-7 pb-6 lg:pb-7 pt-0 border-t border-slate-100">
        <span
          className={cn(
            "shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold",
            avatarColor
          )}
          aria-hidden="true"
        >
          {avatarInitials}
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 text-sm truncate">{name}</p>
          <p className="text-xs text-slate-500 truncate">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
