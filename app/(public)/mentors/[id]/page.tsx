// Mentor profile page route — /mentors/[id] (#849)
import React from "react";
import FollowButton from "@/components/common/FollowButton";

interface MentorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { id } = await params;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm text-gray-400">Mentor ID: {id}</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Mentor profile</h1>
        </div>
        <FollowButton userId={id} userName="this mentor" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        <p className="text-lg font-medium">Mentor profile coming soon.</p>
      </div>
    </main>
  );
}
