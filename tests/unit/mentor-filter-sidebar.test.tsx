import { render, screen, fireEvent } from "@testing-library/react";
import MentorFilterSidebar from "@/components/mentor-discovery/MentorFilterSidebar";
import { MentorFilters } from "@/lib/mentor-types";

function setup(filters: MentorFilters = {}, variant: "list" | "pills" = "list") {
  const onFiltersChange = jest.fn();
  const onClearFilters = jest.fn();
  render(
    <MentorFilterSidebar
      filters={filters}
      onFiltersChange={onFiltersChange}
      onClearFilters={onClearFilters}
      variant={variant}
    />
  );
  return { onFiltersChange, onClearFilters };
}

describe("MentorFilterSidebar", () => {
  it("renders every filter control", () => {
    setup();
    expect(screen.getByText("Expertise")).toBeInTheDocument();
    expect(screen.getByText("Experience Level")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByLabelText("Minimum Rating")).toBeInTheDocument();
    expect(screen.getByLabelText("Max Hourly Rate")).toBeInTheDocument();
  });

  it("changing one control only updates its own filter key", () => {
    const { onFiltersChange } = setup({ industry: ["Finance"], minRating: 4 });
    fireEvent.click(screen.getByLabelText("Frontend"));
    expect(onFiltersChange).toHaveBeenCalledWith({
      industry: ["Finance"],
      minRating: 4,
      expertise: ["Frontend"],
    });
  });

  it("removes a key when its last value is unchecked", () => {
    const { onFiltersChange } = setup({ expertise: ["Frontend"] });
    fireEvent.click(screen.getByLabelText("Frontend"));
    expect(onFiltersChange).toHaveBeenCalledWith({ expertise: undefined });
  });

  it("supports multi-select within a group", () => {
    const { onFiltersChange } = setup({ experience: ["senior"] });
    fireEvent.click(screen.getByLabelText("lead"));
    expect(onFiltersChange).toHaveBeenCalledWith({ experience: ["senior", "lead"] });
  });

  it("updates max hourly rate and clears it when emptied", () => {
    const { onFiltersChange } = setup({ maxHourlyRate: 200 });
    fireEvent.change(screen.getByLabelText("Max Hourly Rate"), { target: { value: "" } });
    expect(onFiltersChange).toHaveBeenCalledWith({ maxHourlyRate: undefined });
  });

  it("hides Clear all when nothing is active and shows it otherwise", () => {
    const { unmount } = render(
      <MentorFilterSidebar filters={{}} onFiltersChange={jest.fn()} onClearFilters={jest.fn()} />
    );
    expect(screen.queryByRole("button", { name: /clear all mentor filters/i })).not.toBeInTheDocument();
    unmount();
    const { onClearFilters } = setup({ expertise: ["Backend"], minRating: 4 });
    expect(screen.getByText("2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /clear all mentor filters/i }));
    expect(onClearFilters).toHaveBeenCalled();
  });

  it("does not count sort settings as active filters", () => {
    setup({ sortBy: "rating", sortOrder: "desc" });
    expect(screen.queryByRole("button", { name: /clear all mentor filters/i })).not.toBeInTheDocument();
  });

  it("renders the pills variant for the mobile drawer and can hide the header", () => {
    const onFiltersChange = jest.fn();
    render(
      <MentorFilterSidebar
        filters={{}}
        onFiltersChange={onFiltersChange}
        onClearFilters={jest.fn()}
        variant="pills"
        showHeader={false}
      />
    );
    expect(screen.queryByText("Filters")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Healthcare"));
    expect(onFiltersChange).toHaveBeenCalledWith({ industry: ["Healthcare"] });
  });
});
