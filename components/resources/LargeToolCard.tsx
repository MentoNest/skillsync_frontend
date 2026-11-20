import Link from "next/link";
import type { ReactNode } from "react";

export type LargeToolCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  button: { label: string; href: string };
  background?: string;
  className?: string;
};

export default function LargeToolCard({
  icon,
  title,
  description,
  button,
  background = "bg-gradient-to-br from-purple-700 to-indigo-600",
  className = "",
}: LargeToolCardProps) {
  return (
    <article className={`flex h-full flex-col rounded-2xl p-6 text-white shadow-sm transition hover:shadow-lg ${background} ${className}`}>
      <div aria-hidden="true" className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-white/80">{description}</p>
      <Link
        href={button.href}
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {button.label}
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3H3.5a1 1 0 1 1 0-2h7.1L7.3 5.7a1 1 0 0 1 0-1.4Z" />
        </svg>
      </Link>
    </article>
  );
}
