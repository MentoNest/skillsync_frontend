// src/components/auth/SocialAuthButtons.test.tsx
import { render, screen } from "@testing-library/react";
import { SocialAuthButtons } from "./SocialAuthButtons";

describe("SocialAuthButtons", () => {
  it("renders Google and Facebook buttons", () => {
    render(<SocialAuthButtons />);
    expect(screen.getByLabelText("Continue with Google")).toBeInTheDocument();
    expect(screen.getByLabelText("Continue with Facebook")).toBeInTheDocument();
  });

  it("renders divider with or text", () => {
    render(<SocialAuthButtons />);
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  it("shows Continue label in login mode", () => {
    render(<SocialAuthButtons mode="login" />);
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
    expect(screen.getByText("Continue with Facebook")).toBeInTheDocument();
  });

  it("shows Sign up label in register mode", () => {
    render(<SocialAuthButtons mode="register" />);
    expect(screen.getByText("Sign up with Google")).toBeInTheDocument();
    expect(screen.getByText("Sign up with Facebook")).toBeInTheDocument();
  });
});
