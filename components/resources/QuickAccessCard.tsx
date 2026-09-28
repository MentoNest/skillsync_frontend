import Link from "next/link";
import type { ReactNode } from "react";

export interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  /**
   * Where the card links to. Omit it while the category has no page yet — the
   * card then renders as a non-interactive `<article>` rather than a dead link,
   * matching `ResourceCard`.
   */
  href?: string;
}

/** One Quick Access category tile. Reusable anywhere a category grid is needed. */
export default function QuickAccessCard({ title, description, icon, href }: QuickAccessCardProps) {
  const body = (
    <>
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100"
      >
        {icon}
      </span>
      <div>
        <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </>
  );

  const shell =
    "group flex h-full w-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50";

  if (!href) {
    return <article className={shell}>{body}</article>;
  }

  return (
    <Link
      href={href}
      className={`${shell} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
    >
      {body}
    </Link>
  );
}
