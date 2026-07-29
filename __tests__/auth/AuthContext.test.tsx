import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockLogout = jest.fn().mockResolvedValue(undefined);
const mockGetMe = jest.fn();

jest.mock('@/lib/auth-service', () => ({
  authService: {
    login: (...args: unknown[]) => mockLogin(...args),
    register: (...args: unknown[]) => mockRegister(...args),
    logout: (...args: unknown[]) => mockLogout(...args),
    getMe: (...args: unknown[]) => mockGetMe(...args),
  },
}));

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

function TestConsumer() {
  const { user, isAuthenticated, isLoading, error, login, register, logout } = useAuth();

  return (
    <div>
      <span data-testid="auth-status">
        {isLoading ? 'loading' : isAuthenticated ? 'authenticated' : 'unauthenticated'}
      </span>
      <span data-testid="user-name">{user?.name ?? 'none'}</span>
      <span data-testid="error">{error ?? 'none'}</span>
      <button data-testid="login-btn" onClick={() => login({ email: 'test@test.com', password: 'pass' })}>
        Login
      </button>
      <button data-testid="register-btn" onClick={() => register({ name: 'Test', email: 'test@test.com', password: 'password123' })}>
        Register
      </button>
      <button data-testid="logout-btn" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('starts unauthenticated with no persisted token', () => {
    renderWithProvider();
    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
  });

  it('shows loading during initial token validation when token exists', async () => {
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({ user: { id: '1', email: 'test@test.com', name: 'Test', role: 'user' }, token: 'mock-token' }),
    );
    mockGetMe.mockReturnValueOnce(new Promise((resolve) => {
      setTimeout(() => resolve({ id: '1', email: 'test@test.com', name: 'Validated User', role: 'user' }), 100);
    }));

    renderWithProvider();
    expect(screen.getByTestId('auth-status').textContent).toBe('loading');

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    });
    expect(screen.getByTestId('user-name').textContent).toBe('Validated User');
  });

  it('logs in successfully and updates state', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({
      user: { id: '1', email: 'test@test.com', name: 'Test User', role: 'user' },
      token: 'mock-token',
    });

    renderWithProvider();
    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    });
    expect(screen.getByTestId('user-name').textContent).toBe('Test User');
  });

  it('registers successfully and updates state', async () => {
    const user = userEvent.setup();
    mockRegister.mockResolvedValueOnce({
      user: { id: '2', email: 'new@test.com', name: 'New User', role: 'user' },
      token: 'new-token',
    });

    renderWithProvider();
    await user.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    });
    expect(screen.getByTestId('user-name').textContent).toBe('New User');
  });

  it('logs out and clears state', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({
      user: { id: '1', email: 'test@test.com', name: 'Test User', role: 'user' },
      token: 'mock-token',
    });

    renderWithProvider();
    await user.click(screen.getByTestId('login-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    });

    await user.click(screen.getByTestId('logout-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    });
    expect(screen.getByTestId('user-name').textContent).toBe('none');
  });

  it('sets error on login failure', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderWithProvider();
    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('Invalid credentials');
    });
  });

  it('hydrates from persisted localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify({ user: { id: '1', email: 'test@test.com', name: 'Persisted User', role: 'user' }, token: 'valid-token' }),
    );
    mockGetMe.mockResolvedValueOnce({ id: '1', email: 'test@test.com', name: 'Persisted User', role: 'user' });

    renderWithProvider();
    expect(screen.getByTestId('user-name').textContent).toBe('Persisted User');
  });

  it('persists state to localStorage after login', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({
      user: { id: '1', email: 'test@test.com', name: 'Test User', role: 'user' },
      token: 'persist-token',
    });

    renderWithProvider();
    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'skillsync_auth',
        expect.stringContaining('persist-token'),
      );
    });
  });
});
