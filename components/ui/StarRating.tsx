interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { star: 16, text: 'text-xs', gap: 'gap-0.5' },
  md: { star: 20, text: 'text-sm', gap: 'gap-1' },
  lg: { star: 28, text: 'text-lg', gap: 'gap-1' },
};

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className = '',
}: StarRatingProps) {
  const { star: starSize, text: textSize, gap } = sizeMap[size];
  const stars = Array.from({ length: maxRating }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i));
    return fill;
  });

  return (
    <div
      className={`inline-flex items-center ${gap} ${className}`}
      role="img"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {stars.map((fill, i) => {
        const clipId = `star-clip-${i}-${rating.toString().replace('.', '-')}`;
        return (
          <svg
            key={i}
            width={starSize}
            height={starSize}
            viewBox="0 0 24 24"
            className="shrink-0"
            aria-hidden="true"
          >
            <defs>
              <clipPath id={clipId}>
                <rect x="0" y="0" width={24 * fill} height="24" />
              </clipPath>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#d1d5db"
            />
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#0891b2"
              clipPath={`url(#${clipId})`}
            />
          </svg>
        );
      })}
      {showValue && (
        <span className={`${textSize} font-semibold text-gray-700 dark:text-gray-300 ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
