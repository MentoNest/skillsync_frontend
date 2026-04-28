import { Metadata } from 'next';
import LearningTrackCard from '@/components/LearningTrackCard';

export const metadata: Metadata = {
  title: 'Learning Tracks | SkillSync',
  description: 'Browse all learning tracks on SkillSync.',
};

const tracks = [
  {
    id: '1',
    imageSrc: '/learning-tracks/full-stack.svg',
    title: 'Full-Stack Development',
    description: 'Master frontend and backend technologies to build complete web applications.',
    category: 'Development',
    lessonCount: 24,
    duration: '12 weeks',
  },
  {
    id: '2',
    imageSrc: '/learning-tracks/data-science.svg',
    title: 'Data Science & AI',
    description: 'Learn Python, machine learning, and data visualization techniques.',
    category: 'Data Science',
    lessonCount: 30,
    duration: '16 weeks',
  },
  {
    id: '3',
    imageSrc: '/learning-tracks/design.svg',
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and seamless user experiences.',
    category: 'Design',
    lessonCount: 18,
    duration: '10 weeks',
  },
];

export default function TracksPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Learning Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <LearningTrackCard
            key={track.id}
            category={track.category}
            title={track.title}
            description={track.description}
            lessonCount={track.lessonCount}
            duration={track.duration}
            href={`/learning/${track.id}`}
            imageSrc={track.imageSrc}
          />
        ))}
      </div>
    </main>
  );
}
