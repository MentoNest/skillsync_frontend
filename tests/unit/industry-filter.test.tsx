import { render, screen, fireEvent } from "@testing-library/react";
import { IndustryFilter, DEFAULT_INDUSTRIES } from "@/components/mentor-discovery/IndustryFilter";

describe("IndustryFilter Component", () => {
  it("renders all default industry options", () => {
    render(<IndustryFilter selectedIndustries={[]} onChange={jest.fn()} />);

    DEFAULT_INDUSTRIES.forEach((industry) => {
      expect(screen.getByText(industry)).toBeInTheDocument();
    });
  });

  it("supports multiple industry selections", () => {
    const handleChange = jest.fn();
    render(
      <IndustryFilter
        selectedIndustries={["Technology"]}
        onChange={handleChange}
      />
    );

    // Click Healthcare to add it to selected industries
    const healthcareCheckbox = screen.getByLabelText("Filter by Healthcare industry");
    fireEvent.click(healthcareCheckbox);

    expect(handleChange).toHaveBeenCalledWith(["Technology", "Healthcare"]);
  });

  it("removes an industry when unchecked", () => {
    const handleChange = jest.fn();
    render(
      <IndustryFilter
        selectedIndustries={["Technology", "Finance"]}
        onChange={handleChange}
      />
    );

    // Uncheck Finance
    const financeCheckbox = screen.getByLabelText("Filter by Finance industry");
    fireEvent.click(financeCheckbox);

    expect(handleChange).toHaveBeenCalledWith(["Technology"]);
  });

  it("shows count badge when selected industries are active", () => {
    render(
      <IndustryFilter
        selectedIndustries={["Technology", "Finance"]}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("clears all selected industries when Clear button is clicked", () => {
    const handleChange = jest.fn();
    render(
      <IndustryFilter
        selectedIndustries={["Technology", "Healthcare"]}
        onChange={handleChange}
      />
    );

    const clearButton = screen.getByRole("button", { name: /clear industry filters/i });
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("displays mentor counts per industry when provided", () => {
    const counts = {
      Technology: 150,
      Finance: 42,
    };

    render(
      <IndustryFilter
        selectedIndustries={[]}
        onChange={jest.fn()}
        counts={counts}
      />
    );

    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("provides accessible group and checkbox labeling", () => {
    render(
      <IndustryFilter
        selectedIndustries={["Gaming"]}
        onChange={jest.fn()}
      />
    );

    const group = screen.getByRole("group");
    expect(group).toBeInTheDocument();

    const gamingCheckbox = screen.getByLabelText("Filter by Gaming industry");
    expect(gamingCheckbox).toBeChecked();

    const techCheckbox = screen.getByLabelText("Filter by Technology industry");
    expect(techCheckbox).not.toBeChecked();
  });
});
