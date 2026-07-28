
import React from 'react';

const CommunityPageLayout = ({
  hero,
  feed,
  sidebar,
}: {
  hero: React.ReactNode;
  feed: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  return (
    <div>
      {hero}
      <div className="flex flex-col md:flex-row">
        <main className="w-full md:w-2/3">{feed}</main>
        <aside className="w-full md:w-1/3">{sidebar}</aside>
      </div>
    </div>
  );
};

export default CommunityPageLayout;