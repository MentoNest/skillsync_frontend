interface MentorProfilePageProps {
  params: { mentorId: string };
}

export default function MentorProfilePage({ params }: MentorProfilePageProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Mentor Profile
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        ID: {params.mentorId}
      </p>
    </main>
  );
}
