"use client";

export interface StartDiscussionButtonProps {
  onClick: () => void;
  className?: string;
}

export default function StartDiscussionButton({
  onClick,
  className,
}: StartDiscussionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 ${className ?? ""}`}
    >
      Start a discussion
    </button>
  );
}
