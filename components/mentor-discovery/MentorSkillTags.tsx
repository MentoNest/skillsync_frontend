"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface MentorSkillTagsProps {
  /** Skills to render. Non-strings, blanks and duplicates are dropped. */
  skills?: readonly (string | null | undefined)[] | null;
  /** Used to build the group's accessible label, e.g. "Sarah's skills". */
  mentorName?: string;
  /** How many tags to show before the overflow control. Default 4. */
  maxVisible?: number;
  /** Let the overflow control reveal the remaining tags in place. Default true. */
  expandable?: boolean;
  size?: "sm" | "md";
  /** Hard ceiling on accepted skills, guarding against unbounded input. */
  limit?: number;
  className?: string;
  tagClassName?: string;
}

const DEFAULT_MAX_VISIBLE = 4;
const DEFAULT_LIMIT = 50;

const SIZE_CLASSES = {
  sm: "text-xs px-2.5 py-1",
  md: "text-sm px-3 py-1.5",
} as const;

/**
 * Drops blanks, non-strings and case-insensitive duplicates so the tag count
 * — and therefore the overflow count — always reflects real, distinct skills.
 */
function normalizeSkills(
  skills: MentorSkillTagsProps["skills"],
  limit: number
): string[] {
  if (!Array.isArray(skills)) return [];

  const seen = new Set<string>();
  const result: string[] = [];

  for (const skill of skills) {
    if (typeof skill !== "string") continue;

    const value = skill.trim().replace(/\s+/g, " ");
    if (!value) continue;

    const key = value.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(value);

    if (result.length >= limit) break;
  }

  return result;
}

export function MentorSkillTags({
  skills,
  mentorName,
  maxVisible = DEFAULT_MAX_VISIBLE,
  expandable = true,
  size = "sm",
  limit = DEFAULT_LIMIT,
  className,
  tagClassName,
}: MentorSkillTagsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const listId = useId();

  const normalized = normalizeSkills(skills, Math.max(1, limit));

  if (normalized.length === 0) return null;

  const visibleCount = Math.min(
    Math.max(0, maxVisible),
    normalized.length
  );
  const hiddenCount = normalized.length - visibleCount;
  const isOverflowing = hiddenCount > 0;
  const isShowingAll = isExpanded || !isOverflowing;

  const visibleSkills = isShowingAll
    ? normalized
    : normalized.slice(0, visibleCount);

  const label = mentorName ? `${mentorName}'s skills` : "Skills";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <ul
        id={listId}
        aria-label={label}
        className="flex flex-wrap gap-2 min-w-0"
      >
        {visibleSkills.map((skill) => (
          <li
            key={skill}
            className={cn(
              "rounded-full bg-slate-100 text-slate-700 font-medium",
              "max-w-full break-words",
              SIZE_CLASSES[size],
              tagClassName
            )}
          >
            {skill}
          </li>
        ))}
      </ul>

      {isOverflowing &&
        (expandable ? (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-controls={listId}
            className={cn(
              "shrink-0 rounded-full bg-slate-100 text-slate-500 font-medium",
              "hover:bg-slate-200 hover:text-slate-700",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              "transition-colors",
              SIZE_CLASSES[size]
            )}
          >
            {isExpanded ? "Show less" : `+${hiddenCount} more`}
            {!isExpanded && <span className="sr-only"> {label}</span>}
          </button>
        ) : (
          <span
            className={cn(
              "shrink-0 rounded-full bg-slate-100 text-slate-500 font-medium",
              SIZE_CLASSES[size]
            )}
          >
            +{hiddenCount} more
          </span>
        ))}
    </div>
  );
}

export default MentorSkillTags;
