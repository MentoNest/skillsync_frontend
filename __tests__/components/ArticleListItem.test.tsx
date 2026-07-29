import '@testing-library/jest-dom/jest-globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleListItem from '@/components/ArticleListItem';

const defaultProps = {
  category: 'Career',
  title: 'How to Land Your First Tech Job',
  author: 'Jane Doe',
  readTime: '5 min read',
  href: '/resources/articles/test-article',
};

describe('ArticleListItem', () => {
  it('renders category, title, author, and read time', () => {
    render(<ArticleListItem {...defaultProps} />);
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('How to Land Your First Tech Job')).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/)).toBeInTheDocument();
    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
  });

  it('renders a trending arrow icon', () => {
    const { container } = render(<ArticleListItem {...defaultProps} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(1);
  });

  it('renders as a link with the provided href', () => {
    render(<ArticleListItem {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/resources/articles/test-article');
  });

  it('generates a slug from title when href is not provided', () => {
    const { href, ...rest } = defaultProps;
    render(<ArticleListItem {...rest} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/resources/articles/how-to-land-your-first-tech-job');
  });

  it('uses semantic HTML: article and h3 elements', () => {
    const { container } = render(<ArticleListItem {...defaultProps} />);
    expect(container.querySelector('article')).toBeInTheDocument();
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('applies dark mode classes', () => {
    const { container } = render(<ArticleListItem {...defaultProps} />);
    const link = container.querySelector('a');
    expect(link?.className).toContain('dark:hover:bg-gray-800/60');
    expect(link?.className).toContain('dark:focus:ring-cyan-500');
  });

  it('merges custom className', () => {
    const { container } = render(<ArticleListItem {...defaultProps} className="custom-class" />);
    expect(container.querySelector('article')?.className).toContain('custom-class');
  });
});
