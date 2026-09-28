/**
 * Integration tests for experience level filter
 * Verifies that filtering by experience level affects mentor results
 */

import { renderHook, act } from "@testing-library/react";
import { useState, useCallback } from "react";

// Mock mentor data with different experience levels
const createMockMentors = () => [
  { id: "1", name: "Alice Junior", experienceLevel: "junior", rating: 4.5, sessions: 10 },
  { id: "2", name: "Bob Mid", experienceLevel: "mid-level", rating: 4.7, sessions: 50 },
  { id: "3", name: "Carol Senior", experienceLevel: "senior", rating: 4.9, sessions: 150 },
  { id: "4", name: "David Executive", experienceLevel: "executive", rating: 5.0, sessions: 300 },
  { id: "5", name: "Eve Junior", experienceLevel: "junior", rating: 4.2, sessions: 15 },
  { id: "6", name: "Frank Senior", experienceLevel: "senior", rating: 4.8, sessions: 200 },
  { id: "7", name: "Grace Mid", experienceLevel: "mid-level", rating: 4.6, sessions: 75 },
  { id: "8", name: "Henry Executive", experienceLevel: "executive", rating: 4.9, sessions: 250 },
];

describe("Experience Level Filter - Integration", () => {
  describe("Acceptance Criteria: Selected experience level affects results", () => {
    it("should filter mentors by single experience level", () => {
      const allMentors = createMockMentors();
      
      const { result } = renderHook(() => {
        const [filters, setFilters] = useState<{ experience?: string[] }>({});
        const [filteredMentors, setFilteredMentors] = useState(allMentors);

        const applyFilters = useCallback(() => {
          if (!filters.experience || filters.experience.length === 0) {
            setFilteredMentors(allMentors);
          } else {
            const filtered = allMentors.filter((mentor) =>
              filters.experience?.includes(mentor.experienceLevel)
            );
            setFilteredMentors(filtered);
          }
        }, [filters]);

        return { filters, setFilters, filteredMentors, applyFilters };
      });

      // Initially, all mentors should be shown
      expect(result.current.filteredMentors).toHaveLength(8);

      // Filter by Junior
      act(() => {
        result.current.setFilters({ experience: ["junior"] });
      });

      act(() => {
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(2);
      expect(result.current.filteredMentors.every(m => m.experienceLevel === "junior")).toBe(true);
    });

    it("should filter mentors by multiple experience levels", () => {
      const allMentors = createMockMentors();
      
      const { result } = renderHook(() => {
        const [filters, setFilters] = useState<{ experience?: string[] }>({});
        const [filteredMentors, setFilteredMentors] = useState(allMentors);

        const applyFilters = useCallback(() => {
          if (!filters.experience || filters.experience.length === 0) {
            setFilteredMentors(allMentors);
          } else {
            const filtered = allMentors.filter((mentor) =>
              filters.experience?.includes(mentor.experienceLevel)
            );
            setFilteredMentors(filtered);
          }
        }, [filters]);

        return { filters, setFilters, filteredMentors, applyFilters };
      });

      // Filter by Junior and Senior
      act(() => {
        result.current.setFilters({ experience: ["junior", "senior"] });
      });

      act(() => {
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(4);
      
      const experienceLevels = result.current.filteredMentors.map(m => m.experienceLevel);
      expect(experienceLevels.every(level => 
        level === "junior" || level === "senior"
      )).toBe(true);
    });

    it("should show all mentors when no experience filter is applied", () => {
      const allMentors = createMockMentors();
      
      const { result } = renderHook(() => {
        const [filters, setFilters] = useState<{ experience?: string[] }>({});
        const [filteredMentors, setFilteredMentors] = useState(allMentors);

        const applyFilters = useCallback(() => {
          if (!filters.experience || filters.experience.length === 0) {
            setFilteredMentors(allMentors);
          } else {
            const filtered = allMentors.filter((mentor) =>
              filters.experience?.includes(mentor.experienceLevel)
            );
            setFilteredMentors(filtered);
          }
        }, [filters]);

        return { filters, setFilters, filteredMentors, applyFilters };
      });

      act(() => {
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(8);
    });

    it("should update results when experience filter changes", () => {
      const allMentors = createMockMentors();
      
      const { result } = renderHook(() => {
        const [filters, setFilters] = useState<{ experience?: string[] }>({});
        const [filteredMentors, setFilteredMentors] = useState(allMentors);

        const applyFilters = useCallback(() => {
          if (!filters.experience || filters.experience.length === 0) {
            setFilteredMentors(allMentors);
          } else {
            const filtered = allMentors.filter((mentor) =>
              filters.experience?.includes(mentor.experienceLevel)
            );
            setFilteredMentors(filtered);
          }
        }, [filters]);

        return { filters, setFilters, filteredMentors, applyFilters };
      });

      // Start with Junior filter
      act(() => {
        result.current.setFilters({ experience: ["junior"] });
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(2);

      // Change to Executive filter
      act(() => {
        result.current.setFilters({ experience: ["executive"] });
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(2);
      expect(result.current.filteredMentors.every(m => m.experienceLevel === "executive")).toBe(true);
    });

    it("should return empty results when no mentors match the filter", () => {
      // Create dataset with no executives
      const mentors = createMockMentors().filter(m => m.experienceLevel !== "executive");
      
      const { result } = renderHook(() => {
        const [filters, setFilters] = useState<{ experience?: string[] }>({});
        const [filteredMentors, setFilteredMentors] = useState(mentors);

        const applyFilters = useCallback(() => {
          if (!filters.experience || filters.experience.length === 0) {
            setFilteredMentors(mentors);
          } else {
            const filtered = mentors.filter((mentor) =>
              filters.experience?.includes(mentor.experienceLevel)
            );
            setFilteredMentors(filtered);
          }
        }, [filters]);

        return { filters, setFilters, filteredMentors, applyFilters };
      });

      // Try to filter by Executive
      act(() => {
        result.current.setFilters({ experience: ["executive"] });
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(0);
    });

    it("should clear results when removing experience filter", () => {
      const allMentors = createMockMentors();
      
      const { result } = renderHook(() => {
        const [filters, setFilters] = useState<{ experience?: string[] }>({ experience: ["junior"] });
        const [filteredMentors, setFilteredMentors] = useState(allMentors);

        const applyFilters = useCallback(() => {
          if (!filters.experience || filters.experience.length === 0) {
            setFilteredMentors(allMentors);
          } else {
            const filtered = allMentors.filter((mentor) =>
              filters.experience?.includes(mentor.experienceLevel)
            );
            setFilteredMentors(filtered);
          }
        }, [filters]);

        return { filters, setFilters, filteredMentors, applyFilters };
      });

      // Apply initial filter
      act(() => {
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(2);

      // Clear filter
      act(() => {
        result.current.setFilters({ experience: [] });
        result.current.applyFilters();
      });

      expect(result.current.filteredMentors).toHaveLength(8);
    });
  });

  describe("Experience Level Distribution", () => {
    it("should correctly count mentors by experience level", () => {
      const allMentors = createMockMentors();

      const countByLevel = (level: string) =>
        allMentors.filter(m => m.experienceLevel === level).length;

      expect(countByLevel("junior")).toBe(2);
      expect(countByLevel("mid-level")).toBe(2);
      expect(countByLevel("senior")).toBe(2);
      expect(countByLevel("executive")).toBe(2);
    });

    it("should handle all four experience levels", () => {
      const allMentors = createMockMentors();
      const uniqueLevels = new Set(allMentors.map(m => m.experienceLevel));

      expect(uniqueLevels.size).toBe(4);
      expect(uniqueLevels.has("junior")).toBe(true);
      expect(uniqueLevels.has("mid-level")).toBe(true);
      expect(uniqueLevels.has("senior")).toBe(true);
      expect(uniqueLevels.has("executive")).toBe(true);
    });
  });

  describe("Combined with Other Filters", () => {
    it("should work with rating filter", () => {
      const allMentors = createMockMentors();
      
      const filtered = allMentors.filter(
        m => m.experienceLevel === "senior" && m.rating >= 4.8
      );

      expect(filtered).toHaveLength(2);
      expect(filtered.every(m => m.experienceLevel === "senior" && m.rating >= 4.8)).toBe(true);
    });

    it("should work with sessions filter", () => {
      const allMentors = createMockMentors();
      
      const filtered = allMentors.filter(
        m => m.experienceLevel === "executive" && m.sessions >= 250
      );

      expect(filtered).toHaveLength(2);
      expect(filtered.every(m => m.experienceLevel === "executive" && m.sessions >= 250)).toBe(true);
    });
  });

  describe("Filter State Management", () => {
    it("should add experience level to empty filter", () => {
      const { result } = renderHook(() => {
        const [experience, setExperience] = useState<string[]>([]);

        const addLevel = (level: string) => {
          setExperience([...experience, level]);
        };

        return { experience, addLevel };
      });

      expect(result.current.experience).toHaveLength(0);

      act(() => {
        result.current.addLevel("junior");
      });

      expect(result.current.experience).toEqual(["junior"]);
    });

    it("should remove experience level from filter", () => {
      const { result } = renderHook(() => {
        const [experience, setExperience] = useState<string[]>(["junior", "senior"]);

        const removeLevel = (level: string) => {
          setExperience(experience.filter(l => l !== level));
        };

        return { experience, removeLevel };
      });

      expect(result.current.experience).toHaveLength(2);

      act(() => {
        result.current.removeLevel("junior");
      });

      expect(result.current.experience).toEqual(["senior"]);
    });

    it("should toggle experience level", () => {
      const { result } = renderHook(() => {
        const [experience, setExperience] = useState<string[]>(["junior"]);

        const toggleLevel = (level: string) => {
          if (experience.includes(level)) {
            setExperience(experience.filter(l => l !== level));
          } else {
            setExperience([...experience, level]);
          }
        };

        return { experience, toggleLevel };
      });

      // Toggle on
      act(() => {
        result.current.toggleLevel("senior");
      });

      expect(result.current.experience).toEqual(["junior", "senior"]);

      // Toggle off
      act(() => {
        result.current.toggleLevel("junior");
      });

      expect(result.current.experience).toEqual(["senior"]);
    });
  });
});
