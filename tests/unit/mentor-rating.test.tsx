import { render, screen } from "@testing-library/react";
import { MentorRating } from "@/components/mentor-discovery/MentorRating";

describe("MentorRating Component", () => {
  it("renders decimal rating score correctly", () => {
    render(<MentorRating rating={4.8} />);
    expect(screen.getByText("4.8")).toBeInTheDocument();
  });

  it("formats integer ratings with decimal precision", () => {
    render(<MentorRating rating={5} precision={1} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();
  });

  it("supports dynamic precision", () => {
    render(<MentorRating rating={4.856} precision={2} />);
    expect(screen.getByText("4.86")).toBeInTheDocument();
  });

  it("renders rating count when provided", () => {
    render(<MentorRating rating={4.9} ratingCount={128} />);
    expect(screen.getByText("(128)")).toBeInTheDocument();
  });

  it("supports custom count formatter", () => {
    render(
      <MentorRating
        rating={4.7}
        ratingCount={45}
        formatCount={(c) => `· ${c} sessions`}
      />
    );
    expect(screen.getByText("· 45 sessions")).toBeInTheDocument();
  });

  it("hides count when showCount is false", () => {
    render(<MentorRating rating={4.9} ratingCount={128} showCount={false} />);
    expect(screen.queryByText("(128)")).not.toBeInTheDocument();
  });

  it("hides numerical score when showScore is false", () => {
    render(<MentorRating rating={4.9} showScore={false} />);
    expect(screen.queryByText("4.9")).not.toBeInTheDocument();
  });

  it("provides accessible rating information via aria-label and role", () => {
    render(<MentorRating rating={4.8} ratingCount={120} countLabel="reviews" />);
    const ratingElement = screen.getByRole("img");
    expect(ratingElement).toHaveAttribute(
      "aria-label",
      "Rated 4.8 out of 5 stars, from 120 reviews"
    );
  });

  it("supports custom accessible label override", () => {
    render(
      <MentorRating
        rating={4.8}
        ariaLabel="Top rated mentor with 4.8 stars"
      />
    );
    const ratingElement = screen.getByRole("img");
    expect(ratingElement).toHaveAttribute(
      "aria-label",
      "Top rated mentor with 4.8 stars"
    );
  });

  it("marks visual stars with aria-hidden to prevent redundant announcements", () => {
    const { container } = render(<MentorRating rating={4.5} />);
    const starContainer = container.querySelector('[aria-hidden="true"]');
    expect(starContainer).toBeInTheDocument();
  });

  it("clamps ratings exceeding maxRating or below zero", () => {
    const { rerender } = render(<MentorRating rating={6.5} maxRating={5} />);
    expect(screen.getByText("5.0")).toBeInTheDocument();

    rerender(<MentorRating rating={-2} maxRating={5} />);
    expect(screen.getByText("0.0")).toBeInTheDocument();
  });

  it("supports dynamic sizes (sm, md, lg)", () => {
    const { container: smContainer, rerender } = render(
      <MentorRating rating={4.8} size="sm" />
    );
    expect(smContainer.querySelector(".text-xs")).toBeInTheDocument();

    rerender(<MentorRating rating={4.8} size="lg" />);
    expect(smContainer.querySelector(".text-base")).toBeInTheDocument();
  });
});
