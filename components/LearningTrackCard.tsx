import Image from 'next/image';

interface LearningTrackCardProps {
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  lessonCount: number;
  duration: string;
}

export default function LearningTrackCard({
  imageUrl,
  category,
  title,
  description,
  lessonCount,
  duration,
}: LearningTrackCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow overflow-hidden flex flex-col">
      <div className="relative w-full aspect-video">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-2">
          {category}
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{lessonCount} lessons</span>
          <span>{duration}</span>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors">
          Start Learning
        </button>
      </div>
    </div>
  );
}
