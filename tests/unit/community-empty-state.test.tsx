import { render, screen, fireEvent } from "@testing-library/react";
import { CommunityEmptyState } from "@/components/community/CommunityEmptyState";

describe("CommunityEmptyState", () => {
  it("renders the default title and message", () => {
    render(<CommunityEmptyState />);

    expect(screen.getByRole("heading", { name: /no discussions yet/i })).toBeInTheDocument();
    expect(screen.getByTestId("community-empty-state")).toBeInTheDocument();
  });

  it("renders a Start Discussion CTA that invokes onAction", () => {
    const onAction = jest.fn();
    render(<CommunityEmptyState onAction={onAction} />);

    fireEvent.click(screen.getByRole("button", { name: /start discussion/i }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("omits the CTA when no handler is provided", () => {
    render(<CommunityEmptyState />);

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("supports a custom title, message and action label", () => {
    render(
      <CommunityEmptyState
        title="No discussions found"
        message="Try another category."
        actionLabel="Publish"
        onAction={() => {}}
      />
    );

    expect(screen.getByRole("heading", { name: "No discussions found" })).toBeInTheDocument();
    expect(screen.getByText("Try another category.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Publish" })).toBeInTheDocument();
  });

  it("hides the decorative illustration from assistive technology", () => {
    render(<CommunityEmptyState />);

    const illustration = screen
      .getByTestId("community-empty-state")
      .querySelector('[aria-hidden="true"]');

    expect(illustration).not.toBeNull();
  });
});
