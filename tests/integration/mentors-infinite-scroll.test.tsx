import { render, screen, waitFor, act } from "@testing-library/react";
import MentorsPage from "@/app/(mentee)/mentee/mentors/page";
import { mentorApi } from "@/lib/api";
import { Mentor } from "@/lib/mentor-types";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => "/mentee/mentors",
}));

// Mock mentorApi
jest.mock("@lib/api", () => ({
  mentorApi: {
    getMentors: jest.fn(),
  },
}), { virtual: true });

jest.mock("@/lib/api", () => ({
  mentorApi: {
    getMentors: jest.fn(),
  },
}));

const mockMentorsBatch1: Mentor[] = [
  {
    id: "mentor-1",
    name: "Alex Rivera",
    avatar: "",
    headline: "Staff Engineer · Stripe",
    bio: "Passionate about backend architectures and career guidance.",
    skills: ["TypeScript", "Node.js", "System Design"],
    industry: "Technology",
    experienceLevel: "principal",
    rating: 4.9,
    hourlyRate: 150,
    availability: "available",
    sessions: 40,
  },
  {
    id: "mentor-2",
    name: "Sarah Chen",
    avatar: "",
    headline: "Product Lead · Airbnb",
    bio: "Helping product designers scale and lead teams.",
    skills: ["Product Strategy", "Figma", "Design Systems"],
    industry: "Technology",
    experienceLevel: "lead",
    rating: 4.8,
    hourlyRate: 180,
    availability: "available",
    sessions: 32,
  },
];

const mockMentorsBatch2WithDuplicate: Mentor[] = [
  // Intentionally includes duplicate mentor-2 to verify deduplication
  mockMentorsBatch1[1],
  {
    id: "mentor-3",
    name: "Marcus Liu",
    avatar: "",
    headline: "Data Scientist · Netflix",
    bio: "Mentoring ML engineers and data practitioners.",
    skills: ["Python", "Machine Learning", "PyTorch"],
    industry: "Technology",
    experienceLevel: "senior",
    rating: 4.7,
    hourlyRate: 160,
    availability: "available",
    sessions: 25,
  },
];

describe("Mentors Page Infinite Scroll", () => {
  let observerCallback: (entries: IntersectionObserverEntry[]) => void;
  let observerDisconnect: jest.Mock;
  let observerObserve: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    observerDisconnect = jest.fn();
    observerObserve = jest.fn();

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: observerObserve,
        disconnect: observerDisconnect,
        unobserve: jest.fn(),
      };
    }) as unknown as typeof IntersectionObserver;
  });

  it("loads and displays the initial batch of mentors", async () => {
    (mentorApi.getMentors as jest.Mock).mockResolvedValueOnce({
      mentors: mockMentorsBatch1,
      total: 3,
      page: 1,
      totalPages: 2,
      hasMore: true,
    });

    render(<MentorsPage />);

    await waitFor(() => {
      expect(screen.getByText("Alex Rivera")).toBeInTheDocument();
      expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    });

    expect(mentorApi.getMentors).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it("automatically loads additional results when scrolling and prevents duplicates", async () => {
    (mentorApi.getMentors as jest.Mock)
      .mockResolvedValueOnce({
        mentors: mockMentorsBatch1,
        total: 3,
        page: 1,
        totalPages: 2,
        hasMore: true,
      })
      .mockResolvedValueOnce({
        mentors: mockMentorsBatch2WithDuplicate,
        total: 3,
        page: 2,
        totalPages: 2,
        hasMore: false,
      });

    render(<MentorsPage />);

    // Wait for first batch
    await waitFor(() => {
      expect(screen.getByText("Alex Rivera")).toBeInTheDocument();
    });

    // Simulate intersection observer trigger (scrolling into view)
    act(() => {
      if (observerCallback) {
        observerCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
      }
    });

    // Verify second batch loaded
    await waitFor(() => {
      expect(screen.getByText("Marcus Liu")).toBeInTheDocument();
    });

    // Duplicate mentor-2 (Sarah Chen) should only appear once
    const sarahCards = screen.getAllByText("Sarah Chen");
    expect(sarahCards).toHaveLength(1);

    // Verify end-of-results message appears when hasMore is false
    expect(
      screen.getByText(/You've reached the end of the mentors list/i)
    ).toBeInTheDocument();
  });

  it("displays loading indicator while fetching additional results", async () => {
    let resolveBatch2: (value: unknown) => void;
    const batch2Promise = new Promise((resolve) => {
      resolveBatch2 = resolve;
    });

    (mentorApi.getMentors as jest.Mock)
      .mockResolvedValueOnce({
        mentors: mockMentorsBatch1,
        total: 3,
        page: 1,
        totalPages: 2,
        hasMore: true,
      })
      .mockImplementationOnce(() => batch2Promise);

    render(<MentorsPage />);

    await waitFor(() => {
      expect(screen.getByText("Alex Rivera")).toBeInTheDocument();
    });

    // Trigger loading more
    act(() => {
      if (observerCallback) {
        observerCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
      }
    });

    // Loading state must be visible
    expect(screen.getByLabelText("Loading more mentors")).toBeInTheDocument();
    expect(screen.getByText("Loading more mentors...")).toBeInTheDocument();

    // Resolve second batch
    await act(async () => {
      resolveBatch2!({
        mentors: [mockMentorsBatch2WithDuplicate[1]],
        total: 3,
        page: 2,
        totalPages: 2,
        hasMore: false,
      });
    });

    // Loading state is hidden after batch finishes
    await waitFor(() => {
      expect(screen.queryByLabelText("Loading more mentors")).not.toBeInTheDocument();
      expect(screen.getByText("Marcus Liu")).toBeInTheDocument();
    });
  });
});
