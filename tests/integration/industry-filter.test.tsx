import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MentorsPage from "@/app/(mentee)/mentee/mentors/page";
import { mentorApi } from "@/lib/api";
import { Mentor } from "@/lib/mentor-types";

// Mock next/navigation
let mockSearchParams = new URLSearchParams();
const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({
    push: jest.fn(),
    replace: mockReplace,
  }),
  usePathname: () => "/mentee/mentors",
}));

// Mock mentorApi
jest.mock("@/lib/api", () => ({
  mentorApi: {
    getMentors: jest.fn(),
  },
}));

const mockMentorsList: Mentor[] = [
  {
    id: "m-tech-1",
    name: "James Okafor",
    avatar: "",
    headline: "Staff Software Engineer · Meta",
    bio: "Distributed systems expert.",
    skills: ["System Design", "Go"],
    industry: "Technology",
    experienceLevel: "principal",
    rating: 4.9,
    hourlyRate: 250,
    availability: "available",
    sessions: 320,
  },
  {
    id: "m-finance-1",
    name: "Aisha Nwosu",
    avatar: "",
    headline: "Principal Product Manager · Stripe",
    bio: "Fintech product leadership.",
    skills: ["Product Strategy", "Fintech"],
    industry: "Finance",
    experienceLevel: "principal",
    rating: 4.8,
    hourlyRate: 300,
    availability: "available",
    sessions: 210,
  },
  {
    id: "m-health-1",
    name: "Dr. Elena Rostova",
    avatar: "",
    headline: "Director of Health Informatics · Mayo Clinic",
    bio: "Clinical AI systems.",
    skills: ["Health Informatics", "Python"],
    industry: "Healthcare",
    experienceLevel: "senior",
    rating: 4.9,
    hourlyRate: 260,
    availability: "available",
    sessions: 110,
  },
];

describe("Industry Filter Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();

    (mentorApi.getMentors as jest.Mock).mockImplementation((filters = {}) => {
      let filtered = [...mockMentorsList];

      if (filters.industry && filters.industry.length > 0) {
        filtered = filtered.filter((m) =>
          filters.industry.some((ind: string) => ind.toLowerCase() === m.industry.toLowerCase())
        );
      }

      return Promise.resolve({
        mentors: filtered,
        total: filtered.length,
        page: 1,
        totalPages: 1,
        hasMore: false,
      });
    });
  });

  it("filters mentors when an industry is selected", async () => {
    render(<MentorsPage />);

    // Initial load displays all mentors
    await waitFor(() => {
      expect(screen.getByText("James Okafor")).toBeInTheDocument();
      expect(screen.getByText("Aisha Nwosu")).toBeInTheDocument();
      expect(screen.getByText("Dr. Elena Rostova")).toBeInTheDocument();
    });

    // Select Healthcare industry
    const healthcareCheckbox = screen.getByLabelText("Filter by Healthcare industry");
    fireEvent.click(healthcareCheckbox);

    // Results update correctly
    await waitFor(() => {
      expect(mentorApi.getMentors).toHaveBeenCalledWith(
        expect.objectContaining({
          industry: ["Healthcare"],
        }),
        1
      );
    });
  });

  it("supports selecting multiple industries and updates results correctly", async () => {
    render(<MentorsPage />);

    await waitFor(() => {
      expect(screen.getByText("James Okafor")).toBeInTheDocument();
    });

    // Select Technology
    const techCheckbox = screen.getByLabelText("Filter by Technology industry");
    fireEvent.click(techCheckbox);

    // Also select Finance
    const financeCheckbox = screen.getByLabelText("Filter by Finance industry");
    fireEvent.click(financeCheckbox);

    // Results update correctly with multiple industries
    await waitFor(() => {
      expect(mentorApi.getMentors).toHaveBeenCalledWith(
        expect.objectContaining({
          industry: expect.arrayContaining(["Technology", "Finance"]),
        }),
        1
      );
    });
  });

  it("displays removable active industry filter badges", async () => {
    mockSearchParams = new URLSearchParams("industry=Technology,Healthcare");

    render(<MentorsPage />);

    await waitFor(() => {
      expect(screen.getByText("Technology")).toBeInTheDocument();
      expect(screen.getByText("Healthcare")).toBeInTheDocument();
    });

    const activeBadge = screen.getByRole("button", {
      name: "Remove Technology industry filter",
    });
    expect(activeBadge).toBeInTheDocument();

    // Clicking the badge removes the filter
    fireEvent.click(activeBadge);

    await waitFor(() => {
      expect(mentorApi.getMentors).toHaveBeenCalledWith(
        expect.objectContaining({
          industry: ["Healthcare"],
        }),
        1
      );
    });
  });
});
