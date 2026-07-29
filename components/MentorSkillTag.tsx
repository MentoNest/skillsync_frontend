import React from "react";

export type SkillTagVariant =
  "cyan" | "purple" | "emerald" | "gray" | "outline" | "default";

export interface MentorSkillTagProps {
  skill: string;
  variant?: SkillTagVariant;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<SkillTagVariant, string> = {
  cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800/50",
  purple:
    "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-100 dark:border-purple-800/50",
  emerald:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/50",
  gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
  outline:
    "bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800",
  default:
    "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800/50",
};

export const MentorSkillTag: React.FC<MentorSkillTagProps> = ({
  skill,
  variant = "cyan",
  className = "",
  onClick,
}) => {
  const styles = variantStyles[variant] || variantStyles.cyan;
  const isClickable = Boolean(onClick);

  return (
    <span
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${styles} ${
        isClickable ? "cursor-pointer hover:scale-105 active:scale-95" : ""
      } ${className}`}
    >
      {skill}
    </span>
  );
};

export default MentorSkillTag;
