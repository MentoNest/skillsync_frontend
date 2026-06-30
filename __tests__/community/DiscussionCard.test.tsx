import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DiscussionCard from '@/components/community/DiscussionCard';
import type { DiscussionMetadata } from '@/lib/community-types';

jest.mock('@/components/Avatar', () => {
  const Avatar = ({ name }: { name: string }) => <div data-testid="avatar">{name}</div>;
  Avatar.displayName = 'Avatar';
  return Avatar;
});
jest.mock('@/components/CategoryBadge', () => {
  const CategoryBadge = ({ category }: { category: string }) => (
    <span data-testid="category-badge">{category}</span>
  );
  CategoryBadge.displayName = 'CategoryBadge';
  return CategoryBadge;
});

const baseDiscussion: DiscussionMetadata = {
  id: 'disc-1',
  title: 'How do I learn TypeScript?',
  author: {
    id: 'user-1',
    name: 'Alice',
    avatarUrl: '/avatars/alice.svg',
    role: 'Developer',
  },
  category: 'technical',
  createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  likeCount: 5,
  commentCount: 3,
  viewCount: 42,
  isLiked: false,
  isBookmarked: false,
  tags: ['typescript', 'learning'],
};

// Helper: get the card article element by its aria-label
function getCard() {
  return screen.getByRole('button', { name: /discussion:/i });
}

describe('DiscussionCard', () => {
  describe('rendering', () => {
    it('renders the discussion title', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'How do I learn TypeScript?'
      );
    });

    it('renders the author name in the card body', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      // The author name appears in a <span> in the card body (avatar mock also renders it)
      const spans = screen.getAllByText('Alice');
      expect(spans.length).toBeGreaterThanOrEqual(1);
    });

    it('renders the author role when provided', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('renders all tags', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      expect(screen.getByText('#typescript')).toBeInTheDocument();
      expect(screen.getByText('#learning')).toBeInTheDocument();
    });

    it('does not render tag section when tags are empty', () => {
      const discussion = { ...baseDiscussion, tags: [] };
      render(<DiscussionCard discussion={discussion} />);
      expect(screen.queryByText(/^#/)).not.toBeInTheDocument();
    });

    it('does not render tag section when tags are undefined', () => {
      const discussion = { ...baseDiscussion, tags: undefined };
      render(<DiscussionCard discussion={discussion} />);
      expect(screen.queryByText(/^#/)).not.toBeInTheDocument();
    });
  });

  describe('pin indicator', () => {
    it('does not show pin badge by default', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      expect(screen.queryByTestId('pin-badge')).not.toBeInTheDocument();
    });

    it('shows pin badge when isPinned is true', () => {
      const discussion = { ...baseDiscussion, isPinned: true };
      render(<DiscussionCard discussion={discussion} />);
      expect(screen.getByTestId('pin-badge')).toBeInTheDocument();
      expect(screen.getByTestId('pin-badge')).toHaveTextContent('Pinned');
    });

    it('does not show pin badge when isPinned is false', () => {
      const discussion = { ...baseDiscussion, isPinned: false };
      render(<DiscussionCard discussion={discussion} />);
      expect(screen.queryByTestId('pin-badge')).not.toBeInTheDocument();
    });

    it('adds left border highlight when pinned', () => {
      const discussion = { ...baseDiscussion, isPinned: true };
      const { container } = render(<DiscussionCard discussion={discussion} />);
      const article = container.querySelector('article');
      expect(article?.className).toMatch(/border-l-4/);
    });

    it('announces pinned state via aria-label on the card', () => {
      const discussion = { ...baseDiscussion, isPinned: true };
      render(<DiscussionCard discussion={discussion} />);
      const card = getCard();
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('pinned'));
    });
  });

  describe('lock indicator', () => {
    it('does not show lock badge by default', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      expect(screen.queryByTestId('lock-badge')).not.toBeInTheDocument();
    });

    it('shows lock badge when isLocked is true', () => {
      const discussion = { ...baseDiscussion, isLocked: true };
      render(<DiscussionCard discussion={discussion} />);
      expect(screen.getByTestId('lock-badge')).toBeInTheDocument();
      expect(screen.getByTestId('lock-badge')).toHaveTextContent('Locked');
    });

    it('shows locked notice text when isLocked is true', () => {
      const discussion = { ...baseDiscussion, isLocked: true };
      render(<DiscussionCard discussion={discussion} />);
      expect(screen.getByTestId('locked-notice')).toBeInTheDocument();
    });

    it('does not show locked notice when not locked', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      expect(screen.queryByTestId('locked-notice')).not.toBeInTheDocument();
    });

    it('announces locked state via aria-label on the card', () => {
      const discussion = { ...baseDiscussion, isLocked: true };
      render(<DiscussionCard discussion={discussion} />);
      const card = getCard();
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('locked'));
    });
  });

  describe('interaction', () => {
    it('calls onClick with discussion id when the card article is clicked', () => {
      const handleClick = jest.fn();
      render(<DiscussionCard discussion={baseDiscussion} onClick={handleClick} />);
      fireEvent.click(getCard());
      expect(handleClick).toHaveBeenCalledWith('disc-1');
    });

    it('calls onClick with discussion id when Enter key is pressed on the card', () => {
      const handleClick = jest.fn();
      render(<DiscussionCard discussion={baseDiscussion} onClick={handleClick} />);
      fireEvent.keyDown(getCard(), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledWith('disc-1');
    });

    it('does not throw when onClick is not provided', () => {
      render(<DiscussionCard discussion={baseDiscussion} />);
      expect(() => fireEvent.click(getCard())).not.toThrow();
    });
  });

  describe('pin and lock badges together', () => {
    it('shows both pin and lock badges when both are true', () => {
      const discussion = { ...baseDiscussion, isPinned: true, isLocked: true };
      render(<DiscussionCard discussion={discussion} />);
      expect(screen.getByTestId('pin-badge')).toBeInTheDocument();
      expect(screen.getByTestId('lock-badge')).toBeInTheDocument();
    });
  });
});
