'use client';

interface CommunityEmptyStateProps {
  type?: 'discussions' | 'search' | 'category';
  onAction?: () => void;
}

const configs = {
  discussions: {
    heading: 'No discussions yet',
    text: 'Be the first to start a conversation in this community.',
    cta: 'Start Discussion',
  },
  search: {
    heading: 'No results found',
    text: 'Try adjusting your search or filters to find what you\'re looking for.',
    cta: undefined,
  },
  category: {
    heading: 'No discussions in this category',
    text: 'Check back later or explore other categories.',
    cta: 'View All Discussions',
  },
};

export default function CommunityEmptyState({ type = 'discussions', onAction }: CommunityEmptyStateProps) {
  const config = configs[type];
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{config.heading}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{config.text}</p>
      {config.cta && onAction && (
        <button onClick={onAction} className="px-5 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors">
          {config.cta}
        </button>
      )}
    </div>
  );
}
