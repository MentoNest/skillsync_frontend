import React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;
export type IconComponent = React.ComponentType<IconProps>;

const baseProps: IconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const ArrowRightIcon = React.memo(function ArrowRightIcon(
  props: IconProps,
) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
});

export const ClockIcon = React.memo(function ClockIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
});

export const MentorIcon = React.memo(function MentorIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
});

export const ProjectIcon = React.memo(function ProjectIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
});

export const CommunityIcon = React.memo(function CommunityIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
});

export const ResumeIcon = React.memo(function ResumeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
});

export const CareerIcon = React.memo(function CareerIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
});

export const PathIcon = React.memo(function PathIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6" />
    </svg>
  );
});

export const SearchIcon = React.memo(function SearchIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
});

export const FileTextIcon = React.memo(function FileTextIcon(
  props: IconProps,
) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
});

export const PlayCircleIcon = React.memo(function PlayCircleIcon(
  props: IconProps,
) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </svg>
  );
});

export const BookOpenIcon = React.memo(function BookOpenIcon(
  props: IconProps,
) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
});

export const DownloadIcon = React.memo(function DownloadIcon(
  props: IconProps,
) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
});

export const TrendingUpIcon = React.memo(function TrendingUpIcon(
  props: IconProps,
) {
  return (
    <svg {...baseProps} {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
});

export type IconName =
  | "path"
  | "mentor"
  | "project"
  | "community";

export const benefitIcons: Record<IconName, React.ComponentType<IconProps>> = {
  path: PathIcon,
  mentor: MentorIcon,
  project: ProjectIcon,
  community: CommunityIcon,
};

