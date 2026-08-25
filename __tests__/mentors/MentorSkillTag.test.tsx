import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MentorSkillTag from "@/components/MentorSkillTag";

describe("MentorSkillTag Component", () => {
  it("renders skill tag text dynamically", () => {
    render(<MentorSkillTag skill="TypeScript" />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("handles click events when onClick is provided", () => {
    const handleClick = jest.fn();
    render(<MentorSkillTag skill="React" onClick={handleClick} />);
    const tag = screen.getByRole("button");
    fireEvent.click(tag);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
