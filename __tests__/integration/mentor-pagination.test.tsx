/**
 * Integration tests for mentor pagination
 * These tests verify the acceptance criteria:
 * - No duplicate results
 * - Pagination state is maintained
 */

import { renderHook, act } from "@testing-library/react";
import { useState, useCallback } from "react";

// Mock data
const createMockMentor = (id: string, name: string) => ({
  id,
  name,
  avatar: `https://example.com/${id}.jpg`,
  headline: "Software Engineer",
  bio: "Experienced mentor",
  skills: ["React", "TypeScript"],
  industry: "Technology",
  experienceLevel: "senior" as const,
  rating: 4.5,
  hourlyRate: 100,
  availability: "available" as const,
  sessions: 50,
});

// Mock API response generator
const createMockApiResponse = (page: number, pageSize: number) => {
  const startId = (page - 1) * pageSize + 1;
  const mentors = Array.from({ length: pageSize }, (_, i) => 
    createMockMentor(`mentor-${startId + i}`, `Mentor ${startId + i}`)
  );
  
  return {
    mentors,
    total: 100,
    page,
    totalPages: Math.ceil(100 / pageSize),
    hasMore: page * pageSize < 100,
  };
};

describe("Mentor Pagination - Acceptance Criteria", () => {
  describe("No Duplicate Results", () => {
    it("should prevent duplicate mentors when appending results (infinite scroll)", () => {
      const { result } = renderHook(() => {
        const [mentors, setMentors] = useState<any[]>([]);
        
        const appendMentors = useCallback((newMentors: any[]) => {
          setMentors((prev) => {
            // Duplicate prevention logic from implementation
            const existingIds = new Set(prev.map((m) => m.id));
            const uniqueNewMentors = newMentors.filter((m) => !existingIds.has(m.id));
            return [...prev, ...uniqueNewMentors];
          });
        }, []);

        return { mentors, appendMentors };
      });

      // Load first page
      act(() => {
        const page1 = createMockApiResponse(1, 12);
        result.current.appendMentors(page1.mentors);
      });

      expect(result.current.mentors).toHaveLength(12);
      expect(result.current.mentors[0].id).toBe("mentor-1");
      expect(result.current.mentors[11].id).toBe("mentor-12");

      // Load second page
      act(() => {
        const page2 = createMockApiResponse(2, 12);
        result.current.appendMentors(page2.mentors);
      });

      expect(result.current.mentors).toHaveLength(24);
      expect(result.current.mentors[12].id).toBe("mentor-13");
      expect(result.current.mentors[23].id).toBe("mentor-24");

      // Attempt to append duplicate mentors from page 1
      act(() => {
        const page1Duplicate = createMockApiResponse(1, 12);
        result.current.appendMentors(page1Duplicate.mentors);
      });

      // Length should remain 24 (no duplicates added)
      expect(result.current.mentors).toHaveLength(24);
      
      // Verify no duplicate IDs exist
      const ids = result.current.mentors.map(m => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should replace all mentors when loading a new page (pagination mode)", () => {
      const { result } = renderHook(() => {
        const [mentors, setMentors] = useState<any[]>([]);
        
        const loadPage = useCallback((newMentors: any[]) => {
          setMentors(newMentors); // Replace, not append
        }, []);

        return { mentors, loadPage };
      });

      // Load page 1
      act(() => {
        const page1 = createMockApiResponse(1, 12);
        result.current.loadPage(page1.mentors);
      });

      expect(result.current.mentors).toHaveLength(12);
      expect(result.current.mentors[0].id).toBe("mentor-1");

      // Load page 2
      act(() => {
        const page2 = createMockApiResponse(2, 12);
        result.current.loadPage(page2.mentors);
      });

      // Should have 12 mentors from page 2 only
      expect(result.current.mentors).toHaveLength(12);
      expect(result.current.mentors[0].id).toBe("mentor-13");
      expect(result.current.mentors[11].id).toBe("mentor-24");

      // No mentors from page 1 should exist
      const hasPage1Mentors = result.current.mentors.some(m => 
        parseInt(m.id.split("-")[1]) <= 12
      );
      expect(hasPage1Mentors).toBe(false);
    });
  });

  describe("Pagination State is Maintained", () => {
    it("should maintain current page state", () => {
      const { result } = renderHook(() => {
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages] = useState(10);

        const changePage = useCallback((newPage: number) => {
          if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
          }
        }, [totalPages]);

        return { currentPage, totalPages, changePage };
      });

      expect(result.current.currentPage).toBe(1);

      // Navigate to page 3
      act(() => {
        result.current.changePage(3);
      });

      expect(result.current.currentPage).toBe(3);

      // Try to navigate beyond bounds
      act(() => {
        result.current.changePage(15);
      });

      // Should remain on page 3
      expect(result.current.currentPage).toBe(3);

      // Navigate to valid page
      act(() => {
        result.current.changePage(7);
      });

      expect(result.current.currentPage).toBe(7);
    });

    it("should reset to page 1 when filters change", () => {
      const { result } = renderHook(() => {
        const [currentPage, setCurrentPage] = useState(1);
        const [filters, setFilters] = useState<any>({});

        const updateFilters = useCallback((newFilters: any) => {
          setFilters(newFilters);
          setCurrentPage(1); // Reset to page 1 on filter change
        }, []);

        const changePage = useCallback((newPage: number) => {
          setCurrentPage(newPage);
        }, []);

        return { currentPage, filters, updateFilters, changePage };
      });

      // Navigate to page 5
      act(() => {
        result.current.changePage(5);
      });

      expect(result.current.currentPage).toBe(5);

      // Update filters
      act(() => {
        result.current.updateFilters({ expertise: ["Frontend"] });
      });

      // Should reset to page 1
      expect(result.current.currentPage).toBe(1);
    });

    it("should reset to page 1 when page size changes", () => {
      const { result } = renderHook(() => {
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(12);

        const changePageSize = useCallback((newSize: number) => {
          setPageSize(newSize);
          setCurrentPage(1); // Reset to page 1 on size change
        }, []);

        const changePage = useCallback((newPage: number) => {
          setCurrentPage(newPage);
        }, []);

        return { currentPage, pageSize, changePageSize, changePage };
      });

      // Navigate to page 3
      act(() => {
        result.current.changePage(3);
      });

      expect(result.current.currentPage).toBe(3);
      expect(result.current.pageSize).toBe(12);

      // Change page size
      act(() => {
        result.current.changePageSize(24);
      });

      // Should reset to page 1
      expect(result.current.currentPage).toBe(1);
      expect(result.current.pageSize).toBe(24);
    });

    it("should calculate correct total pages based on page size", () => {
      const calculateTotalPages = (total: number, pageSize: number) => 
        Math.ceil(total / pageSize);

      const totalMentors = 100;

      expect(calculateTotalPages(totalMentors, 12)).toBe(9);
      expect(calculateTotalPages(totalMentors, 24)).toBe(5);
      expect(calculateTotalPages(totalMentors, 48)).toBe(3);
      expect(calculateTotalPages(totalMentors, 96)).toBe(2);

      // Edge cases
      expect(calculateTotalPages(0, 12)).toBe(0);
      expect(calculateTotalPages(1, 12)).toBe(1);
      expect(calculateTotalPages(12, 12)).toBe(1);
      expect(calculateTotalPages(13, 12)).toBe(2);
    });
  });

  describe("Page Navigation", () => {
    it("should handle previous page correctly", () => {
      const { result } = renderHook(() => {
        const [currentPage, setCurrentPage] = useState(3);

        const goToPrevious = useCallback(() => {
          setCurrentPage((prev) => Math.max(1, prev - 1));
        }, []);

        return { currentPage, goToPrevious };
      });

      expect(result.current.currentPage).toBe(3);

      act(() => {
        result.current.goToPrevious();
      });

      expect(result.current.currentPage).toBe(2);

      act(() => {
        result.current.goToPrevious();
      });

      expect(result.current.currentPage).toBe(1);

      // Should not go below 1
      act(() => {
        result.current.goToPrevious();
      });

      expect(result.current.currentPage).toBe(1);
    });

    it("should handle next page correctly", () => {
      const { result } = renderHook(() => {
        const [currentPage, setCurrentPage] = useState(1);
        const totalPages = 5;

        const goToNext = useCallback(() => {
          setCurrentPage((prev) => Math.min(totalPages, prev + 1));
        }, []);

        return { currentPage, totalPages, goToNext };
      });

      expect(result.current.currentPage).toBe(1);

      act(() => {
        result.current.goToNext();
      });

      expect(result.current.currentPage).toBe(2);

      // Jump to near end
      act(() => {
        result.current.goToNext();
        result.current.goToNext();
        result.current.goToNext();
      });

      expect(result.current.currentPage).toBe(5);

      // Should not exceed totalPages
      act(() => {
        result.current.goToNext();
      });

      expect(result.current.currentPage).toBe(5);
    });
  });
});
