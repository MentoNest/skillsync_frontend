"use client";

interface PinButtonProps {
  isPinned: boolean;
  onToggle: () => void;
  className?: string;
}

export default function PinButton({ isPinned, onToggle, className }: PinButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isPinned ? "Unpin discussion" : "Pin discussion"}
      aria-label={isPinned ? "Unpin discussion" : "Pin discussion"}
      aria-pressed={isPinned}
      className={className}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-bold transition-colors border ${
          isPinned
            ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            : "border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600"
        }`}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill={isPinned ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M14 4v6l2 3v2h-4v7h-2v-7H6v-2l2-3V4h6z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {isPinned ? "Pinned" : "Pin"}
      </span>
    </button>
  );
}
