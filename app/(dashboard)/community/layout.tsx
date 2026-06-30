import { CommunityProvider } from './community-context';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CommunityProvider>{children}</CommunityProvider>;
}