import { render, screen } from "@testing-library/react";
import {
  CommunityCategoriesSkeleton,
  CommunityEventsSkeleton,
  CommunityHeroSkeleton,
  CommunityPageSkeleton,
  CommunityStatisticsSkeleton,
  DiscussionCardSkeleton,
  DiscussionListSkeleton,
} from "@/components/community/CommunitySkeletons";

describe("CommunitySkeletons", () => {
  it("announces loading for a list of discussion cards", () => {
    render(<DiscussionListSkeleton count={2} />);
    expect(screen.getByRole("status", { name: "Loading discussions" })).toBeInTheDocument();
  });

  it("renders the requested number of discussion cards", () => {
    const { container } = render(<DiscussionListSkeleton count={4} />);
    expect(container.querySelectorAll("article")).toHaveLength(4);
  });

  it("keeps placeholders hidden from assistive technology", () => {
    const { container } = render(<DiscussionCardSkeleton />);
    expect(container.querySelector("article")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("renders hero, categories, events and statistics placeholders", () => {
    render(<CommunityHeroSkeleton />);
    render(<CommunityCategoriesSkeleton />);
    render(<CommunityEventsSkeleton />);
    render(<CommunityStatisticsSkeleton />);
    expect(screen.getByRole("status", { name: "Loading categories" })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Loading events" })).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Loading statistics" })).toBeInTheDocument();
  });

  it("composes the full page skeleton", () => {
    render(<CommunityPageSkeleton />);
    expect(screen.getByRole("status", { name: "Loading community…" })).toBeInTheDocument();
  });
});
