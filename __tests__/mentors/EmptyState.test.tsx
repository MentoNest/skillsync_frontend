import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '@/components/mentors/EmptyState';

describe('EmptyState', () => {
  it('renders search message heading', () => {
    render(<EmptyState />);
    expect(screen.getByText('No mentors match your filters')).toBeInTheDocument();
  });

  it('renders supportive helper text', () => {
    render(<EmptyState />);
    expect(screen.getByText('Try removing a tag or two to broaden your search.')).toBeInTheDocument();
  });

  it('does not render clear-filters button when onClearFilters is missing', () => {
    render(<EmptyState />);
    expect(screen.queryByText('Clear filters')).not.toBeInTheDocument();
  });

  it('renders clear-filters button when onClearFilters is provided', () => {
    const onClearFilters = jest.fn();
    render(<EmptyState onClearFilters={onClearFilters} />);
    expect(screen.getByText('Clear filters')).toBeInTheDocument();
  });

  it('invokes onClearFilters when the button is clicked', () => {
    const onClearFilters = jest.fn();
    render(<EmptyState onClearFilters={onClearFilters} />);
    fireEvent.click(screen.getByText('Clear filters'));
    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });
});
