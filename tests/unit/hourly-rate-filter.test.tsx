import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import HourlyRateFilter from "@/components/mentor-discovery/HourlyRateFilter";
import { HOURLY_RATE_DOMAIN_MAX, HOURLY_RATE_DOMAIN_MIN } from "@/lib/hourly-rate";
import type { HourlyRateRange } from "@/lib/hourly-rate";

/** Mirrors how the mentor pages use the filter: state feeds back as props. */
function ControlledFilter({
  initial,
  onRange,
}: {
  initial?: HourlyRateRange;
  onRange: (range: HourlyRateRange) => void;
}) {
  const [range, setRange] = useState<HourlyRateRange>(initial ?? {});

  return (
    <HourlyRateFilter
      minHourlyRate={range.min}
      maxHourlyRate={range.max}
      onChange={(next) => {
        onRange(next);
        setRange(next);
      }}
    />
  );
}

describe("HourlyRateFilter Component", () => {
  const setup = (props: Partial<React.ComponentProps<typeof HourlyRateFilter>> = {}) => {
    const onChange = jest.fn();
    const utils = render(
      <HourlyRateFilter onChange={onChange} {...props} />
    );
    return { onChange, ...utils };
  };

  const numberInputs = () =>
    screen.getAllByRole("spinbutton", { name: /hourly rate/i });

  it("renders both a min and a max control", () => {
    setup();
    expect(
      screen.getByRole("spinbutton", { name: "Minimum hourly rate" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Maximum hourly rate" })
    ).toBeInTheDocument();
  });

  it("renders a slider handle per bound", () => {
    setup();
    expect(
      screen.getByRole("slider", { name: "Minimum hourly rate" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("slider", { name: "Maximum hourly rate" })
    ).toBeInTheDocument();
  });

  it("reports no filter when both bounds are unset", () => {
    setup();
    expect(screen.getByText("No rate filter applied.")).toBeInTheDocument();
  });

  describe("numeric inputs", () => {
    it("emits a minimum when the min field is filled", () => {
      const { onChange } = setup();
      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Minimum hourly rate" }),
        { target: { value: "150" } }
      );
      expect(onChange).toHaveBeenCalledWith({ min: 150, max: undefined });
    });

    it("emits a maximum when the max field is filled", () => {
      const { onChange } = setup({ maxHourlyRate: 400 });
      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Maximum hourly rate" }),
        { target: { value: "300" } }
      );
      expect(onChange).toHaveBeenCalledWith({ min: undefined, max: 300 });
    });

    it("clears the bound when the field is emptied", () => {
      const { onChange } = setup({ minHourlyRate: 150 });
      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Minimum hourly rate" }),
        { target: { value: "" } }
      );
      expect(onChange).toHaveBeenCalledWith({ min: undefined, max: undefined });
    });

    it("clamps an over-ceiling value to the domain", () => {
      const { onChange } = setup();
      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Maximum hourly rate" }),
        { target: { value: "9999" } }
      );
      expect(onChange).toHaveBeenCalledWith({
        min: undefined,
        max: HOURLY_RATE_DOMAIN_MAX,
      });
    });

    it("swaps the bounds when a typed range is inverted", () => {
      const onRange = jest.fn();
      render(<ControlledFilter onRange={onRange} />);

      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Maximum hourly rate" }),
        { target: { value: "100" } }
      );
      // Props now carry max=100, so entering min=400 is an inverted range.
      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Minimum hourly rate" }),
        { target: { value: "400" } }
      );

      expect(onRange).toHaveBeenLastCalledWith({ min: 100, max: 400 });
    });

    it("shows the swapped values back in the fields", () => {
      render(<ControlledFilter onRange={jest.fn()} />);

      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Maximum hourly rate" }),
        { target: { value: "100" } }
      );
      fireEvent.change(
        screen.getByRole("spinbutton", { name: "Minimum hourly rate" }),
        { target: { value: "400" } }
      );

      const [min, max] = numberInputs();
      expect(min).toHaveValue(100);
      expect(max).toHaveValue(400);
    });

    it("reflects the supplied bounds into the fields", () => {
      setup({ minHourlyRate: 125, maxHourlyRate: 300 });
      const [min, max] = numberInputs();
      expect(min).toHaveValue(125);
      expect(max).toHaveValue(300);
    });
  });

  describe("slider", () => {
    it("emits a minimum when the low handle moves", () => {
      const { onChange } = setup();
      fireEvent.change(
        screen.getByRole("slider", { name: "Minimum hourly rate" }),
        { target: { value: "200" } }
      );
      expect(onChange).toHaveBeenCalledWith({ min: 200, max: undefined });
    });

    it("will not drag the low handle above the high one", () => {
      const { onChange } = setup({ maxHourlyRate: 250 });
      fireEvent.change(
        screen.getByRole("slider", { name: "Minimum hourly rate" }),
        { target: { value: "450" } }
      );
      expect(onChange).toHaveBeenCalledWith({ min: 250, max: 250 });
    });

    it("will not drag the high handle below the low one", () => {
      const { onChange } = setup({ minHourlyRate: 250 });
      fireEvent.change(
        screen.getByRole("slider", { name: "Maximum hourly rate" }),
        { target: { value: "50" } }
      );
      expect(onChange).toHaveBeenCalledWith({ min: 250, max: 250 });
    });
  });

  describe("clear affordance", () => {
    it("is hidden until a bound is set", () => {
      setup();
      expect(screen.queryByRole("button", { name: "Any rate" })).not.toBeInTheDocument();
    });

    it("clears both bounds when activated", () => {
      const { onChange } = setup({ minHourlyRate: 100, maxHourlyRate: 300 });
      fireEvent.click(screen.getByRole("button", { name: "Any rate" }));
      expect(onChange).toHaveBeenCalledWith({ min: undefined, max: undefined });
    });

    it("can be hidden", () => {
      setup({ minHourlyRate: 100, showClear: false });
      expect(screen.queryByRole("button", { name: "Any rate" })).not.toBeInTheDocument();
    });
  });

  it("summarises the active range for screen readers", () => {
    setup({ minHourlyRate: 100, maxHourlyRate: 300 });
    expect(
      screen.getByText("Showing mentors between $100 and $300 per hour.")
    ).toBeInTheDocument();
  });

  it("falls back to the domain bounds when one side is open", () => {
    setup({ minHourlyRate: 150 });
    expect(
      screen.getByText(
        `Showing mentors between $150 and $${HOURLY_RATE_DOMAIN_MAX} per hour.`
      )
    ).toBeInTheDocument();
  });

  it("uses a custom domain for the slider bounds", () => {
    setup({ domainMin: 50, domainMax: 400 });
    const slider = screen.getByRole("slider", {
      name: "Minimum hourly rate",
    });
    expect(slider).toHaveAttribute("min", "50");
    expect(slider).toHaveAttribute("max", "400");
  });

  it("defaults the slider to the full domain when nothing is selected", () => {
    setup();
    const slider = screen.getByRole("slider", {
      name: "Minimum hourly rate",
    });
    expect(slider).toHaveValue(String(HOURLY_RATE_DOMAIN_MIN));
  });
});

// Guards the shape the parent pages depend on.
describe("HourlyRateFilter onChange contract", () => {
  it("only ever reports keys min and max", () => {
    const seen: HourlyRateRange[] = [];
    render(
      <HourlyRateFilter
        onChange={(range) => seen.push(range)}
        minHourlyRate={100}
      />
    );

    fireEvent.change(
      screen.getByRole("spinbutton", { name: "Maximum hourly rate" }),
      { target: { value: "250" } }
    );

    expect(seen).toHaveLength(1);
    expect(Object.keys(seen[0]).sort()).toEqual(["max", "min"]);
  });
});
