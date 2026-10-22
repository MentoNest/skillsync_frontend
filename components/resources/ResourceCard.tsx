import Image from "next/image";
import Link from "next/link";
import CategoryBadge from "@/components/resources/CategoryBadge";

export interface ResourceCardProps {
  title: string;
  summary: string;
  /** "Guide", "Article", or "Video". Rendered as a badge. */
  type: string;
  /** Shown next to the type, e.g. "12 min read". */
  readMinutes: number;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /**
   * Where the card links to. Omit it while the entry is unwritten.
   *
   * Omitting is a real state, not a fallback: with no `href` the card renders an
   * `<article>` and is not focusable and announces no link. The alternative,
   * defaulting to `href="#"`, is worse in three specific ways — it puts the
   * card in the tab order, announces it as a link, and on activation scrolls to
   * the top of the page while pushing a useless entry onto the history stack.
   * A card that looks ready but is a dead end is a broken promise; a card that
   * is simply not a link yet is honest.
   *
   * Nothing passes `href` today, because the resources are placeholders. The
   * branch exists because a resource card that structurally cannot link is not
   * a card.
   */
  href?: string;
}

/**
 * One resource entry.
 *
 * The whole card is not a link. The title is the link, for the same reason the
 * blog cards elsewhere are: a full-card link makes the entire card — title,
 * summary, badge, read time — one announcement, and creates a ~300px hit target
 * around text that already reads as a heading. The card still gets the hover
 * treatment by reacting to the title's hover via a group, so it looks clickable
 * without being a link.
 *
 * `type` is exposed as an interface field rather than derived, because "Guide"
 * and "12 min read" are different units and a card whose read time is
 * inappropriate for its type is a data problem, not a formatting one.
 */
export default function ResourceCard({
  title,
  summary,
  type,
  readMinutes,
  image,
  href,
}: ResourceCardProps) {
  const body = (
    <>
      {image ? (
        <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            // SVGs are vectors; running them through the optimizer adds a
            // request hop for no size win.
            unoptimized={image.src.endsWith(".svg")}
          />
        </div>
      ) : null}

      <div className="flex items-center gap-2 mb-3">
        <CategoryBadge label={type} />
        <span className="text-xs text-slate-500 tabular-nums">
          {readMinutes} min read
        </span>
      </div>

      <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
        {summary}
      </p>
    </>
  );

  const shell =
    "group flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 overflow-hidden";

  // No destination yet. Rendered as a non-interactive article rather than an
  // `href="#"`, which would be focusable, announce as a link, and go nowhere.
  if (!href) {
    return <article className={shell}>{body}</article>;
  }

  return (
    <Link href={href} className={`${shell} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}>
      {body}
    </Link>
  );
}
