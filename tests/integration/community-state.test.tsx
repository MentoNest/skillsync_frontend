import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommunityPage from "@/app/community/page";
import type { Discussion } from "@/lib/community-types";

const discussion: Discussion = {
  id: "1",
  title: "Shared State Discussion",
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
  createdAt: "2026-09-29T10:00:00.000Z",
  updatedAt: "2026-09-29T10:00:00.000Z",
};

const statistics = {
  totalMembers: 12,
  activeDiscussions: 3,
  totalDiscussions: 25,
  eventsThisMonth: 4,
};

function jsonResponse(body: unknown) {
  return { ok: true, status: 200, json: async () => body };
}

let fetchMock: jest.Mock;

beforeEach(() => {
  fetchMock = jest.fn((input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/api/community/overview")) {
      return Promise.resolve(jsonResponse({ statistics, events: [] }));
    }
    if (url.includes("/api/community/discussions")) {
      return Promise.resolve(
        jsonResponse({
          discussions: [discussion],
          hasMore: false,
          total: 1,
          page: 1,
        })
      );
    }
    return Promise.resolve(jsonResponse({}));
  });
  global.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Community shared state", () => {
  it("renders discussions fetched from the API", async () => {
    render(<CommunityPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Shared State Discussion")
      ).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/community/discussions"),
      expect.anything()
    );
  });

  it("feeds the sidebar statistics from the shared provider", async () => {
    render(<CommunityPage />);

    await waitFor(() => {
      expect(screen.getByText("Total Members")).toBeInTheDocument();
    });

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Events This Month")).toBeInTheDocument();
  });

  it("refetches the feed when the category filter changes", async () => {
    render(<CommunityPage />);

    await waitFor(() => {
      expect(screen.getByText("Shared State Discussion")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("tab", { name: "Technical" }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("category=technical"),
        expect.anything()
      );
    });
  });

  it("surfaces feed errors from the API", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/community/overview")) {
        return Promise.resolve(jsonResponse({ statistics, events: [] }));
      }
      return Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({ error: "Service unavailable" }),
      });
    });

    render(<CommunityPage />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Service unavailable"
      );
    });
  });
});
