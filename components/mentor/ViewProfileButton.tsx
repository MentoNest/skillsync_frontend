// View Profile button for mentor cards — navigates to profile route (#848)
"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface ViewProfileButtonProps {
  mentorId: string;
}

const ViewProfileButton = ({ mentorId }: ViewProfileButtonProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/mentors/${mentorId}`)}
      className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
    >
      View Profile
    </button>
  );
};

export default ViewProfileButton;
