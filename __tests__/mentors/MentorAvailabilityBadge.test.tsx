import React from "react";
import { render, screen } from "@testing-library/react";
import MentorAvailabilityBadge from "@/components/MentorAvailabilityBadge";

describe("MentorAvailabilityBadge Component", () => {
  it("renders Available status with correct badge label", () => {
    render(<MentorAvailabilityBadge status="available" />);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders Busy status correctly", () => {
    render(<MentorAvailabilityBadge status="busy" />);
    expect(screen.getByText("Busy")).toBeInTheDocument();
  });

  it("renders Fully Booked status correctly", () => {
    render(<MentorAvailabilityBadge status="fully-booked" />);
    expect(screen.getByText("Fully Booked")).toBeInTheDocument();
  });
});
