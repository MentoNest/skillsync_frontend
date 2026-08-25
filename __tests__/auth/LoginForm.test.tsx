import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/auth/LoginForm";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockLogin = jest.fn();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/login"),
}));

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
    error: null,
  }),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Re-render helper that lets us pass per-test context values via prop drilling
// pattern — since we can't re-mock between tests in the same file easily with
// jest.mock, we use a simple wrapper that reads from our mutable mock.
const mockAuthState = {
  login: mockLogin,
  isLoading: false,
  error: null as string | null,
};

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => mockAuthState,
}));

function renderForm() {
  const user = userEvent.setup();
  const utils = render(<LoginForm />);
  return { user, ...utils };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  jest.clearAllMocks();
  mockLogin.mockResolvedValue(undefined);
  mockAuthState.isLoading = false;
  mockAuthState.error = null;
});

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    renderForm();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Use name attribute to avoid matching the "Show password" aria-label button
    expect(
      document.querySelector('input[name="password"]'),
    ).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    renderForm();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("submit button is disabled on initial render (form is empty / invalid)", () => {
    renderForm();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
  });

  it("has noValidate on the form element", () => {
    const { container } = renderForm();
    expect(container.querySelector("form")).toHaveAttribute("novalidate");
  });

  it("shows 'Email is required' after touching and clearing email field", async () => {
    const { user } = renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    await user.click(emailInput);
    await user.tab(); // blur triggers onTouched validation
    await waitFor(() =>
      expect(screen.getByText(/email is required/i)).toBeInTheDocument(),
    );
  });

  it("shows email format error for invalid email", async () => {
    const { user } = renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "not-an-email");
    await user.tab();
    await waitFor(() =>
      expect(
        screen.getByText(/enter a valid email address/i),
      ).toBeInTheDocument(),
    );
  });

  it("shows 'Password is required' after touching and clearing password field", async () => {
    const { user } = renderForm();
    // Use name attribute to avoid matching the "Show password" toggle button
    const passwordInput = document.querySelector<HTMLInputElement>(
      'input[name="password"]',
    )!;
    await user.click(passwordInput);
    await user.tab();
    await waitFor(() =>
      expect(screen.getByText(/password is required/i)).toBeInTheDocument(),
    );
  });

  it("enables the submit button when both email and password are valid", async () => {
    const { user } = renderForm();
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    const passwordInput = document.querySelector<HTMLInputElement>(
      'input[name="password"]',
    )!;
    await user.type(passwordInput, "secret123");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /sign in/i })).toBeEnabled(),
    );
  });

  it("calls login() with the correct credentials on valid submission", async () => {
    const { user } = renderForm();
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    const passwordInput = document.querySelector<HTMLInputElement>(
      'input[name="password"]',
    )!;
    await user.type(passwordInput, "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        email: "jane@example.com",
        password: "secret123",
      }),
    );
  });

  it("redirects to /dashboard after successful login", async () => {
    const { user } = renderForm();
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    const passwordInput = document.querySelector<HTMLInputElement>(
      'input[name="password"]',
    )!;
    await user.type(passwordInput, "secret123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
  });

  it("does not call login() when form fields are empty", async () => {
    const { user } = renderForm();
    // Button is disabled so click should be a no-op, but let's verify
    const btn = screen.getByRole("button", { name: /sign in/i });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("shows the API error when AuthContext provides one", () => {
    mockAuthState.error = "Invalid credentials";
    renderForm();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("shows spinner and 'Signing in…' text while isLoading", () => {
    mockAuthState.isLoading = true;
    renderForm();
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });

  it("input has aria-invalid set to true when there is an error", async () => {
    const { user } = renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    await user.click(emailInput);
    await user.tab();
    await waitFor(() =>
      expect(emailInput).toHaveAttribute("aria-invalid", "true"),
    );
  });

  it("error message is linked to input via aria-describedby", async () => {
    const { user } = renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    await user.click(emailInput);
    await user.tab();
    await waitFor(() => {
      const errorEl = screen.getByText(/email is required/i);
      const describedBy = emailInput.getAttribute("aria-describedby") ?? "";
      expect(describedBy).toContain(errorEl.id);
    });
  });
});
