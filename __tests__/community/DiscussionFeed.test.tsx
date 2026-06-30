import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import DiscussionFeed from '@/components/community/DiscussionFeed';
import type { DiscussionMetadata } from '@/lib/community-types';

// Mock child components to isolate DiscussionFeed logic
jest.mock('@/components/Avatar', () => {
  const Avatar = ({ name }: { name: string }) => <div data-testid="avatar">{name}</div>;
  Avatar.displayName = 'Avatar';
  return Avatar;
});
jest.mock('@/components/CategoryBadge', () => {
  const CategoryBadge = ({ category }: { category: string }) => (
    <span>{category}</span>
  );
  CategoryBadge.displayName = 'CategoryBadge';
  return CategoryBadge;
});

function makeDiscussion(
  overrides: Partial<DiscussionMetadata> & { id: string; title: string }
): DiscussionMetadata {
  return {
    author: { id: 'u1', name: 'Alice' },
    category: 'general',
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    likeCount: 0,
    commentCount: 0,
    viewCount: 0,
    isLiked: false,
    isBookmarked: false,
    ...overrides,
  };
}

function buildDiscussions(count: number): DiscussionMetadata[] {
  return Array.from({ length: count }, (_, i) =>
    makeDiscussion({ id: `d${i + 1}`, title: `Discussion ${i + 1}` })
  );
}

describe('DiscussionFeed integration', () => {
  describe('empty state', () => {
    it('shows empty state message when discussions array is empty', () => {
      render(<DiscussionFeed discussions={[]} />);
      expect(
        screen.getByText(/no discussions yet/i)
      ).toBeInTheDocument();
    });

    it('does not render any discussion cards in empty state', () => {
      render(<DiscussionFeed discussions={[]} />);
      expect(screen.queryByRole('button', { name: /discussion/i })).not.toBeInTheDocument();
    });
  });

  describe('rendering discussions', () => {
    it('renders all discussions when count ≤ 10', () => {
      const discussions = buildDiscussions(5);
      render(<DiscussionFeed discussions={discussions} />);
      expect(screen.getByText('Discussion 1')).toBeInTheDocument();
      expect(screen.getByText('Discussion 5')).toBeInTheDocument();
    });

    it('renders the count summary', () => {
      const discussions = buildDiscussions(5);
      render(<DiscussionFeed discussions={discussions} />);
      expect(screen.getByText(/showing 5 of 5/i)).toBeInTheDocument();
    });
  });

  describe('load more', () => {
    it('shows "Load more" button when there are more than 10 discussions', () => {
      const discussions = buildDiscussions(15);
      render(<DiscussionFeed discussions={discussions} />);
      expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
    });

    it('does not show "Load more" when there are 10 or fewer discussions', () => {
      const discussions = buildDiscussions(10);
      render(<DiscussionFeed discussions={discussions} />);
      expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    });

    it('initially renders only the first 10 discussions', () => {
      const discussions = buildDiscussions(15);
      render(<DiscussionFeed discussions={discussions} />);
      expect(screen.getByText('Discussion 10')).toBeInTheDocument();
      expect(screen.queryByText('Discussion 11')).not.toBeInTheDocument();
    });

    it('renders 10 more discussions after clicking "Load more"', () => {
      const discussions = buildDiscussions(25);
      render(<DiscussionFeed discussions={discussions} />);

      fireEvent.click(screen.getByRole('button', { name: /load more/i }));

      expect(screen.getByText('Discussion 20')).toBeInTheDocument();
      expect(screen.queryByText('Discussion 21')).not.toBeInTheDocument();
    });

    it('hides "Load more" after all discussions are visible', () => {
      const discussions = buildDiscussions(12);
      render(<DiscussionFeed discussions={discussions} />);

      // First click loads 10 more (total: 20 > 12, so all visible)
      fireEvent.click(screen.getByRole('button', { name: /load more/i }));

      expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
    });

    it('updates the count summary after loading more', () => {
      const discussions = buildDiscussions(15);
      render(<DiscussionFeed discussions={discussions} />);

      fireEvent.click(screen.getByRole('button', { name: /load more/i }));

      expect(screen.getByText(/showing 15 of 15/i)).toBeInTheDocument();
    });
  });

  describe('like interaction', () => {
    it('calls onLike with discussion id when the like button is clicked', () => {
      const onLike = jest.fn();
      const discussions = [
        makeDiscussion({ id: 'disc-1', title: 'Test Discussion' }),
      ];
      render(<DiscussionFeed discussions={discussions} onLike={onLike} />);
      fireEvent.click(screen.getByRole('button', { name: /like/i }));
      expect(onLike).toHaveBeenCalledWith('disc-1');
    });

    it('calls onLike with correct id when multiple discussions are shown', () => {
      const onLike = jest.fn();
      const discussions = [
        makeDiscussion({ id: 'disc-1', title: 'First Discussion' }),
        makeDiscussion({ id: 'disc-2', title: 'Second Discussion' }),
      ];
      render(<DiscussionFeed discussions={discussions} onLike={onLike} />);
      const likeButtons = screen.getAllByRole('button', { name: /like/i });
      // Click the second discussion's like button
      fireEvent.click(likeButtons[1]);
      expect(onLike).toHaveBeenCalledWith('disc-2');
    });
  });

  describe('bookmark interaction', () => {
    it('calls onBookmark with discussion id when the bookmark button is clicked', () => {
      const onBookmark = jest.fn();
      const discussions = [
        makeDiscussion({ id: 'disc-1', title: 'Test Discussion' }),
      ];
      render(<DiscussionFeed discussions={discussions} onBookmark={onBookmark} />);
      fireEvent.click(screen.getByRole('button', { name: /bookmark/i }));
      expect(onBookmark).toHaveBeenCalledWith('disc-1');
    });
  });

  describe('discussion click', () => {
    it('calls onDiscussionClick with discussion id when a card is clicked', () => {
      const onDiscussionClick = jest.fn();
      const discussions = [
        makeDiscussion({ id: 'disc-1', title: 'Test Discussion' }),
      ];
      render(
        <DiscussionFeed discussions={discussions} onDiscussionClick={onDiscussionClick} />
      );
      // DiscussionCard renders as role="button"
      const cards = screen.getAllByRole('button');
      const card = cards.find((el) => el.getAttribute('aria-label')?.includes('Test Discussion'));
      if (card) fireEvent.click(card);
      expect(onDiscussionClick).toHaveBeenCalledWith('disc-1');
    });
  });

  describe('locked discussions in feed', () => {
    it('shows lock badge on locked discussions', () => {
      const discussions = [
        makeDiscussion({ id: 'disc-1', title: 'Locked Discussion', isLocked: true }),
      ];
      render(<DiscussionFeed discussions={discussions} />);
      expect(screen.getByTestId('lock-badge')).toBeInTheDocument();
    });

    it('does not show lock badge on unlocked discussions', () => {
      const discussions = [
        makeDiscussion({ id: 'disc-1', title: 'Normal Discussion', isLocked: false }),
      ];
      render(<DiscussionFeed discussions={discussions} />);
      expect(screen.queryByTestId('lock-badge')).not.toBeInTheDocument();
    });
  });
});
