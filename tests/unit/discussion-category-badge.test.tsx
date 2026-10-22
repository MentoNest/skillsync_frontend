import { render, screen } from "@testing-library/react";
import {
  DiscussionCategoryBadge,
  discussionCategoryStyle,
} from "@/components/community/DiscussionCategoryBadge";

describe("DiscussionCategoryBadge", () => {
  it("renders a dynamic label", () => {
    render(<DiscussionCategoryBadge label="Career Growth" />);
    expect(screen.getByText("Career Growth")).toBeInTheDocument();
  });

  it("renders nothing without a label", () => {
    const { container } = render(<DiscussionCategoryBadge label="" />);
    expect(container.firstChild).toBeNull();
  });

  it("styles the same category consistently regardless of case/whitespace", () => {
    expect(discussionCategoryStyle("Career Growth")).toBe(
      discussionCategoryStyle("  career growth ")
    );
  });

  it("gives different categories visually distinct styles", () => {
    expect(discussionCategoryStyle("technical")).not.toBe(
      discussionCategoryStyle("announcements")
    );
  });

  it("falls back to a neutral style for unknown categories", () => {
    const style = discussionCategoryStyle("totally-new-category");
    expect(style).toContain("var(--secondary)");
  });

  it("is presentational and not focusable", () => {
    render(<DiscussionCategoryBadge label="networking" />);
    const badge = screen.getByText("networking");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).not.toHaveAttribute("tabindex");
  });
});
