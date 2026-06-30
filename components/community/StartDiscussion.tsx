'use client';

interface Props {
  onCreateDiscussion: () => void;
  disabled?: boolean;
}

export default function StartDiscussion({ onCreateDiscussion, disabled }: Props) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Start a Discussion</h3>
          <p className="mt-1 text-sm text-cyan-100">
            Share your thoughts, ask questions, or start a conversation with the community.
          </p>
        </div>
        <button
          onClick={onCreateDiscussion}
          disabled={disabled}
          className={`shrink-0 ml-4 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            disabled
              ? 'bg-white/30 text-white/50 cursor-not-allowed'
              : 'bg-white text-cyan-700 hover:bg-cyan-50'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Discussion
          </span>
        </button>
      </div>
    </div>
  );
}
