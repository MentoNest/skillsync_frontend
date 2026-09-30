import { render, screen, fireEvent } from "@testing-library/react";
import {
  CommunityCategories,
  type CommunityCategoryOption,
} from "@/components/community/CommunityCategories";

const categories: CommunityCategoryOption[] = [
  { id: "general", name: "General", discussionCount: 45 },
  { id: "career", name: "Career", discussionCount: 32 },
];

describe("CommunityCategories", () => {
  it("renders every category with its discussion count", () => {
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory={null}
        onCategoryChange={() => {}}
      />
    );

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("Career")).toBeInTheDocument();
    expect(screen.getByText("32")).toBeInTheDocument();
  });

  it("is exposed as a labelled navigation region", () => {
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory={null}
        onCategoryChange={() => {}}
      />
    );

    expect(
      screen.getByRole("navigation", { name: "Community categories" })
    ).toBeInTheDocument();
  });

  it("marks the selected category as current", () => {
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory="career"
        onCategoryChange={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Career/ })).toHaveAttribute(
      "aria-current",
      "true"
    );
    expect(screen.getByRole("button", { name: /General/ })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("navigates when a category is selected", () => {
    const onCategoryChange = jest.fn();
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory={null}
        onCategoryChange={onCategoryChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Career/ }));
    expect(onCategoryChange).toHaveBeenCalledWith("career");
  });

  it("clears the filter from the All entry", () => {
    const onCategoryChange = jest.fn();
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory="career"
        onCategoryChange={onCategoryChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(onCategoryChange).toHaveBeenCalledWith(null);
  });

  it("hides the All entry when allLabel is null", () => {
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory={null}
        onCategoryChange={() => {}}
        allLabel={null}
      />
    );

    expect(screen.queryByRole("button", { name: "All" })).toBeNull();
  });

  it("slots a per-category action such as the follow toggle", () => {
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory={null}
        onCategoryChange={() => {}}
        renderCategoryAction={(category) => (
          <button type="button">Follow {category.name}</button>
        )}
      />
    );

    expect(
      screen.getByRole("button", { name: "Follow General" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Follow Career" })
    ).toBeInTheDocument();
  });

  it("renders optional heading metadata", () => {
    render(
      <CommunityCategories
        categories={categories}
        selectedCategory={null}
        onCategoryChange={() => {}}
        headerMeta={<span>2 followed</span>}
      />
    );

    expect(screen.getByText("2 followed")).toBeInTheDocument();
  });
});
