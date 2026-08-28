// Mentor profile page route — /mentors/[id] (#849)
import React from "react";

interface MentorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { id } = await params;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-sm text-gray-400 mb-4">Mentor ID: {id}</p>
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
        <p className="text-lg font-medium">Mentor profile coming soon.</p>
      </div>
    </main>
  );
}
