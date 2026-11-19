"use client";

interface ExperienceLevelFilterProps {
  selectedLevels: string[];
  onChange: (levels: string[]) => void;
  /**
   * Options to offer, as `{ value, label }` pairs.
   *
   * Defaults to `EXPERIENCE_LEVELS` (Junior / Mid-Level / Senior / Executive),
   * but callers must be able to pass their own set: the discovery sidebar uses a
   * different, app-wide vocabulary (`junior`/`mid`/`senior`/`lead`/`principal`)
   * that is also what `MentorFilters.experience`, the URL filter state and the
   * mentor profile page's `MENTOR_EXPERIENCE_LABELS` all speak. Hardcoding one
   * list here is what left this component rendered nowhere while the sidebar grew
   * its own third copy of the control.
   */
  options?: readonly { value: string; label: string }[];
  /**
   * `"list"` stacks the options vertically (desktop sidebar); `"pills"` wraps
   * them as tappable chips (mobile drawer). Mirrors `MentorFilterSidebar`'s own
   * variant so this control matches its neighbours in whichever layout it is
   * rendered into.
   */
  variant?: "list" | "pills";
}

export const EXPERIENCE_LEVELS = [
  { value: "junior", label: "Junior" },
  { value: "mid-level", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "executive", label: "Executive" },
] as const;

export default function ExperienceLevelFilter({
  selectedLevels,
  onChange,
  options = EXPERIENCE_LEVELS,
  variant = "list",
}: ExperienceLevelFilterProps) {
  const handleToggle = (level: string) => {
    if (selectedLevels.includes(level)) {
      onChange(selectedLevels.filter((l) => l !== level));
    } else {
      onChange([...selectedLevels, level]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        Experience Level
      </h3>
      <div className={variant === "pills" ? "flex flex-wrap gap-2" : "space-y-2"}>
        {options.map(({ value, label }) => (
          <label
            key={value}
            className={
              variant === "pills"
                ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                : "flex items-center gap-2 cursor-pointer group"
            }
          >
            <input
              type="checkbox"
              checked={selectedLevels.includes(value)}
              onChange={() => handleToggle(value)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-offset-0"
              aria-label={`Filter by ${label} experience level`}
            />
            <span
              className={
                variant === "pills"
                  ? "text-sm"
                  : "text-sm text-slate-700 group-hover:text-slate-900 transition-colors"
              }
            >
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
