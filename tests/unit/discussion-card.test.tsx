import { render, screen } from "@testing-library/react";
import { DiscussionCard } from "@/components/community/DiscussionCard";
import type { Discussion } from "@/lib/community-types";

const mockDiscussion: Discussion = {
  id: "test-1",
  title: "Test Discussion Title",
  content: "This is test content for the discussion card.",
  authorId: "user-1",
  authorName: "Test Author",
  authorAvatar: "https://example.com/avatar.png",
  category: "general",
  tags: ["test"],
  likeCount: 10,
  replyCount: 5,
  viewCount: 50,
  isPinned: false,
  isLocked: false,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

describe("DiscussionCard", () => {
  it("renders discussion title", () => {
    render(<DiscussionCard discussion={mockDiscussion} />);
    expect(screen.getByText("Test Discussion Title")).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<DiscussionCard discussion={mockDiscussion} />);
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders like count", () => {
    render(<DiscussionCard discussion={mockDiscussion} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders reply count", () => {
    render(<DiscussionCard discussion={mockDiscussion} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(<DiscussionCard discussion={mockDiscussion} />);
    expect(screen.getByText("general")).toBeInTheDocument();
  });

  it("shows pinned badge when discussion is pinned", () => {
    const pinnedDiscussion = { ...mockDiscussion, isPinned: true };
    render(<DiscussionCard discussion={pinnedDiscussion} />);
    expect(screen.getByText("Pinned")).toBeInTheDocument();
  });

  it("shows locked badge when discussion is locked", () => {
    const lockedDiscussion = { ...mockDiscussion, isLocked: true };
    render(<DiscussionCard discussion={lockedDiscussion} />);
    expect(screen.getByText("Locked")).toBeInTheDocument();
  });

  it("has accessible heading", () => {
    render(<DiscussionCard discussion={mockDiscussion} />);
    expect(
      screen.getByRole("heading", { name: "Test Discussion Title" })
    ).toBeInTheDocument();
  });
});
