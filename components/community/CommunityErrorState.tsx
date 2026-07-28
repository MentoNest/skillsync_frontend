'use client';

interface CommunityErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function CommunityErrorState({ message = 'Something went wrong loading discussions.', onRetry }: CommunityErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 rounded-full bg-red-100 p-3">
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-sm text-gray-700 mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="px-5 py-2.5 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors">
          Try Again
        </button>
      )}
    </div>
  );
}
