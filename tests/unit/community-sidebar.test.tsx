import { render, screen } from "@testing-library/react";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { useCategoryFollows } from "@/hooks/useCategoryFollows";

// #1000: the sidebar owns the widget stack that moves below the feed on
// tablet/mobile, so pin its responsive classes in tests.
jest.mock("@/hooks/useCategoryFollows", () => ({
  useCategoryFollows: jest.fn(),
}));

const mockedUseCategoryFollows = useCategoryFollows as jest.MockedFunction<
  typeof useCategoryFollows
>;

describe("CommunitySidebar (responsive, #1000)", () => {
  beforeEach(() => {
    mockedUseCategoryFollows.mockReturnValue({
      isFollowing: jest.fn().mockReturnValue(false),
      isPending: jest.fn().mockReturnValue(false),
      error: null,
      followedCount: 0,
      toggle: jest.fn(),
    });
  });

  it("renders the widget stack with stacking spacing at every size", () => {
    const { container } = render(
      <CommunitySidebar
        selectedCategory={null}
        onCategoryChange={jest.fn()}
      />
    );

    const stack = container.firstElementChild as HTMLElement;
    expect(stack.className).toContain("space-y-6");
    // Keeps its content narrow enough to never force horizontal overflow.
    expect(stack.className).toContain("min-w-0");
  });

  it("compacts the category list into two columns on tablet and one on mobile", () => {
    const { container } = render(
      <CommunitySidebar
        selectedCategory={null}
        onCategoryChange={jest.fn()}
      />
    );

    const list = container.querySelector("ul");
    expect(list?.className).toContain("grid-cols-1");
    expect(list?.className).toContain("sm:grid-cols-2");
    expect(list?.className).toContain("lg:grid-cols-1");
  });

  it("exposes the nav with an accessible label", () => {
    render(<CommunitySidebar selectedCategory={null} onCategoryChange={jest.fn()} />);

    expect(
      screen.getByRole("navigation", { name: /community categories/i })
    ).toBeInTheDocument();
  });

  it("truncates long category names instead of overflowing", () => {
    const { container } = render(
      <CommunitySidebar
        selectedCategory={null}
        onCategoryChange={jest.fn()}
      />
    );

    const nameSpans = container.querySelectorAll("ul button > span");
    const truncatable = Array.from(nameSpans).filter((span) =>
      span.className.includes("truncate")
    );
    expect(truncatable.length).toBeGreaterThan(0);
  });

  it("selecting a category routes the change through the callback", () => {
    const onCategoryChange = jest.fn();
    render(
      <CommunitySidebar
        selectedCategory="career"
        onCategoryChange={onCategoryChange}
      />
    );

    screen.getByRole("button", { name: /all/i }).click();
    expect(onCategoryChange).toHaveBeenCalledWith(null);
  });
});
