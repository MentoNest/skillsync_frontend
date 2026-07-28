'use client';

import React from 'react';
import CommunityPageLayout from './CommunityPageLayout';
import CommunityHeroBanner from '@/components/community/CommunityHeroBanner';
import DiscussionFeed from '@/components/community/DiscussionFeed';
import { CategoriesWidget } from '@/components/ui/categories-widget';
import { UpcomingEventsWidget } from '@/components/ui/upcoming-events-widget';
import { StatisticCard } from '@/components/ui/statistic-card';

const CommunityPage = () => {
  const hero = <CommunityHeroBanner />;
  const feed = <DiscussionFeed />;
  const sidebar = (
    <div className="space-y-6">
      <CategoriesWidget />
      <UpcomingEventsWidget />
      <div className="grid grid-cols-2 gap-4">
        <StatisticCard title="Members" value="1.2k" />
        <StatisticCard title="Active" value="345" />
        <StatisticCard title="Discussions" value="567" />
        <StatisticCard title="Events" value="42" />
      </div>
    </div>
  );

  return <CommunityPageLayout hero={hero} feed={feed} sidebar={sidebar} />;
};

export default CommunityPage;