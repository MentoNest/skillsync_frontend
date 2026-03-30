// components/learning/LearningTrackCard.tsx

'use client';

import Image from 'next/image';
import { Clock, BookOpen } from 'lucide-react';
import { SmartCategoryBadge } from '@/components/ui';
import { ReportButton } from '@/components/moderation';

export interface LearningTrack {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  lessonCount: number;
  duration: string;
}

interface LearningTrackCardProps {
  track: LearningTrack;
  onStartLearning?: (trackId: string) => void;
}

export default function LearningTrackCard({ 
  track, 
  onStartLearning 
}: LearningTrackCardProps) {
  const handleStartClick = () => {
    if (onStartLearning) {
      onStartLearning(track.id);
    }
  };

  return (
    <article 
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
      aria-labelledby={`track-title-${track.id}`}
    >
      {/* Report Button (Top Right) */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <ReportButton
          reportableType="learning_track"
          reportableId={track.id}
          reportableTitle={track.title}
          variant="icon"
          size="sm"
        />
      </div>

      {/* Image Container with Proper Aspect Ratio */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={track.image}
          alt={`Cover image for ${track.title} learning track`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <SmartCategoryBadge category={track.category} />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Title */}
        <h3 
          id={`track-title-${track.id}`}
          className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1"
        >
          {track.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {track.description}
        </p>

        {/* Metadata Section */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          {/* Lesson Count */}
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{track.lessonCount} lessons</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Start Learning Button */}
        <button
          onClick={handleStartClick}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2 text-sm"
          aria-label={`Start learning ${track.title}`}
        >
          Start Learning
        </button>
      </div>
    </article>
  );
}
