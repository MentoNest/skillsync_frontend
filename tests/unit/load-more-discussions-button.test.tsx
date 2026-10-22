import { render, screen, fireEvent } from "@testing-library/react";
import { LoadMoreDiscussionsButton } from "@/components/community/LoadMoreDiscussionsButton";

describe("LoadMoreDiscussionsButton", () => {
  it("renders a button while more discussions are available", () => {
    render(
      <LoadMoreDiscussionsButton hasMore onLoadMore={() => {}} />
    );
    expect(
      screen.getByRole("button", { name: "Load more discussions" })
    ).toBeInTheDocument();
  });

  it("calls onLoadMore when clicked", () => {
    const onLoadMore = jest.fn();
    render(<LoadMoreDiscussionsButton hasMore onLoadMore={onLoadMore} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Load more discussions" })
    );

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("shows the loading state and disables the button while fetching", () => {
    const onLoadMore = jest.fn();
    render(
      <LoadMoreDiscussionsButton
        hasMore
        isLoading
        onLoadMore={onLoadMore}
      />
    );

    const button = screen.getByRole("button", { name: "Loading…" });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("honours an externally disabled button", () => {
    const onLoadMore = jest.fn();
    render(
      <LoadMoreDiscussionsButton
        hasMore
        disabled
        onLoadMore={onLoadMore}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("swaps to the end-of-results message when there is no more to load", () => {
    render(
      <LoadMoreDiscussionsButton hasMore={false} onLoadMore={() => {}} />
    );

    expect(
      screen.getByText("You've reached the end of the feed")
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("accepts a custom label and end message for reuse", () => {
    const { rerender } = render(
      <LoadMoreDiscussionsButton
        hasMore
        label="Load more mentors"
        onLoadMore={() => {}}
      />
    );
    expect(
      screen.getByRole("button", { name: "Load more mentors" })
    ).toBeInTheDocument();

    rerender(
      <LoadMoreDiscussionsButton
        hasMore={false}
        endMessage="No more mentors"
        onLoadMore={() => {}}
      />
    );
    expect(screen.getByText("No more mentors")).toBeInTheDocument();
  });

  it("announces loading through a live region", () => {
    render(
      <LoadMoreDiscussionsButton hasMore isLoading onLoadMore={() => {}} />
    );
    expect(
      screen.getByText("Loading more discussions")
    ).toBeInTheDocument();
  });
});
