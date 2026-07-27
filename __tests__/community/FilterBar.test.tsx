import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '@/components/community/FilterBar';
import type { SortOrder } from '@/lib/filters';

const defaultProps = {
  category: null,
  sort: 'latest' as SortOrder,
  search: '',
  onCategoryChange: jest.fn(),
  onSortChange: jest.fn(),
  onSearchChange: jest.fn(),
  onReset: jest.fn(),
};

describe('FilterBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders the search input', () => {
      render(<FilterBar {...defaultProps} />);
      expect(screen.getByPlaceholderText(/search discussions/i)).toBeInTheDocument();
    });

    it('renders the sort dropdown', () => {
      render(<FilterBar {...defaultProps} />);
      expect(screen.getByRole('combobox', { name: /sort by/i })).toBeInTheDocument();
    });

    it('shows current search value in the input', () => {
      render(<FilterBar {...defaultProps} search="typescript" />);
      expect(screen.getByPlaceholderText(/search discussions/i)).toHaveValue('typescript');
    });

    it('shows current sort value in the select', () => {
      render(<FilterBar {...defaultProps} sort="popular" />);
      expect(screen.getByRole('combobox', { name: /sort by/i })).toHaveValue('popular');
    });
  });

  describe('search input', () => {
    it('calls onSearchChange when user types in the search field', () => {
      const onSearchChange = jest.fn();
      render(<FilterBar {...defaultProps} onSearchChange={onSearchChange} />);
      fireEvent.change(screen.getByPlaceholderText(/search discussions/i), {
        target: { value: 'react' },
      });
      expect(onSearchChange).toHaveBeenCalledWith('react');
    });
  });

  describe('sort dropdown', () => {
    it('calls onSortChange when user changes the sort option', () => {
      const onSortChange = jest.fn();
      render(<FilterBar {...defaultProps} onSortChange={onSortChange} />);
      fireEvent.change(screen.getByRole('combobox', { name: /sort by/i }), {
        target: { value: 'trending' },
      });
      expect(onSortChange).toHaveBeenCalledWith('trending');
    });

    it('renders all sort options', () => {
      render(<FilterBar {...defaultProps} />);
      const select = screen.getByRole('combobox', { name: /sort by/i });
      const options = Array.from((select as HTMLSelectElement).options).map(
        (o) => o.value
      );
      expect(options).toContain('latest');
      expect(options).toContain('popular');
      expect(options).toContain('trending');
    });
  });

  describe('clear filters button', () => {
    it('does not show Clear filters when no active filters', () => {
      render(<FilterBar {...defaultProps} />);
      expect(screen.queryByText(/clear all filters/i)).not.toBeInTheDocument();
    });

    it('shows Clear filters when search is active', () => {
      render(<FilterBar {...defaultProps} search="test" />);
      expect(screen.getByText(/clear all filters/i)).toBeInTheDocument();
    });

    it('shows Clear filters when a category is selected', () => {
      render(<FilterBar {...defaultProps} category="technical" />);
      expect(screen.getByText(/clear all filters/i)).toBeInTheDocument();
    });

    it('shows Clear filters when sort is not default', () => {
      render(<FilterBar {...defaultProps} sort="popular" />);
      expect(screen.getByText(/clear all filters/i)).toBeInTheDocument();
    });

    it('calls onReset and resets all filters when Clear is clicked', () => {
      const onReset = jest.fn();
      const onCategoryChange = jest.fn();
      const onSortChange = jest.fn();
      const onSearchChange = jest.fn();

      render(
        <FilterBar
          {...defaultProps}
          search="test"
          onReset={onReset}
          onCategoryChange={onCategoryChange}
          onSortChange={onSortChange}
          onSearchChange={onSearchChange}
        />
      );

      fireEvent.click(screen.getByText(/clear all filters/i));

      expect(onReset).toHaveBeenCalled();
      expect(onCategoryChange).toHaveBeenCalledWith(null);
      expect(onSortChange).toHaveBeenCalledWith('latest');
      expect(onSearchChange).toHaveBeenCalledWith('');
    });

    it('does not show Clear filters button when onReset is not provided', () => {
      render(
        <FilterBar
          {...defaultProps}
          search="test"
          onReset={undefined}
        />
      );
      expect(screen.queryByText(/clear all filters/i)).not.toBeInTheDocument();
    });
  });
});
