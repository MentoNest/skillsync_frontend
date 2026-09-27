import { render, screen, fireEvent } from "@testing-library/react";
import MentorCard from "@/components/landing/MentorCard";

describe("MentorCard Component", () => {
  const defaultProps = {
    id: "mentor-101",
    name: "James Okafor",
    title: "Staff Software Engineer · Meta",
    bio: "10+ years building distributed systems at scale. Helping engineers grow.",
    skills: ["System Design", "Distributed Systems", "Go", "Kubernetes", "Architecture"],
    avatarInitials: "JO",
    avatarColor: "bg-indigo-600",
    rating: 4.9,
    sessions: 320,
    hourlyRate: 250,
  };

  it("renders mentor name and professional title", () => {
    render(<MentorCard {...defaultProps} />);
    expect(screen.getByText("James Okafor")).toBeInTheDocument();
    expect(screen.getByText("Staff Software Engineer · Meta")).toBeInTheDocument();
  });

  it("renders short bio and skills badges", () => {
    render(<MentorCard {...defaultProps} />);
    expect(
      screen.getByText("10+ years building distributed systems at scale. Helping engineers grow.")
    ).toBeInTheDocument();

    expect(screen.getByText("System Design")).toBeInTheDocument();
    expect(screen.getByText("Distributed Systems")).toBeInTheDocument();
    expect(screen.getByText("+1 more")).toBeInTheDocument();
  });

  it("renders rating score and session count", () => {
    render(<MentorCard {...defaultProps} />);
    expect(screen.getByText("4.9")).toBeInTheDocument();
    expect(screen.getByText("· 320 sessions")).toBeInTheDocument();
  });

  it("renders price formatted correctly", () => {
    render(<MentorCard {...defaultProps} hourlyRate={250} />);
    expect(screen.getByText("$250/hr")).toBeInTheDocument();
  });

  it("supports custom string price", () => {
    render(<MentorCard {...defaultProps} price="Free" hourlyRate={undefined} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("renders profile image when avatarUrl is provided", () => {
    render(
      <MentorCard
        {...defaultProps}
        avatarUrl="https://example.com/avatar.jpg"
      />
    );
    const image = screen.getByRole("img", { name: "James Okafor's profile" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("falls back to initials when avatar image fails to load", () => {
    render(
      <MentorCard
        {...defaultProps}
        avatarUrl="https://example.com/broken.jpg"
      />
    );
    const image = screen.getByRole("img", { name: "James Okafor's profile" });
    fireEvent.error(image);

    expect(screen.getByText("JO")).toBeInTheDocument();
  });

  it("renders default call-to-action (CTA) link", () => {
    render(<MentorCard {...defaultProps} profileHref="/mentors/james-okafor" />);
    const cta = screen.getByRole("link", { name: "View James Okafor's profile" });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/mentors/james-okafor");
    expect(cta).toHaveTextContent("View profile");
  });

  it("supports custom CTA text and click handler", () => {
    const handleCtaClick = jest.fn();
    render(
      <MentorCard
        {...defaultProps}
        ctaText="Book a Session"
        ctaHref="/book/james-okafor"
        onCtaClick={handleCtaClick}
      />
    );
    const cta = screen.getByRole("link", { name: "View James Okafor's profile" });
    expect(cta).toHaveTextContent("Book a Session");
    expect(cta).toHaveAttribute("href", "/book/james-okafor");

    fireEvent.click(cta);
    expect(handleCtaClick).toHaveBeenCalledTimes(1);
  });

  it("renders custom children actions instead of default CTA when passed", () => {
    render(
      <MentorCard {...defaultProps}>
        <div data-testid="custom-actions">
          <button>Save</button>
          <button>Contact</button>
        </div>
      </MentorCard>
    );

    expect(screen.getByTestId("custom-actions")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders availability indicator when provided", () => {
    render(<MentorCard {...defaultProps} availability="available" />);
    expect(screen.getByText("available")).toBeInTheDocument();
  });
});
