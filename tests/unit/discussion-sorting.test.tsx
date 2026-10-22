import { fireEvent, render, screen } from "@testing-library/react";
import { DiscussionFilters } from "@/components/community/DiscussionFilters";
import type { DiscussionSort } from "@/lib/community-types";

function renderFilters(
  sortBy: DiscussionSort = "trending",
  onSortChange: (sort: DiscussionSort) => void = () => {}
) {
  render(
    <DiscussionFilters
      selectedCategory={null}
      searchQuery=""
      sortBy={sortBy}
      onCategoryChange={() => {}}
      onSearchChange={() => {}}
      onSortChange={onSortChange}
    />
  );
}

describe("DiscussionFilters sorting (#1249)", () => {
  it("offers Trending, Latest, Most Replies and Most Liked", () => {
    renderFilters();

    const select = screen.getByRole("combobox", { name: "Sort discussions" });
    const options = Array.from(select.querySelectorAll("option")).map(
      (option) => option.textContent
    );

    expect(options).toEqual(["Trending", "Latest", "Most Replies", "Most Liked"]);
  });

  it("reflects the active sort", () => {
    renderFilters("most-replies");

    expect(
      screen.getByRole("combobox", { name: "Sort discussions" })
    ).toHaveValue("most-replies");
  });

  it.each<[string, DiscussionSort]>([
    ["Trending", "trending"],
    ["Latest", "latest"],
    ["Most Replies", "most-replies"],
    ["Most Liked", "most-liked"],
  ])("reports %s selection to the parent", (label, value) => {
    const onSortChange = jest.fn();
    renderFilters("trending", onSortChange);

    fireEvent.change(screen.getByRole("combobox", { name: "Sort discussions" }), {
      target: { value },
    });

    expect(onSortChange).toHaveBeenCalledWith(value);
  });
});
