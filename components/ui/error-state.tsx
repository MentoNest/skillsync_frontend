import { Button } from './button';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  className?: string;
}

export function ErrorState({ 
  message = 'Something went wrong. Please try again.', 
  onRetry, 
  className = '' 
}: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="mb-4 rounded-full bg-red-100 p-3">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className="mb-6 text-gray-700">{message}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}