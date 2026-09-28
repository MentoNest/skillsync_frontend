// Mentor listing pagination
"use client";
import React from "react";

interface MentorPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Maximum number of page buttons to show before using ellipsis. Default: 7 */
  maxVisiblePages?: number;
}

const MentorPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  maxVisiblePages = 7 
}: MentorPaginationProps) => {
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show
  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      // Show all pages if within limit
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;

    // Always show first page
    pages.push(1);

    if (showLeftEllipsis) {
      pages.push("...");
    } else if (leftSiblingIndex === 2) {
      pages.push(2);
    }

    // Show pages around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (showRightEllipsis) {
      pages.push("...");
    } else if (rightSiblingIndex === totalPages - 1) {
      pages.push(totalPages - 1);
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center gap-1 mt-8" aria-label="Mentor listing pages">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        ‹ Previous
      </button>

      <div className="flex items-center gap-1 mx-2">
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span 
                key={`ellipsis-${index}`} 
                className="px-2 text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              aria-current={pageNum === currentPage ? "page" : undefined}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                pageNum === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded-md border border-gray-300 disabled:opacity-40 hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        Next ›
      </button>
    </nav>
  );
};

export default MentorPagination;
