import { render, screen } from "@testing-library/react";
import { TrendingBadge, TrendingBadgeForDiscussion } from "@/components/community/TrendingBadge";
import {
  getEngagementScore,
  isTrendingDiscussion,
} from "@/lib/community-trending";

describe("TrendingBadge", () => {
  it("renders the label by default", () => {
    render(<TrendingBadge />);
    expect(screen.getByText("Trending")).toBeInTheDocument();
  });

  it("renders nothing when not trending (optional badge)", () => {
    const { container } = render(<TrendingBadge trending={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("exposes an accessible name that does not rely on colour", () => {
    render(<TrendingBadge />);
    expect(
      screen.getByLabelText("Trending discussion")
    ).toBeInTheDocument();
  });

  it("hides the decorative flame from assistive technology", () => {
    const { container } = render(<TrendingBadge />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});

describe("TrendingBadgeForDiscussion", () => {
  const trending = { likeCount: 40, replyCount: 20, viewCount: 200 };
  const quiet = { likeCount: 0, replyCount: 0, viewCount: 1 };

  it("shows for a high-engagement discussion", () => {
    render(
      <TrendingBadgeForDiscussion discussion={trending} trending={undefined} />
    );
    expect(screen.getByLabelText("Trending discussion")).toBeInTheDocument();
  });

  it("hides for a low-engagement discussion", () => {
    const { container } = render(
      <TrendingBadgeForDiscussion discussion={quiet} trending={undefined} />
    );
    expect(container.firstChild).toBeNull();
  });
});

describe("community-trending helpers", () => {
  it("weights replies and likes above views", () => {
    expect(getEngagementScore({ likeCount: 1, replyCount: 1, viewCount: 0 })).toBe(5);
  });

  it("classifies engagement against the threshold", () => {
    expect(
      isTrendingDiscussion({ likeCount: 50, replyCount: 20, viewCount: 200 })
    ).toBe(true);
    expect(
      isTrendingDiscussion({ likeCount: 0, replyCount: 0, viewCount: 10 })
    ).toBe(false);
  });
});
