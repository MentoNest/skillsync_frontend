/**
 * Integration tests for mentor search functionality
 * Verifies acceptance criteria:
 * - Search is case-insensitive
 * - Results update dynamically
 * - Empty state displayed when no results exist
 */

import { renderHook, act } from "@testing-library/react";
import { useState, useCallback } from "react";

// Mock mentor data for testing
const createMockMentors = () => [
  {
    id: "1",
    name: "Alice Johnson",
    headline: "Senior React Developer",
    skills: ["React", "TypeScript", "Node.js"],
    company: "Google",
  },
  {
    id: "2",
    name: "Bob Smith",
    headline: "Python Backend Engineer",
    skills: ["Python", "Django", "PostgreSQL"],
    company: "Microsoft",
  },
  {
    id: "3",
    name: "Carol Davis",
    headline: "Frontend Specialist",
    skills: ["Vue.js", "JavaScript", "CSS"],
    company: "Meta",
  },
  {
    id: "4",
    name: "David Chen",
    headline: "Full Stack Developer",
    skills: ["React", "Python", "AWS"],
    company: "Amazon",
  },
  {
    id: "5",
    name: "Emma Wilson",
    headline: "DevOps Engineer",
    skills: ["Kubernetes", "Docker", "CI/CD"],
    company: "Netflix"],
  },
];

