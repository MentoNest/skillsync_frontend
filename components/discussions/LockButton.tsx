"use client";

interface LockButtonProps {
  isLocked: boolean;
  onToggle: () => void;
  className?: string;
}

export default function LockButton({ isLocked, onToggle, className }: LockButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isLocked ? "Unlock discussion" : "Lock discussion"}
      aria-label={isLocked ? "Unlock discussion" : "Lock discussion"}
      aria-pressed={isLocked}
      className={className}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-bold transition-colors border ${
          isLocked
            ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            : "border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600"
        }`}
      >
        {isLocked ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1c-3.324 0-6 2.676-6 6v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
          </svg>
        )}
        {isLocked ? "Locked" : "Lock"}
      </span>
    </button>
  );
}
