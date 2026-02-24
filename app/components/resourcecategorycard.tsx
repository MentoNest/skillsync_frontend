import React from "react";
import { LucideIcon, ArrowUpRight } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ResourceCategoryCardProps {
  /** Lucide icon component to display */
  icon: LucideIcon;
  /** Card heading */
  title: string;
  /** Short description of the resource */
  description: string;
  /** Navigation target */
  link: string;
  /** Optional accessible label for the link (falls back to title) */
  linkLabel?: string;
  /** Optional CSS class overrides */
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export function ResourceCategoryCard({
  icon: Icon,
  title,
  description,
  link,
  linkLabel,
  className = "",
}: ResourceCategoryCardProps) {
  return (
    <a
      href={link}
      aria-label={linkLabel ?? title}
      className={[
        // Layout
        "group relative flex flex-col gap-3 p-5 rounded-lg",
        // Colors — driven by your CSS custom properties via Tailwind v4 theme
        "bg-card text-card-foreground border border-border",
        // Interaction
        "transition-all duration-200",
        "hover:shadow-md hover:border-ring hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      ].join(" ")}
    >
      {/* Icon container */}
      <span
        className={[
          "inline-flex items-center justify-center",
          "w-10 h-10 rounded-md",
          "bg-muted text-muted-foreground",
          "transition-colors duration-200",
          "group-hover:bg-primary group-hover:text-primary-foreground",
        ].join(" ")}
        aria-hidden="true"
      >
        <Icon size={20} strokeWidth={1.75} />
      </span>

      {/* Text */}
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>

      {/* Arrow indicator — fades in on hover */}
      <span
        className={[
          "absolute top-4 right-4",
          "text-muted-foreground opacity-0",
          "transition-opacity duration-200",
          "group-hover:opacity-100",
        ].join(" ")}
        aria-hidden="true"
      >
        <ArrowUpRight size={16} />
      </span>
    </a>
  );
}

export default ResourceCategoryCard;
