
import React from 'react';

interface MentorSkillTagProps {
  skill: string;
}

const MentorSkillTag: React.FC<MentorSkillTagProps> = ({ skill }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700/60 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300">
      {skill}
    </span>
  );
};

export default MentorSkillTag;