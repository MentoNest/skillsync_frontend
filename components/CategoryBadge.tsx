interface CategoryBadgeProps {
  category: string
  backgroundColor?: string
  textColor?: string
  className?: string
}

function normalizeHexColor(color: string) {
  const hex = color.trim()
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    if (hex.length === 4) {
      return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    }
    return hex
  }
  return ''
}

function getContrastingTextColor(color: string) {
  const hex = normalizeHexColor(color)
  if (!hex) {
    return '#fff'
  }

  const red = parseInt(hex.slice(1, 3), 16)
  const green = parseInt(hex.slice(3, 5), 16)
  const blue = parseInt(hex.slice(5, 7), 16)

  const brightness = (red * 299 + green * 587 + blue * 114) / 1000
  return brightness > 160 ? '#0f172a' : '#fff'
}

export default function CategoryBadge({
  category,
  backgroundColor = '#dbeafe',
  textColor,
  className = '',
}: CategoryBadgeProps) {
  const badgeTextColor = textColor ?? getContrastingTextColor(backgroundColor)

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${className}`}
      style={{ backgroundColor, color: badgeTextColor }}
    >
      {category}
    </span>
  )
}