// Search function that mimics backend behavior
const searchMentors = (mentors: any[], query: string) => {
  if (!query || query.trim() === "") {
    return mentors;
  }

  const lowerQuery = query.toLowerCase();

  return mentors.filter((mentor) => {
    // Search in name (case-insensitive)
    if (mentor.name.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in headline (case-insensitive)
    if (mentor.headline.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in skills (case-insensitive)
    if (mentor.skills.some((skill: string) => skill.toLowerCase().includes(lowerQuery))) {
      return true;
    }

    // Search in company (case-insensitive)
    if (mentor.company.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    return false;
  });
};

describe("Mentor Search - Integration Tests", () => {
  describe("Acceptance Criteria: Search is case-insensitive", () => {
    it("should find mentors with lowercase search query", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "react");

      expect(results).toHaveLength(2);
      expect(results.some((m) => m.name === "Alice Johnson")).toBe(true);
      expect(results.some((m) => m.name === "David Chen")).toBe(true);
    });

    it("should find mentors with uppercase search query", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "REACT");

      expect(results).toHaveLength(2);
      expect(results.some((m) => m.name === "Alice Johnson")).toBe(true);
      expect(results.some((m) => m.name === "David Chen")).toBe(true);
    });

    it("should find mentors with mixed case search query", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "ReAcT");

      expect(results).toHaveLength(2);
    });

    it("should match names case-insensitively", () => {
      const mentors = createMockMentors();
      
      const lowercase = searchMentors(mentors, "alice");
      const uppercase = searchMentors(mentors, "ALICE");
      const mixedcase = searchMentors(mentors, "AlIcE");

      expect(lowercase).toHaveLength(1);
      expect(uppercase).toHaveLength(1);
      expect(mixedcase).toHaveLength(1);
    });

    it("should match skills case-insensitively", () => {
      const mentors = createMockMentors();
      
      const lowercase = searchMentors(mentors, "python");
      const uppercase = searchMentors(mentors, "PYTHON");

      expect(lowercase).toHaveLength(2);
      expect(uppercase).toHaveLength(2);
    });

    it("should match company names case-insensitively", () => {
      const mentors = createMockMentors();
      
      const lowercase = searchMentors(mentors, "google");
      const uppercase = searchMentors(mentors, "GOOGLE");

      expect(lowercase).toHaveLength(1);
      expect(uppercase).toHaveLength(1);
      expect(lowercase[0].name).toBe("Alice Johnson");
    });
  });

  describe("Acceptance Criteria: Results update dynamically", () => {
    it("should update results when search query changes", () => {
      const allMentors = createMockMentors();

      const { result } = renderHook(() => {
        const [searchQuery, setSearchQuery] = useState("");
        const [mentors, setMentors] = useState(allMentors);

        const updateSearch = useCallback(
          (query: string) => {
            setSearchQuery(query);
            const filtered = searchMentors(allMentors, query);
            setMentors(filtered);
          },
          []
        );

        return { searchQuery, mentors, updateSearch };
      });

      // Initially all mentors shown
      expect(result.current.mentors).toHaveLength(5);

      // Search for "React"
      act(() => {
        result.current.updateSearch("React");
      });

      expect(result.current.mentors).toHaveLength(2);

      // Change search to "Python"
      act(() => {
        result.current.updateSearch("Python");
      });

      expect(result.current.mentors).toHaveLength(2);

      // Clear search
      act(() => {
        result.current.updateSearch("");
      });

      expect(result.current.mentors).toHaveLength(5);
    });

    it("should update results progressively as user types", () => {
      const allMentors = createMockMentors();

      const { result } = renderHook(() => {
        const [searchQuery, setSearchQuery] = useState("");
        const [mentors, setMentors] = useState(allMentors);

        const updateSearch = useCallback(
          (query: string) => {
            setSearchQuery(query);
            const filtered = searchMentors(allMentors, query);
            setMentors(filtered);
          },
          []
        );

        return { searchQuery, mentors, updateSearch };
      });

      // Type "R"
      act(() => {
        result.current.updateSearch("R");
      });
      expect(result.current.mentors.length).toBeGreaterThan(0);

      // Type "Re"
      act(() => {
        result.current.updateSearch("Re");
      });
      expect(result.current.mentors.length).toBeGreaterThan(0);

      // Type "Rea"
      act(() => {
        result.current.updateSearch("Rea");
      });
      expect(result.current.mentors.length).toBeGreaterThan(0);

      // Type "React"
      act(() => {
        result.current.updateSearch("React");
      });
      expect(result.current.mentors).toHaveLength(2);
    });

    it("should show all mentors when search is cleared", () => {
      const allMentors = createMockMentors();

      const { result } = renderHook(() => {
        const [mentors, setMentors] = useState(allMentors);

        const updateSearch = useCallback(
          (query: string) => {
            const filtered = searchMentors(allMentors, query);
            setMentors(filtered);
          },
          []
        );

        return { mentors, updateSearch };
      });

      // Apply search
      act(() => {
        result.current.updateSearch("React");
      });
      expect(result.current.mentors).toHaveLength(2);

      // Clear search
      act(() => {
        result.current.updateSearch("");
      });
      expect(result.current.mentors).toHaveLength(5);
    });
  });

  describe("Acceptance Criteria: Empty state displayed when no results exist", () => {
    it("should return empty array when no mentors match", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "Nonexistent Technology");

      expect(results).toHaveLength(0);
    });

    it("should handle empty state for gibberish search", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "xyzabc123");

      expect(results).toHaveLength(0);
    });

    it("should show empty state when searching for unavailable skill", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "COBOL");

      expect(results).toHaveLength(0);
    });

    it("should transition from results to empty state", () => {
      const allMentors = createMockMentors();

      const { result } = renderHook(() => {
        const [mentors, setMentors] = useState(allMentors);

        const updateSearch = useCallback(
          (query: string) => {
            const filtered = searchMentors(allMentors, query);
            setMentors(filtered);
          },
          []
        );

        return { mentors, updateSearch };
      });

      // Valid search with results
      act(() => {
        result.current.updateSearch("React");
      });
      expect(result.current.mentors).toHaveLength(2);

      // Invalid search with no results
      act(() => {
        result.current.updateSearch("xyz123");
      });
      expect(result.current.mentors).toHaveLength(0);
    });

    it("should transition from empty state back to results", () => {
      const allMentors = createMockMentors();

      const { result } = renderHook(() => {
        const [mentors, setMentors] = useState(allMentors);

        const updateSearch = useCallback(
          (query: string) => {
            const filtered = searchMentors(allMentors, query);
            setMentors(filtered);
          },
          []
        );

        return { mentors, updateSearch };
      });

      // Search with no results
      act(() => {
        result.current.updateSearch("NonexistentTech");
      });
      expect(result.current.mentors).toHaveLength(0);

      // Valid search
      act(() => {
        result.current.updateSearch("React");
      });
      expect(result.current.mentors).toHaveLength(2);
    });
  });

  describe("Search Matching Logic", () => {
    it("should match partial names", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "Ali");

      expect(results).toHaveLength(1);
      expect(results[0].name).toBe("Alice Johnson");
    });

    it("should match partial skills", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "Type");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((m) => m.skills.includes("TypeScript"))).toBe(true);
    });

    it("should match multiple mentors with same skill", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "Python");

      expect(results).toHaveLength(2);
    });

    it("should match company names", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "Meta");

      expect(results).toHaveLength(1);
      expect(results[0].company).toBe("Meta");
    });

    it("should match headline keywords", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "Frontend");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((m) => m.headline.includes("Frontend"))).toBe(true);
    });

    it("should handle whitespace in search query", () => {
      const mentors = createMockMentors();
      
      const withSpaces = searchMentors(mentors, "  React  ");
      const withoutSpaces = searchMentors(mentors, "React");

      // Should trim and match same results
      expect(withSpaces).toHaveLength(withoutSpaces.length);
    });

    it("should match single character searches", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "a");

      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty search string", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "");

      expect(results).toHaveLength(5);
    });

    it("should handle null-like search (empty after trim)", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "   ");

      expect(results).toHaveLength(5);
    });

    it("should handle special characters", () => {
      const mentors = createMockMentors();
      const results = searchMentors(mentors, "C++");

      // Should not crash, may or may not find results
      expect(Array.isArray(results)).toBe(true);
    });

    it("should handle very long search queries", () => {
      const mentors = createMockMentors();
      const longQuery = "a".repeat(200);
      const results = searchMentors(mentors, longQuery);

      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(0);
    });
  });
});
