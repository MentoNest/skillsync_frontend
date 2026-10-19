import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UpcomingEvents } from "@/components/community/UpcomingEvents";
import { trackEventRegistered } from "@/lib/community-analytics";
import type { CommunityEvent } from "@/lib/community-types";

jest.mock("@/lib/community-analytics", () => ({
  trackEventRegistered: jest.fn(),
}));

const event: CommunityEvent = {
  id: "resume-review-clinic",
  title: "Resume Review Clinic",
  host: "SkillSync Mentors",
  startsAt: "2026-10-06T16:00:00.000Z",
  endsAt: "2026-10-06T17:00:00.000Z",
  registrationCount: 42,
};

describe("UpcomingEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the event title, host and registration count", () => {
    render(<UpcomingEvents events={[event]} />);

    expect(screen.getByText("Resume Review Clinic")).toBeInTheDocument();
    expect(screen.getByText("SkillSync Mentors")).toBeInTheDocument();
    expect(screen.getByText("42 registrations")).toBeInTheDocument();
  });

  it("renders the date and time as machine readable elements", () => {
    const { container } = render(<UpcomingEvents events={[event]} />);

    // One <time> for the date and one for the start time.
    expect(
      container.querySelectorAll(`time[datetime="${event.startsAt}"]`)
    ).toHaveLength(2);
    expect(
      container.querySelector(`time[datetime="${event.endsAt}"]`)
    ).not.toBeNull();
  });

  it("skips the schedule row when the timestamp cannot be parsed", () => {
    const { container } = render(
      <UpcomingEvents events={[{ ...event, startsAt: "not-a-date" }]} />
    );

    expect(container.querySelector("time")).toBeNull();
    expect(screen.getByText("Resume Review Clinic")).toBeInTheDocument();
  });

  it("renders the empty state when nothing is scheduled", () => {
    render(<UpcomingEvents events={[]} />);

    expect(screen.getByText("No events scheduled yet")).toBeInTheDocument();
  });

  it("registers the viewer and switches the CTA to the registered state", async () => {
    const onRegister = jest.fn().mockResolvedValue(undefined);
    render(<UpcomingEvents events={[event]} onRegister={onRegister} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Register for Resume Review Clinic",
      })
    );

    expect(onRegister).toHaveBeenCalledWith("resume-review-clinic");

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: "Registered for Resume Review Clinic",
        })
      ).toBeDisabled();
    });
  });

  it("records the registration analytics conversion", async () => {
    render(<UpcomingEvents events={[event]} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Register for Resume Review Clinic",
      })
    );

    await waitFor(() => {
      expect(trackEventRegistered).toHaveBeenCalledWith("resume-review-clinic");
    });
  });

  it("starts already registered when the event says so", () => {
    render(<UpcomingEvents events={[{ ...event, isRegistered: true }]} />);

    expect(
      screen.getByRole("button", {
        name: "Registered for Resume Review Clinic",
      })
    ).toBeDisabled();
  });

  it("surfaces a failed registration without losing the event", async () => {
    const onRegister = jest.fn().mockRejectedValue(new Error("Event is full"));
    render(<UpcomingEvents events={[event]} onRegister={onRegister} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Register for Resume Review Clinic",
      })
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Event is full");
    });
    expect(trackEventRegistered).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", {
        name: "Register for Resume Review Clinic",
      })
    ).not.toBeDisabled();
  });
});
