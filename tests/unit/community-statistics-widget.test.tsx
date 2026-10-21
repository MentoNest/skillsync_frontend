import { render, screen } from "@testing-library/react";
import { CommunityStatisticsWidget } from "@/components/community/CommunityStatisticsWidget";
import type { CommunityStatistics } from "@/lib/community-types";

const stats: CommunityStatistics = {
  totalMembers: 2400,
  activeDiscussions: 128,
  totalDiscussions: 940,
  eventsThisMonth: 4,
};

describe("CommunityStatisticsWidget", () => {
  it("renders every metric label", () => {
    render(<CommunityStatisticsWidget stats={stats} />);

    expect(screen.getByText("Total Members")).toBeInTheDocument();
    expect(screen.getByText("Active Discussions")).toBeInTheDocument();
    expect(screen.getByText("Total Discussions")).toBeInTheDocument();
    expect(screen.getByText("Events This Month")).toBeInTheDocument();
  });

  it("renders formatted values", () => {
    render(<CommunityStatisticsWidget stats={stats} />);

    expect(screen.getByText("2,400")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("940")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("pairs every value with its label", () => {
    render(<CommunityStatisticsWidget stats={stats} />);

    const expected: Array<[string, string]> = [
      ["Total Members", "2,400"],
      ["Active Discussions", "128"],
      ["Total Discussions", "940"],
      ["Events This Month", "4"],
    ];

    expected.forEach(([label, value]) => {
      const term = screen.getByText(label);
      const definition = term.closest("dl")?.querySelector("dd");
      expect(definition).toHaveTextContent(value);
    });
  });

  it("renders a responsive grid", () => {
    const { container } = render(<CommunityStatisticsWidget stats={stats} />);
    const grid = container.querySelector('[role="list"]');

    expect(grid).not.toBeNull();
    expect(grid).toHaveClass("grid-cols-1", "min-[380px]:grid-cols-2");
  });

  it("renders an icon for each metric and hides it from assistive technology", () => {
    const { container } = render(<CommunityStatisticsWidget stats={stats} />);
    const iconWrappers = container.querySelectorAll('span[aria-hidden="true"]');

    expect(iconWrappers).toHaveLength(4);
    iconWrappers.forEach((wrapper) => {
      expect(wrapper.querySelector("svg")).not.toBeNull();
    });
  });

  it("shows a loading status while stats load", () => {
    render(<CommunityStatisticsWidget stats={stats} isLoading />);
    expect(
      screen.getByRole("status", { name: /loading community statistics/i })
    ).toBeInTheDocument();
    expect(screen.queryByText("Total Members")).not.toBeInTheDocument();
  });

  it("shows an error message when loading fails", () => {
    render(
      <CommunityStatisticsWidget stats={stats} error="Failed to load stats" />
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load stats");
  });
});
