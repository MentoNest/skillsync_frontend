import { Button } from './button';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  loadingText?: string;
  defaultText?: string;
}

export function LoadMoreButton({
  onClick,
  isLoading = false,
  disabled = false,
  className = '',
  loadingText = 'Loading...',
  defaultText = 'Load More Discussions'
}: LoadMoreButtonProps) {
  return (
    <div className={`flex justify-center py-8 ${className}`}>
      <Button
        onClick={onClick}
        disabled={isLoading || disabled}
        variant="secondary"
        className="min-w-[200px] justify-center"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText}
          </span>
        ) : (
          defaultText
        )}
      </Button>
    </div>
  );
}