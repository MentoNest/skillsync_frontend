import React from "react";

/**
 * CategoryBadge
 * A reusable badge component for representing discussion categories,
 * with colors assigned dynamically based on the category name.
 *
 * Usage:
 *   <CategoryBadge category="Career Growth" />
 *   <CategoryBadge category="Leadership" />
 *
 * If you want to force a specific color instead of the auto-generated one,
 * pass a `color` prop matching one of the keys in COLOR_MAP (e.g. "teal").
 */

const COLOR_MAP = {
  purple: { bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC" },
  teal: { bg: "#E1F5EE", text: "#085041", border: "#5DCAA5" },
  coral: { bg: "#FAECE7", text: "#712B13", border: "#F0997B" },
  pink: { bg: "#FBEAF0", text: "#72243E", border: "#ED93B1" },
  blue: { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB" },
  green: { bg: "#EAF3DE", text: "#27500A", border: "#97C459" },
  amber: { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
  gray: { bg: "#F1EFE8", text: "#444441", border: "#B4B2A9" },
} as const;

type ColorKey = keyof typeof COLOR_MAP;
const COLOR_KEYS = Object.keys(COLOR_MAP) as ColorKey[];

function hashStringToColorKey(str: string): ColorKey {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const index = Math.abs(hash) % COLOR_KEYS.length;
  return COLOR_KEYS[index];
}

interface CategoryBadgeProps {
  category: string;
  color?: ColorKey;
  className?: string;
}

export default function CategoryBadge({
  category,
  color,
  className = "",
}: CategoryBadgeProps) {
  const colorKey: ColorKey =
    color && COLOR_MAP[color] ? color : hashStringToColorKey(category || "");
  const { bg, text, border } = COLOR_MAP[colorKey];

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: 500,
        backgroundColor: bg,
        color: text,
        border: `1px solid ${border}`,
        whiteSpace: "nowrap",
        lineHeight: 1.4,
      }}
    >
      {category}
    </span>
  );
}

export function CategoryBadgeDemo() {
  const categories = [
    "Career Growth",
    "Leadership",
    "Interview Prep",
    "Networking",
  ];

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: "16px" }}
    >
      {categories.map((cat) => (
        <CategoryBadge key={cat} category={cat} />
      ))}
    </div>
  );
}
