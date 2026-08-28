// Loading skeleton for mentor card while data is fetching (#852)
import React from "react";

const MentorCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm animate-pulse flex flex-col gap-3">
    <div className="flex items-start gap-3">
      <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
    <div className="flex gap-2">
      <div className="h-5 bg-gray-200 rounded-full w-16" />
      <div className="h-5 bg-gray-200 rounded-full w-20" />
      <div className="h-5 bg-gray-200 rounded-full w-14" />
    </div>
    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
      <div className="h-4 bg-gray-200 rounded w-16" />
      <div className="h-7 bg-gray-200 rounded-lg w-24" />
    </div>
  </div>
);

interface MentorCardSkeletonListProps {
  count?: number;
}

export const MentorCardSkeletonList = ({ count = 6 }: MentorCardSkeletonListProps) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <MentorCardSkeleton key={i} />
    ))}
  </>
);

export default MentorCardSkeleton;
