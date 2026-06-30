import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DiscussionMetadata from '@/components/community/DiscussionMetadata';
import type { DiscussionMetadata as MetadataType } from '@/lib/community-types';

const baseMetadata: MetadataType = {
  id: 'disc-1',
  title: 'Test Discussion',
  author: { id: 'u1', name: 'Alice' },
  category: 'general',
  createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5m ago
  likeCount: 10,
  commentCount: 4,
  viewCount: 88,
  isLiked: false,
  isBookmarked: false,
};

describe('DiscussionMetadata', () => {
  describe('rendering stats', () => {
    it('displays like count', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('displays comment count', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('displays view count', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByText('88')).toBeInTheDocument();
    });

    it('shows relative time for recent posts', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByText(/ago/i)).toBeInTheDocument();
    });

    it('shows "just now" for very recent posts', () => {
      const metadata = { ...baseMetadata, createdAt: new Date().toISOString() };
      render(<DiscussionMetadata metadata={metadata} />);
      expect(screen.getByText('just now')).toBeInTheDocument();
    });
  });

  describe('like button', () => {
    it('renders the Like button', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument();
    });

    it('calls onLike with discussion id when clicked', () => {
      const onLike = jest.fn();
      render(<DiscussionMetadata metadata={baseMetadata} onLike={onLike} />);
      fireEvent.click(screen.getByRole('button', { name: /like/i }));
      expect(onLike).toHaveBeenCalledWith('disc-1');
    });

    it('shows Unlike label when already liked', () => {
      const metadata = { ...baseMetadata, isLiked: true };
      render(<DiscussionMetadata metadata={metadata} />);
      expect(screen.getByRole('button', { name: /unlike/i })).toBeInTheDocument();
    });
  });

  describe('bookmark button', () => {
    it('renders the Bookmark button', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByRole('button', { name: /bookmark/i })).toBeInTheDocument();
    });

    it('calls onBookmark with discussion id when clicked', () => {
      const onBookmark = jest.fn();
      render(<DiscussionMetadata metadata={baseMetadata} onBookmark={onBookmark} />);
      fireEvent.click(screen.getByRole('button', { name: /bookmark/i }));
      expect(onBookmark).toHaveBeenCalledWith('disc-1');
    });

    it('shows Remove bookmark label when already bookmarked', () => {
      const metadata = { ...baseMetadata, isBookmarked: true };
      render(<DiscussionMetadata metadata={metadata} />);
      expect(screen.getByRole('button', { name: /remove bookmark/i })).toBeInTheDocument();
    });
  });

  describe('disableInteractions', () => {
    it('disables like button when disableInteractions is true', () => {
      render(<DiscussionMetadata metadata={baseMetadata} disableInteractions />);
      expect(screen.getByRole('button', { name: /like/i })).toBeDisabled();
    });

    it('disables bookmark button when disableInteractions is true', () => {
      render(<DiscussionMetadata metadata={baseMetadata} disableInteractions />);
      expect(screen.getByRole('button', { name: /bookmark/i })).toBeDisabled();
    });

    it('does not call onLike when disableInteractions is true', () => {
      const onLike = jest.fn();
      render(
        <DiscussionMetadata metadata={baseMetadata} onLike={onLike} disableInteractions />
      );
      fireEvent.click(screen.getByRole('button', { name: /like/i }));
      expect(onLike).not.toHaveBeenCalled();
    });

    it('does not call onBookmark when disableInteractions is true', () => {
      const onBookmark = jest.fn();
      render(
        <DiscussionMetadata metadata={baseMetadata} onBookmark={onBookmark} disableInteractions />
      );
      fireEvent.click(screen.getByRole('button', { name: /bookmark/i }));
      expect(onBookmark).not.toHaveBeenCalled();
    });

    it('enables like button by default (disableInteractions = false)', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByRole('button', { name: /like/i })).not.toBeDisabled();
    });

    it('enables bookmark button by default', () => {
      render(<DiscussionMetadata metadata={baseMetadata} />);
      expect(screen.getByRole('button', { name: /bookmark/i })).not.toBeDisabled();
    });
  });

  describe('timeAgo formatting', () => {
    it('formats hours correctly', () => {
      const twoHoursAgo = new Date(Date.now() - 1000 * 60 * 120).toISOString();
      const metadata = { ...baseMetadata, createdAt: twoHoursAgo };
      render(<DiscussionMetadata metadata={metadata} />);
      expect(screen.getByText('2h ago')).toBeInTheDocument();
    });

    it('formats days correctly', () => {
      const threeDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString();
      const metadata = { ...baseMetadata, createdAt: threeDaysAgo };
      render(<DiscussionMetadata metadata={metadata} />);
      expect(screen.getByText('3d ago')).toBeInTheDocument();
    });
  });
});
