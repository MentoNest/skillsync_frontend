// Mentor skill tag pill (#846)
import React from "react";

interface MentorSkillTagProps {
  skill: string;
}

const MentorSkillTag = ({ skill }: MentorSkillTagProps) => (
  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
    {skill}
  </span>
);

export default React.memo(MentorSkillTag);
