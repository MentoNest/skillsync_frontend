import { CommunityProvider } from './community-context';
import { SkipToContent } from '@/components/community/a11y';
import NotificationDropdown from '@/components/community/NotificationDropdown';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommunityProvider>
      <SkipToContent targetId="community-main" />
      <div className="flex items-center justify-end px-4 py-2">
        <NotificationDropdown />
      </div>
      <main id="community-main" tabIndex={-1}>
        {children}
      </main>
    </CommunityProvider>
  );
}