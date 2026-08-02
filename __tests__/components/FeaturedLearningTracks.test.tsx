import "@testing-library/jest-dom/jest-globals";
import React from "react";
import { render, screen } from "@testing-library/react";
import FeaturedLearningTracks, {
  defaultFeaturedTracks,
} from "@/components/FeaturedLearningTracks";

describe("FeaturedLearningTracks", () => {
  it('renders section title and "View All" link', () => {
    render(<FeaturedLearningTracks />);

    // Check heading
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /featured learning tracks/i,
    });
    expect(heading).toBeInTheDocument();

    // Check "View All" link
    const viewAllLink = screen.getByRole("link", { name: /view all/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute("href", "/resources/tracks");
  });

  it("renders exactly 3 learning track cards by default", () => {
    const { container } = render(<FeaturedLearningTracks />);
    const articles = container.querySelectorAll("article");
    expect(articles.length).toBe(3);

    // Check titles of default tracks
    defaultFeaturedTracks.forEach((track) => {
      expect(screen.getByText(track.title)).toBeInTheDocument();
    });
  });

  it("limits custom tracks array to 3 cards", () => {
    const customTracks = [
      {
        title: "Track 1",
        category: "Cat 1",
        description: "Desc 1",
        imageSrc: "/file.svg",
        lessons: 10,
        duration: "2h",
        href: "/resources/tracks/1",
      },
      {
        title: "Track 2",
        category: "Cat 2",
        description: "Desc 2",
        imageSrc: "/file.svg",
        lessons: 12,
        duration: "3h",
        href: "/resources/tracks/2",
      },
      {
        title: "Track 3",
        category: "Cat 3",
        description: "Desc 3",
        imageSrc: "/file.svg",
        lessons: 15,
        duration: "4h",
        href: "/resources/tracks/3",
      },
      {
        title: "Track 4",
        category: "Cat 4",
        description: "Desc 4",
        imageSrc: "/file.svg",
        lessons: 20,
        duration: "5h",
        href: "/resources/tracks/4",
      },
    ];

    const { container } = render(
      <FeaturedLearningTracks tracks={customTracks} />,
    );
    const articles = container.querySelectorAll("article");
    expect(articles.length).toBe(3);
    expect(screen.getByText("Track 1")).toBeInTheDocument();
    expect(screen.getByText("Track 2")).toBeInTheDocument();
    expect(screen.getByText("Track 3")).toBeInTheDocument();
    expect(screen.queryByText("Track 4")).not.toBeInTheDocument();
  });

  it("applies responsive horizontal grid layout classes", () => {
    const { container } = render(<FeaturedLearningTracks />);
    const gridDiv = container.querySelector(".grid");
    expect(gridDiv).toBeInTheDocument();
    expect(gridDiv?.className).toContain("grid-cols-1");
    expect(gridDiv?.className).toContain("md:grid-cols-3");
  });

  it("uses accessible section heading association", () => {
    const { container } = render(<FeaturedLearningTracks />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute(
      "aria-labelledby",
      "featured-tracks-heading",
    );
    expect(
      container.querySelector("#featured-tracks-heading"),
    ).toBeInTheDocument();
  });
});
