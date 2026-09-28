import { render, screen, fireEvent } from "@testing-library/react";
import {
  ExpertiseFilter,
  DEFAULT_EXPERTISE_CATEGORIES,
} from "@/components/mentor-discovery/ExpertiseFilter";

describe("ExpertiseFilter Component", () => {
  it("renders all default expertise options", () => {
    render(<ExpertiseFilter selectedExpertise={[]} onChange={jest.fn()} />);

    DEFAULT_EXPERTISE_CATEGORIES.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("includes the issue's example categories", () => {
    ["Frontend", "Backend", "UI/UX", "Product Management", "DevOps"].forEach(
      (category) => {
        expect(DEFAULT_EXPERTISE_CATEGORIES).toContain(category);
      }
    );
  });

  it("supports multiple expertise selections", () => {
    const handleChange = jest.fn();
    render(
      <ExpertiseFilter selectedExpertise={["Frontend"]} onChange={handleChange} />
    );

    fireEvent.click(screen.getByLabelText("Filter by Backend expertise"));

    expect(handleChange).toHaveBeenCalledWith(["Frontend", "Backend"]);
  });

  it("removes a category when unchecked", () => {
    const handleChange = jest.fn();
    render(
      <ExpertiseFilter
        selectedExpertise={["Frontend", "DevOps"]}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByLabelText("Filter by DevOps expertise"));

    expect(handleChange).toHaveBeenCalledWith(["Frontend"]);
  });

  it("shows a count badge when categories are selected", () => {
    render(
      <ExpertiseFilter
        selectedExpertise={["Frontend", "Backend"]}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("clears all selected categories when Clear is clicked", () => {
    const handleChange = jest.fn();
    render(
      <ExpertiseFilter
        selectedExpertise={["Frontend", "UI/UX"]}
        onChange={handleChange}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /clear expertise filters/i })
    );

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("hides the Clear button when nothing is selected", () => {
    render(<ExpertiseFilter selectedExpertise={[]} onChange={jest.fn()} />);

    expect(
      screen.queryByRole("button", { name: /clear expertise filters/i })
    ).not.toBeInTheDocument();
  });

  it("displays mentor counts per category when provided", () => {
    render(
      <ExpertiseFilter
        selectedExpertise={[]}
        onChange={jest.fn()}
        counts={{ Frontend: 12, DevOps: 7 }}
      />
    );

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("provides accessible group and checkbox labeling", () => {
    render(
      <ExpertiseFilter selectedExpertise={["Backend"]} onChange={jest.fn()} />
    );

    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by Backend expertise")).toBeChecked();
    expect(
      screen.getByLabelText("Filter by Frontend expertise")
    ).not.toBeChecked();
  });
});
