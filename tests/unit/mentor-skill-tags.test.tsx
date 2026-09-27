import { render, screen, fireEvent } from "@testing-library/react";
import { MentorSkillTags } from "@/components/mentor-discovery/MentorSkillTags";

describe("MentorSkillTags Component", () => {
  const fiveSkills = [
    "System Design",
    "Distributed Systems",
    "Go",
    "Kubernetes",
    "Architecture",
  ];

  it("renders every skill when the count is within the visible limit", () => {
    render(<MentorSkillTags skills={["Go", "Kubernetes"]} />);

    expect(screen.getByText("Go")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.queryByText(/more/i)).not.toBeInTheDocument();
  });

  it("renders nothing when there are no usable skills", () => {
    const { container } = render(<MentorSkillTags skills={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  describe("dynamic rendering", () => {
    it("trims whitespace and drops blank entries", () => {
      const { container } = render(
        <MentorSkillTags skills={["  Go  ", "", "   ", "Rust"]} />
      );

      const tags = container.querySelectorAll("li");
      expect(tags).toHaveLength(2);
      expect(screen.getByText("Go")).toBeInTheDocument();
      expect(screen.getByText("Rust")).toBeInTheDocument();
    });

    it("ignores non-string entries", () => {
      render(
        <MentorSkillTags skills={["Go", 42 as unknown as string, null]} />
      );

      expect(screen.getByText("Go")).toBeInTheDocument();
      expect(screen.queryByText("42")).not.toBeInTheDocument();
    });

    it("removes case-insensitive duplicates before counting", () => {
      // Go/go/GO collapse to one tag, leaving 5 distinct skills.
      render(
        <MentorSkillTags
          skills={["Go", "go", "GO", "Rust", "Elixir", "Zig", "Clojure"]}
        />
      );

      expect(screen.getByText("+1 more")).toBeInTheDocument();
      expect(screen.queryByText("go")).not.toBeInTheDocument();
      expect(screen.queryByText("GO")).not.toBeInTheDocument();
    });

    it("tolerates a missing skills prop", () => {
      const { container } = render(<MentorSkillTags />);
      expect(container).toBeEmptyDOMElement();
    });

    it("caps the number of skills it accepts", () => {
      render(<MentorSkillTags skills={["a", "b", "c"]} limit={2} />);

      expect(screen.getByText("a")).toBeInTheDocument();
      expect(screen.getByText("b")).toBeInTheDocument();
      expect(screen.queryByText("c")).not.toBeInTheDocument();
    });
  });

  describe("overflow handling", () => {
    it("caps visible tags and reports how many are hidden", () => {
      render(<MentorSkillTags skills={fiveSkills} />);

      expect(screen.getByText("System Design")).toBeInTheDocument();
      expect(screen.getByText("Kubernetes")).toBeInTheDocument();
      expect(screen.queryByText("Architecture")).not.toBeInTheDocument();
      expect(screen.getByText("+1 more")).toBeInTheDocument();
    });

    it("reveals the hidden tags when the overflow control is activated", () => {
      render(<MentorSkillTags skills={fiveSkills} />);

      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByText("Architecture")).toBeInTheDocument();
      expect(screen.queryByText("+1 more")).not.toBeInTheDocument();
    });

    it("collapses back to the capped set", () => {
      render(<MentorSkillTags skills={fiveSkills} />);

      const control = screen.getByRole("button");
      fireEvent.click(control);
      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByText("+1 more")).toBeInTheDocument();
    });

    it("exposes expansion state to assistive tech", () => {
      render(<MentorSkillTags skills={fiveSkills} mentorName="Sarah" />);

      const control = screen.getByRole("button");
      expect(control).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(control);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "true"
      );
    });

    it("renders a non-interactive count when expansion is disabled", () => {
      render(<MentorSkillTags skills={fiveSkills} expandable={false} />);

      expect(screen.getByText("+1 more")).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("honours a custom maxVisible", () => {
      render(<MentorSkillTags skills={fiveSkills} maxVisible={2} />);

      expect(screen.getByText("System Design")).toBeInTheDocument();
      expect(screen.getByText("Distributed Systems")).toBeInTheDocument();
      expect(screen.queryByText("Go")).not.toBeInTheDocument();
      expect(screen.getByText("+3 more")).toBeInTheDocument();
    });
  });

  describe("responsive wrapping", () => {
    it("lets the tag list wrap rather than clip", () => {
      const { container } = render(<MentorSkillTags skills={fiveSkills} />);
      const list = container.querySelector("ul");

      expect(list).toHaveClass("flex-wrap");
    });

    it("lets long skill names break instead of overflowing", () => {
      const long = "Enterprise-Scale Distributed Systems Architecture";
      const { container } = render(<MentorSkillTags skills={[long]} />);

      expect(screen.getByText(long)).toHaveClass("break-words");
      expect(container.querySelector("li")).toHaveClass("max-w-full");
    });

    it("scales tag size via the size prop", () => {
      const { container, rerender } = render(
        <MentorSkillTags skills={["Go"]} size="sm" />
      );
      expect(container.querySelector("li")).toHaveClass("text-xs");

      rerender(<MentorSkillTags skills={["Go"]} size="md" />);
      expect(container.querySelector("li")).toHaveClass("text-sm");
    });
  });

  it("labels the group with the mentor name when provided", () => {
    render(<MentorSkillTags skills={["Go"]} mentorName="Sarah" />);
    expect(screen.getByRole("list", { name: "Sarah's skills" })).toBeInTheDocument();
  });
});
