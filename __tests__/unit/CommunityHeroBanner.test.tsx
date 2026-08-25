/**
 * Unit tests — CommunityHeroBanner
 *
 * Run with:  npx vitest run __tests__/unit/CommunityHeroBanner.test.tsx
 *
 * Setup required (one-time):
 *   npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
 *   Add to vitest.config.ts:  environment: 'jsdom', setupFiles: ['./vitest.setup.ts']
 *   Create vitest.setup.ts:   import '@testing-library/jest-dom';
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommunityHeroBanner from '@/components/community/CommunityHeroBanner';

describe('CommunityHeroBanner', () => {
  describe('rendering', () => {
    it('renders the heading', () => {
      render(<CommunityHeroBanner />);
      expect(
        screen.getByRole('heading', { name: /welcome to the community/i }),
      ).toBeInTheDocument();
    });

    it('renders the description text', () => {
      render(<CommunityHeroBanner />);
      expect(screen.getByText(/connect with mentors and peers/i)).toBeInTheDocument();
    });

    it('renders the "Start a Discussion" button', () => {
      render(<CommunityHeroBanner />);
      expect(
        screen.getByRole('button', { name: /start a discussion/i }),
      ).toBeInTheDocument();
    });

    it('renders with the correct section aria-label', () => {
      render(<CommunityHeroBanner />);
      expect(screen.getByRole('region', { name: /community hero/i })).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it('calls onStartDiscussion when button is clicked', async () => {
      const onStartDiscussion = vi.fn();
      render(<CommunityHeroBanner onStartDiscussion={onStartDiscussion} />);

      await userEvent.click(screen.getByRole('button', { name: /start a discussion/i }));

      expect(onStartDiscussion).toHaveBeenCalledTimes(1);
    });

    it('does not throw when onStartDiscussion is not provided', async () => {
      render(<CommunityHeroBanner />);
      // Should not throw even with no handler
      await expect(
        userEvent.click(screen.getByRole('button', { name: /start a discussion/i })),
      ).resolves.not.toThrow();
    });
  });
});
