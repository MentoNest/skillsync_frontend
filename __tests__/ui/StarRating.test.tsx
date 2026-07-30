import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from '@/components/ui/StarRating';

describe('StarRating', () => {
  it('renders 5 stars by default', () => {
    render(<StarRating rating={0} />);
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBe(5);
  });

  it('renders custom maxRating stars', () => {
    render(<StarRating rating={3} maxRating={7} />);
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBe(7);
  });

  it('renders aria-label with decimal rating', () => {
    render(<StarRating rating={4.5} maxRating={5} />);
    expect(screen.getByRole('img', { name: '4.5 out of 5 stars' })).toBeInTheDocument();
  });

  it('shows numeric value when showValue is true', () => {
    render(<StarRating rating={4.2} showValue />);
    expect(screen.getByText('4.2')).toBeInTheDocument();
  });

  it('does not show numeric value when showValue is false', () => {
    render(<StarRating rating={4.2} showValue={false} />);
    expect(screen.queryByText('4.2')).not.toBeInTheDocument();
  });

  it('clamps negative ratings to 0', () => {
    render(<StarRating rating={-2} />);
    const svgs = document.querySelectorAll('svg');
    svgs.forEach((svg) => {
      expect(svg.querySelector('clipPath rect')).toHaveAttribute('width', '0');
    });
  });

  it('clamps ratings above maxRating', () => {
    render(<StarRating rating={10} maxRating={5} />);
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBe(5);
  });

  it('renders partial fill for decimal rating via clipPath', () => {
    const { container } = render(<StarRating rating={3.7} />);
    const clipPaths = container.querySelectorAll('clipPath');
    expect(clipPaths.length).toBe(5);
    const fourthRect = clipPaths[3].querySelector('rect');
    const width = parseFloat(fourthRect?.getAttribute('width') || '0');
    expect(width).toBeCloseTo(16.8, 1);
  });
});
