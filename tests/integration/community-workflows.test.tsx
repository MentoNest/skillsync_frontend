import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommunityPage from "@/app/community/page";

// Mock fetch globally
global.fetch = jest.fn();

describe("Community Page Integration", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        discussions: [
          {
            id: "1",
            title: "Integration Test Discussion",
            content: "Test content",
            authorId: "user-1",
            authorName: "Test User",
            category: "general",
            tags: [],
            likeCount: 5,
            replyCount: 2,
            viewCount: 20,
            isPinned: false,
            isLocked: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        hasMore: false,
        total: 1,
        page: 1,
      }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("loads and displays discussions", async () => {
    render(<CommunityPage />);

    await waitFor(() => {
      expect(screen.getByText("Integration Test Discussion")).toBeInTheDocument();
    });
  });

  it("filters discussions by category", async () => {
    render(<CommunityPage />);

    await waitFor(() => {
      expect(screen.getByText("Integration Test Discussion")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("tab", { name: "Technical" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("category=technical"),
        expect.anything()
      );
    });
  });

  it("sorts discussions", async () => {
    render(<CommunityPage />);

    await waitFor(() => {
      expect(screen.getByText("Integration Test Discussion")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Sort discussions"), {
      target: { value: "most-liked" },
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("sort=most-liked"),
        expect.anything()
      );
    });
  });

  it("searches discussions", async () => {
    render(<CommunityPage />);

    await waitFor(() => {
      expect(screen.getByText("Integration Test Discussion")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Search discussions"), {
      target: { value: "test query" },
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("q=test"),
        expect.anything()
      );
    });
  });
});
