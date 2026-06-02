import React, { memo } from 'react';

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

export const DocumentIcon = memo(({ className = 'h-6 w-6', strokeWidth = 2 }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
));
DocumentIcon.displayName = 'DocumentIcon';

export const PlayIcon = memo(({ className = 'h-6 w-6', strokeWidth = 2 }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
));
PlayIcon.displayName = 'PlayIcon';

export const MapIcon = memo(({ className = 'h-6 w-6', strokeWidth = 2 }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
));
MapIcon.displayName = 'MapIcon';

export const DownloadIcon = memo(({ className = 'h-6 w-6', strokeWidth = 2 }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
));
DownloadIcon.displayName = 'DownloadIcon';

export const MenuIcon = memo(({ className = 'h-6 w-6', strokeWidth = 2 }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
));
MenuIcon.displayName = 'MenuIcon';

export const XIcon = memo(({ className = 'h-6 w-6', strokeWidth = 2 }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
XIcon.displayName = 'XIcon';

export const ChevronDownIcon = memo(({ className = 'h-6 w-6', strokeWidth = 2 }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
));
ChevronDownIcon.displayName = 'ChevronDownIcon';
