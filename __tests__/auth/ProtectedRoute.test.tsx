import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockUseAuth = jest.fn();
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner when auth is loading', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: true });
    render(<ProtectedRoute><div data-testid="children">Protected Content</div></ProtectedRoute>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();
  });

  it('redirects to /login when user is not authenticated and not loading', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: false });
    render(<ProtectedRoute><div data-testid="children">Protected Content</div></ProtectedRoute>);
    expect(mockPush).toHaveBeenCalledWith('/login');
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, isLoading: false });
    render(<ProtectedRoute><div data-testid="children">Protected Content</div></ProtectedRoute>);
    expect(screen.getByTestId('children')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('does not redirect when loading is true even if not authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: true });
    render(<ProtectedRoute><div data-testid="children">Protected Content</div></ProtectedRoute>);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
