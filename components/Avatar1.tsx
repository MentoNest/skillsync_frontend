import React, { useState } from "react";

/**
 * Avatar
 *
 * A reusable avatar component for discussion/community authors.
 *
 * - Renders a circular profile image when `src` is provided and loads successfully.
 * - Falls back to the author's initials (on a deterministic color background)
 *   when `src` is missing, empty, or fails to load.
 * - Responsive sizing via the `size` prop (accepts a token or a raw number in px).
 *
 * Usage:
 *   <Avatar name="Ada Lovelace" src={author.avatarUrl} size="md" />
 *   <Avatar name="Grace Hopper" size={56} />
 */

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

export interface AvatarProps {
  /** Full display name, used to derive fallback initials and alt text. */
  name: string;
  /** Profile image URL. If omitted/empty/broken, initials are shown instead. */
  src?: string | null;
  /** Size token (xs/sm/md/lg/xl) or a custom pixel number. Default: "md". */
  size?: AvatarSize;
  /** Optional extra class names for layout/spacing from the parent. */
  className?: string;
  /** Optional ring/border color override (defaults to a subtle neutral). */
  ringColor?: string;
}

const SIZE_MAP: Record<Exclude<AvatarSize, number>, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

// A small, pleasant palette for deterministic initials backgrounds.
const PALETTE = [
  "#F97066", // coral
  "#F79009", // amber
  "#7A5AF8", // purple
  "#2E90FA", // blue
  "#12B76A", // green
  "#EE46BC", // pink
  "#06AED4", // teal
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE.length;
  return PALETTE[index];
}

function resolveSize(size: AvatarSize): number {
  return typeof size === "number" ? size : SIZE_MAP[size] ?? SIZE_MAP.md;
}

export default function Avatar({
  name,
  src,
  size = "md",
  className = "",
  ringColor = "rgba(0, 0, 0, 0.08)",
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const px = resolveSize(size);
  const hasImage = Boolean(src) && !imageFailed;
  const initials = getInitials(name);
  const bgColor = getColorForName(name);

  const baseStyle: React.CSSProperties = {
    width: px,
    height: px,
    minWidth: px,
    minHeight: px,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    boxShadow: `0 0 0 1px ${ringColor}`,
    flexShrink: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    userSelect: "none",
  };

  if (hasImage) {
    return (
      <img
        src={src as string}
        alt={name}
        title={name}
        width={px}
        height={px}
        style={{ ...baseStyle, objectFit: "cover" }}
        className={className}
        onError={() => setImageFailed(true)}
        loading="lazy"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      title={name}
      style={{
        ...baseStyle,
        backgroundColor: bgColor,
        color: "#ffffff",
        fontWeight: 600,
        fontSize: Math.max(10, Math.round(px * 0.4)),
        lineHeight: 1,
      }}
      className={className}
    >
      {initials}
    </div>
  );
}