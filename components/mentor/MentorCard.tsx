// Mentor card component composing profile image, badge, rating, skills (#843)
import React from "react";
import type { Mentor } from "@/types/mentor";
import MentorProfileImage from "./MentorProfileImage";
import FeaturedBadge from "./FeaturedBadge";
import MentorRatingComponent from "./MentorRatingComponent";
import MentorSkillTag from "./MentorSkillTag";
import AvailabilityBadge from "./AvailabilityBadge";

interface MentorCardProps {
  mentor: Mentor;
  onViewProfile?: (id: string) => void;
  actions?: React.ReactNode;
}

const MentorCard = ({ mentor, onViewProfile, actions }: MentorCardProps) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
    <div className="flex items-start gap-3">
      <MentorProfileImage src={mentor.avatarUrl} name={mentor.name} size={56} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{mentor.name}</h3>
          {mentor.isFeatured && <FeaturedBadge />}
          <AvailabilityBadge status={mentor.availability} />
        </div>
        <p className="text-xs text-gray-500 truncate">{mentor.title}</p>
        <MentorRatingComponent rating={mentor.rating} reviewCount={mentor.reviewCount} />
      </div>
      {actions}
    </div>

    <div className="flex flex-wrap gap-1">
      {mentor.skills.slice(0, 4).map((skill) => (
        <MentorSkillTag key={skill.id} skill={skill.name} />
      ))}
    </div>

    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
      <span className="text-sm font-semibold text-gray-800">
        ${mentor.hourlyRate}<span className="text-xs font-normal text-gray-500">/hr</span>
      </span>
      <button
        onClick={() => onViewProfile?.(mentor.id)}
        className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >
        View Profile
      </button>
    </div>
  </div>
);

export default MentorCard;
