import type { DiscussionMetadata } from './community-types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const communityService = {
  likeDiscussion: (id: string) =>
    request<{ liked: boolean }>(`/api/community/discussions/${id}/like`, { method: 'POST' }),

  unlikeDiscussion: (id: string) =>
    request<{ liked: boolean }>(`/api/community/discussions/${id}/like`, { method: 'DELETE' }),

  bookmarkDiscussion: (id: string) =>
    request<{ bookmarked: boolean }>(`/api/community/discussions/${id}/bookmark`, { method: 'POST' }),

  removeBookmark: (id: string) =>
    request<{ bookmarked: boolean }>(`/api/community/discussions/${id}/bookmark`, { method: 'DELETE' }),

  followUser: (userId: string) =>
    request<{ following: boolean }>(`/api/community/users/${userId}/follow`, { method: 'POST' }),

  unfollowUser: (userId: string) =>
    request<{ following: boolean }>(`/api/community/users/${userId}/follow`, { method: 'DELETE' }),

  reportDiscussion: (id: string, reason = 'Inappropriate content') =>
    request<{ reported: boolean }>(`/api/community/discussions/${id}/report`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),

  getReportedDiscussions: async () => {
    const reports = await request<{ id: string; title: string; reason: string; reportedAt: string; status: string }[]>(
      '/api/community/moderation/reports',
    );
    return reports.map((item) => ({ ...item, status: item.status as 'Pending' | 'Approved' | 'Removed' }));
  },

  reviewReport: async (id: string, action: 'approve' | 'remove') => {
    const reports = await request<{ id: string; title: string; reason: string; reportedAt: string; status: string }[]>(
      `/api/community/moderation/reports/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ action }),
      },
    );
    return reports.map((item) => ({ ...item, status: item.status as 'Pending' | 'Approved' | 'Removed' }));
  },

  fetchDiscussions: (params?: { page?: number; limit?: number; category?: string; sort?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.category) query.set('category', params.category);
    if (params?.sort) query.set('sort', params.sort);
    return request<{ discussions: DiscussionMetadata[]; total: number }>(
      `/api/community/discussions?${query.toString()}`,
    );
  },
};
