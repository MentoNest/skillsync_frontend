// Mentor rating display with star icons and review count (#845)
import React from "react";

interface MentorRatingComponentProps {
  rating: number;
  reviewCount: number;
}

const MentorRatingComponent = ({ rating, reviewCount }: MentorRatingComponentProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {stars.map((star) => (
        <span
          key={star}
          className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 ml-1">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
};

export default MentorRatingComponent;
