import { render, screen } from "@testing-library/react";
import { CommunityStatisticCard } from "@/components/community/CommunityStatisticCard";

describe("CommunityStatisticCard", () => {
  it("renders label and value", () => {
    render(
      <CommunityStatisticCard label="Total Members" value="2,400+" />
    );
    expect(screen.getByText("Total Members")).toBeInTheDocument();
    expect(screen.getByText("2,400+")).toBeInTheDocument();
  });

  it("renders optional icon when provided", () => {
    render(
      <CommunityStatisticCard
        label="Total Members"
        value="2,400+"
        icon={<svg data-testid="stat-icon" />}
      />
    );
    expect(screen.getByTestId("stat-icon")).toBeInTheDocument();
  });

  it("omits icon slot when no icon is provided", () => {
    const { container } = render(
      <CommunityStatisticCard label="Total Members" value="2,400+" />
    );
    expect(container.querySelector('span[aria-hidden="true"]')).toBeNull();
  });

  it("hides decorative icon from assistive technology", () => {
    render(
      <CommunityStatisticCard
        label="Online Now"
        value="128"
        icon={<svg data-testid="stat-icon" />}
      />
    );
    const iconWrapper = screen
      .getByTestId("stat-icon")
      .closest('span[aria-hidden="true"]');
    expect(iconWrapper).not.toBeNull();
  });
});
