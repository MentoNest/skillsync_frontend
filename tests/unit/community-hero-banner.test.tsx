import { fireEvent, render, screen } from "@testing-library/react";
import CommunityHeroBanner from "@/components/community/CommunityHeroBanner";

describe("CommunityHeroBanner", () => {
  it("renders a styled, keyboard-focusable dialog trigger for starting a discussion", () => {
    const onStartDiscussion = jest.fn();
    render(<CommunityHeroBanner onStartDiscussion={onStartDiscussion} />);

    const button = screen.getByRole("button", { name: /start discussion/i });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-haspopup", "dialog");
    expect(button).toHaveClass(
      "bg-white",
      "text-indigo-700",
      "focus-visible:ring-2",
      "focus-visible:ring-white"
    );

    button.focus();
    expect(button).toHaveFocus();

    fireEvent.click(button);
    expect(onStartDiscussion).toHaveBeenCalledTimes(1);
  });
});
