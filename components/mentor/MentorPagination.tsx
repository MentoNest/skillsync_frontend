// Mentor listing pagination (#850)
"use client";
import React from "react";

interface MentorPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MentorPagination = ({ currentPage, totalPages, onPageChange }: MentorPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Mentor listing pages">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
            page === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};

export default MentorPagination;
