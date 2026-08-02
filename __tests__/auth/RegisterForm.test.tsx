import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/components/auth/RegisterForm";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockRegisterUser = jest.fn();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/register"),
}));

const mockAuthState = {
  register: mockRegisterUser,
  isLoading: false,
  error: null as string | null,
};

jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => mockAuthState,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderForm() {
  const user = userEvent.setup();
  const utils = render(<RegisterForm />);
  return { user, ...utils };
}

/** Returns the password and confirmPassword <input> elements by name attr */
function getPasswordInputs() {
  const password = document.querySelector<HTMLInputElement>(
    'input[name="password"]',
  )!;
  const confirmPassword = document.querySelector<HTMLInputElement>(
    'input[name="confirmPassword"]',
  )!;
  return { password, confirmPassword };
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
  await user.type(screen.getByLabelText(/email/i), "jane@example.com");
  const { password, confirmPassword } = getPasswordInputs();
  await user.type(password, "Password1!");
  await user.type(confirmPassword, "Password1!");
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  jest.clearAllMocks();
  mockRegisterUser.mockResolvedValue(undefined);
  mockAuthState.isLoading = false;
  mockAuthState.error = null;
});

describe("RegisterForm", () => {
  it("renders all four fields (name, email, password, confirm password)", () => {
    renderForm();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Query by name attribute to get exactly the two <input> elements
    expect(
      document.querySelector('input[name="password"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('input[name="confirmPassword"]'),
    ).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    renderForm();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("submit button is disabled on initial render", () => {
    renderForm();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeDisabled();
  });

  it("has noValidate on the form element", () => {
    const { container } = renderForm();
    expect(container.querySelector("form")).toHaveAttribute("novalidate");
  });

  it("shows 'Full name is required' after touching empty name field", async () => {
    const { user } = renderForm();
    await user.click(screen.getByLabelText(/full name/i));
    await user.tab();
    await waitFor(() =>
      expect(screen.getByText(/full name is required/i)).toBeInTheDocument(),
    );
  });

  it("shows 'Email is required' after touching empty email field", async () => {
    const { user } = renderForm();
    await user.click(screen.getByLabelText(/email/i));
    await user.tab();
    await waitFor(() =>
      expect(screen.getByText(/email is required/i)).toBeInTheDocument(),
    );
  });

  it("shows email format error for an invalid address", async () => {
    const { user } = renderForm();
    await user.type(screen.getByLabelText(/email/i), "bad@@email");
    await user.tab();
    await waitFor(() =>
      expect(
        screen.getByText(/enter a valid email address/i),
      ).toBeInTheDocument(),
    );
  });

  it("shows password length error for passwords shorter than 8 chars", async () => {
    const { user } = renderForm();
    const { password: passwordInput } = getPasswordInputs();
    await user.type(passwordInput, "short");
    await user.tab();
    await waitFor(() =>
      expect(
        screen.getByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument(),
    );
  });

  it("shows 'Passwords don't match' when confirmPassword differs", async () => {
    const { user } = renderForm();
    const { password: passwordInput, confirmPassword: confirmInput } =
      getPasswordInputs();
    await user.type(passwordInput, "Password1!");
    await user.type(confirmInput, "Different1!");
    await user.tab();
    await waitFor(() =>
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument(),
    );
  });

  it("renders the password strength meter when password field has a value", async () => {
    const { user } = renderForm();
    const { password: passwordInput } = getPasswordInputs();
    await user.type(passwordInput, "abc");
    await waitFor(() => expect(screen.getByText(/weak/i)).toBeInTheDocument());
  });

  it("shows 'Strong' strength label for a complex password", async () => {
    const { user } = renderForm();
    const { password: passwordInput } = getPasswordInputs();
    await user.type(passwordInput, "Complex1!");
    await waitFor(() =>
      expect(screen.getByText(/strong/i)).toBeInTheDocument(),
    );
  });

  it("enables submit button when all fields are valid", async () => {
    const { user } = renderForm();
    await fillValidForm(user);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeEnabled(),
    );
  });

  it("calls register() with name, email and password (NOT confirmPassword)", async () => {
    const { user } = renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /create account/i }));
    await waitFor(() =>
      expect(mockRegisterUser).toHaveBeenCalledWith({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "Password1!",
      }),
    );
    // confirmPassword must NOT be in the call
    expect(mockRegisterUser).not.toHaveBeenCalledWith(
      expect.objectContaining({ confirmPassword: expect.anything() }),
    );
  });

  it("redirects to /dashboard on successful registration", async () => {
    const { user } = renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /create account/i }));
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
  });

  it("does not call register() when the form is invalid", async () => {
    const { user } = renderForm();
    const btn = screen.getByRole("button", { name: /create account/i });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(mockRegisterUser).not.toHaveBeenCalled();
  });

  it("displays the API error from AuthContext", () => {
    mockAuthState.error = "Email already in use";
    renderForm();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
  });

  it("shows spinner and 'Creating account…' while isLoading", () => {
    mockAuthState.isLoading = true;
    renderForm();
    expect(screen.getByText(/creating account/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /creating account/i }),
    ).toBeDisabled();
  });

  it("does not submit with mismatched passwords even if button is manually triggered", async () => {
    const { user } = renderForm();
    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    const { password: passwordInput, confirmPassword: confirmInput } =
      getPasswordInputs();
    await user.type(passwordInput, "Password1!");
    await user.type(confirmInput, "WrongPass1!");
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeDisabled(),
    );
    expect(mockRegisterUser).not.toHaveBeenCalled();
  });

  it("sets aria-invalid on input when it has a validation error", async () => {
    const { user } = renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    await user.click(emailInput);
    await user.tab();
    await waitFor(() =>
      expect(emailInput).toHaveAttribute("aria-invalid", "true"),
    );
  });
});
