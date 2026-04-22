// components/learning/LearningTrackGrid.tsx

'use client';

import LearningTrackCard, { LearningTrack } from './LearningTrackCard';

const sampleTracks: LearningTrack[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&q=80',
    category: 'Web Development',
    title: 'Full-Stack Web Development',
    description: 'Master modern web development with React, Node.js, and TypeScript from scratch.',
    lessonCount: 42,
    duration: '12 weeks',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80',
    category: 'Data Science',
    title: 'Python for Data Science',
    description: 'Learn data analysis, visualization, and machine learning with Python.',
    lessonCount: 35,
    duration: '10 weeks',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&q=80',
    category: 'Design',
    title: 'UI/UX Design Fundamentals',
    description: 'Create beautiful user interfaces and experiences with design principles.',
    lessonCount: 28,
    duration: '8 weeks',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&q=80',
    category: 'Leadership',
    title: 'Agile Project Management',
    description: 'Lead teams effectively with agile methodologies and best practices.',
    lessonCount: 24,
    duration: '6 weeks',
  },
];

interface LearningTrackGridProps {
  tracks?: LearningTrack[];
  onTrackStart?: (trackId: string) => void;
}

export default function LearningTrackGrid({ 
  tracks = sampleTracks, 
  onTrackStart 
}: LearningTrackGridProps) {
  return (
    <section className="py-12 bg-gray-50" aria-labelledby="learning-tracks-heading">
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          id="learning-tracks-heading"
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Explore Learning Tracks
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <LearningTrackCard
              key={track.id}
              track={track}
              onStartLearning={onTrackStart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
