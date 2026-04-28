import { notFound } from 'next/navigation';
import { UserService } from '@/services/user.service';
import Link from 'next/link';

const userService = new UserService();

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = await userService.getUserByUsername(username);

  if (!user) {
    return { title: 'User not found | SkillSync' };
  }

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';

  return {
    title: `${displayName} | SkillSync`,
    description: `Profile of ${displayName} on SkillSync`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = await userService.getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {(displayName.charAt(0) || 'U').toUpperCase()}
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
            {user.username && (
              <p className="text-gray-500">@{user.username}</p>
            )}
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">About</h2>
          <p className="mt-2 text-gray-600">
            This is {displayName}&#39;s public profile on SkillSync.
          </p>
        </div>
      </div>
    </main>
  );
}
