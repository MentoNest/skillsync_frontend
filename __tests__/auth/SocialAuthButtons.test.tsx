import React from "react";
import { render, screen } from "@testing-library/react";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

describe("SocialAuthButtons", () => {
  it("renders the Google button", () => {
    render(<SocialAuthButtons />);
    expect(
      screen.getByRole("button", { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it("renders the Facebook button", () => {
    render(<SocialAuthButtons />);
    expect(
      screen.getByRole("button", { name: /continue with facebook/i }),
    ).toBeInTheDocument();
  });

  it("renders both buttons inside a group with social sign-in label", () => {
    render(<SocialAuthButtons />);
    expect(
      screen.getByRole("group", { name: /social sign-in options/i }),
    ).toBeInTheDocument();
  });

  it("renders the default divider label", () => {
    render(<SocialAuthButtons />);
    expect(screen.getByText(/or continue with email/i)).toBeInTheDocument();
  });

  it("renders a custom divider label when supplied", () => {
    render(<SocialAuthButtons dividerLabel="or sign up with email" />);
    expect(screen.getByText(/or sign up with email/i)).toBeInTheDocument();
  });

  it('buttons are of type="button" to avoid accidental form submission', () => {
    render(<SocialAuthButtons />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("type", "button");
    });
  });

  it("has unique ids on each button", () => {
    render(<SocialAuthButtons />);
    expect(
      document.getElementById("btn-continue-with-google"),
    ).toBeInTheDocument();
    expect(
      document.getElementById("btn-continue-with-facebook"),
    ).toBeInTheDocument();
  });
});
