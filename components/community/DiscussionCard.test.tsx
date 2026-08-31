import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DiscussionCard from "@/components/community/DiscussionCard";

const baseDiscussion = {
  id: "1",
  title: "Test Discussion",
  excerpt: "This is a test discussion excerpt.",
  author: "Jane Smith",
  repliesCount: 5,
  likeCount: 3,
};

describe("DiscussionCard", () => {
  it("renders discussion title and excerpt", () => {
    render(<DiscussionCard discussion={baseDiscussion} />);
    expect(screen.getByText("Test Discussion")).toBeInTheDocument();
    expect(screen.getByText("This is a test discussion excerpt.")).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<DiscussionCard discussion={baseDiscussion} />);
    expect(screen.getByText("Started by Jane Smith")).toBeInTheDocument();
  });

  it("renders replies count", () => {
    render(<DiscussionCard discussion={baseDiscussion} />);
    expect(screen.getByText("5 replies")).toBeInTheDocument();
  });

  it("renders a share button", () => {
    render(<DiscussionCard discussion={baseDiscussion} />);
    expect(screen.getByRole("button", { name: /share discussion/i })).toBeInTheDocument();
  });

  it("renders a like button", () => {
    render(<DiscussionCard discussion={baseDiscussion} />);
    expect(screen.getByRole("button", { name: /like discussion/i })).toBeInTheDocument();
  });

  it("shows pinned badge when discussion is pinned", () => {
    render(<DiscussionCard discussion={{ ...baseDiscussion, isPinned: true }} />);
    expect(screen.getByText("Pinned")).toBeInTheDocument();
  });

  it("shows locked badge when discussion is locked", () => {
    render(<DiscussionCard discussion={{ ...baseDiscussion, isLocked: true }} />);
    expect(screen.getByText("Locked")).toBeInTheDocument();
  });

  it("shows both badges when pinned and locked", () => {
    render(<DiscussionCard discussion={{ ...baseDiscussion, isPinned: true, isLocked: true }} />);
    expect(screen.getByText("Pinned")).toBeInTheDocument();
    expect(screen.getByText("Locked")).toBeInTheDocument();
  });

  it("does not show pinned or locked badges by default", () => {
    render(<DiscussionCard discussion={baseDiscussion} />);
    expect(screen.queryByText("Pinned")).not.toBeInTheDocument();
    expect(screen.queryByText("Locked")).not.toBeInTheDocument();
  });
});
