import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommunityTabs, { type CommunityTab } from '@/components/community/CommunityTabs';

describe('CommunityTabs', () => {
  const tabs: CommunityTab[] = ['discussions', 'events', 'members', 'resources'];

  describe('rendering', () => {
    it('renders all four tabs', () => {
      render(<CommunityTabs activeTab="discussions" onTabChange={jest.fn()} />);
      expect(screen.getByRole('button', { name: /discussions/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /events/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /members/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /resources/i })).toBeInTheDocument();
    });

    it('marks the active tab with aria-current="page"', () => {
      render(<CommunityTabs activeTab="discussions" onTabChange={jest.fn()} />);
      expect(screen.getByRole('button', { name: /discussions/i })).toHaveAttribute(
        'aria-current',
        'page'
      );
    });

    it('does not mark inactive tabs with aria-current', () => {
      render(<CommunityTabs activeTab="discussions" onTabChange={jest.fn()} />);
      const eventsTab = screen.getByRole('button', { name: /events/i });
      expect(eventsTab).not.toHaveAttribute('aria-current');
    });

    it('applies active styles to the active tab', () => {
      render(<CommunityTabs activeTab="events" onTabChange={jest.fn()} />);
      const eventsTab = screen.getByRole('button', { name: /events/i });
      expect(eventsTab.className).toMatch(/text-cyan-600/);
    });

    it('has a nav element with the correct aria-label', () => {
      render(<CommunityTabs activeTab="discussions" onTabChange={jest.fn()} />);
      expect(screen.getByRole('navigation', { name: /community tabs/i })).toBeInTheDocument();
    });
  });

  describe('counts badge', () => {
    it('shows count badge when count is provided', () => {
      render(
        <CommunityTabs
          activeTab="discussions"
          onTabChange={jest.fn()}
          counts={{ discussions: 42 }}
        />
      );
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('does not show count badge when count is not provided', () => {
      render(<CommunityTabs activeTab="discussions" onTabChange={jest.fn()} />);
      // No numeric count badges should be present
      expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
    });

    it('shows count badges for multiple tabs', () => {
      render(
        <CommunityTabs
          activeTab="discussions"
          onTabChange={jest.fn()}
          counts={{ discussions: 10, events: 5 }}
        />
      );
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('tab switching', () => {
    it.each(tabs)('calls onTabChange with "%s" when that tab is clicked', (tab) => {
      const onTabChange = jest.fn();
      render(<CommunityTabs activeTab="discussions" onTabChange={onTabChange} />);
      fireEvent.click(screen.getByRole('button', { name: new RegExp(tab, 'i') }));
      expect(onTabChange).toHaveBeenCalledWith(tab);
    });

    it('calls onTabChange exactly once per click', () => {
      const onTabChange = jest.fn();
      render(<CommunityTabs activeTab="discussions" onTabChange={onTabChange} />);
      fireEvent.click(screen.getByRole('button', { name: /events/i }));
      expect(onTabChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('active tab variants', () => {
    it.each(tabs)('correctly marks "%s" as active when it is the activeTab', (tab) => {
      render(<CommunityTabs activeTab={tab} onTabChange={jest.fn()} />);
      const activeButton = screen.getByRole('button', { name: new RegExp(tab, 'i') });
      expect(activeButton).toHaveAttribute('aria-current', 'page');
    });
  });
});
