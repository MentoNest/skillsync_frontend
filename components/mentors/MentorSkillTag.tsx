interface MentorSkillTagProps {
  skill: string;
  className?: string;
}

export default function MentorSkillTag({ skill, className = '' }: MentorSkillTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-medium bg-[#f7f5f2] text-[#6b6860] border border-[rgba(20,18,16,0.08)] ${className}`}
    >
      {skill}
    </span>
  );
}
