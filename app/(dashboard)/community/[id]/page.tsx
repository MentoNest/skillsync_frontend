'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import CategoryBadge from '@/components/CategoryBadge';
import DiscussionMetadata from '@/components/community/DiscussionMetadata';
import Comment from '@/components/community/Comment';
import type { Discussion, Comment as CommentType } from '@/lib/community-types';

const mockDiscussions: Record<string, Discussion> = {
  '1': {
    id: '1',
    title: 'How to transition into a career in UX design?',
    content: 'I\'ve been working as a graphic designer for the past 5 years and I\'m really interested in transitioning to UX design. I have some experience with user research and prototyping tools, but I\'m not sure where to start. Has anyone made a similar transition? What resources would you recommend? I\'m particularly interested in learning more about interaction design and usability testing.',
    author: {
      id: '1',
      name: 'Sarah Johnson',
      avatarUrl: '/avatars/sarah.svg',
      role: 'Graphic Designer'
    },
    category: 'Career Advice',
    createdAt: '2025-06-25T10:30:00Z',
    likeCount: 24,
    commentCount: 12,
    viewCount: 156,
    isLiked: false,
    isBookmarked: false,
    isTrending: true,
    tags: ['ux-design', 'career-change', 'transition'],
    comments: [
      {
        id: 'c1',
        author: {
          id: '2',
          name: 'Mike Chen',
          avatarUrl: '/avatars/john.svg',
          role: 'UX Designer'
        },
        content: 'I made a similar transition 2 years ago! The key is to build a portfolio with case studies. I\'d recommend taking Google\'s UX Design certificate on Coursera as a starting point.',
        createdAt: '2025-06-25T11:45:00Z',
        likeCount: 8,
        isLiked: false
      },
      {
        id: 'c2',
        author: {
          id: '3',
          name: 'Emily Rodriguez',
          avatarUrl: '/avatars/jane.svg',
          role: 'Product Designer'
        },
        content: 'Don\'t forget to learn Figma! It\'s the industry standard now. Also, try to get involved in some real projects even if they\'re pro bono.',
        createdAt: '2025-06-25T14:20:00Z',
        likeCount: 5,
        isLiked: false,
        replies: [
          {
            id: 'c2-r1',
            author: {
              id: '1',
              name: 'Sarah Johnson',
              avatarUrl: '/avatars/sarah.svg',
              role: 'Graphic Designer'
            },
            content: 'Thank you both! I\'ve already started learning Figma. The portfolio advice is really helpful.',
            createdAt: '2025-06-25T15:30:00Z',
            likeCount: 3,
            isLiked: false
          }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Best resources for learning cloud computing',
    content: 'I\'m looking to get into cloud computing, specifically AWS. There are so many resources out there that it\'s overwhelming. What would you recommend for a beginner? Should I start with certifications or hands-on projects? I have a background in system administration but no cloud experience.',
    author: {
      id: '2',
      name: 'Mike Chen',
      avatarUrl: '/avatars/john.svg',
      role: 'System Administrator'
    },
    category: 'Learning Resources',
    createdAt: '2025-06-27T09:15:00Z',
    likeCount: 18,
    commentCount: 8,
    viewCount: 89,
    isLiked: false,
    isBookmarked: false,
    isTrending: false,
    tags: ['cloud', 'aws', 'learning'],
    comments: [
      {
        id: 'c3',
        author: {
          id: '4',
          name: 'James Wilson',
          avatarUrl: '/avatars/jane.svg',
          role: 'Cloud Architect'
        },
        content: 'Start with AWS Cloud Practitioner certification to get the basics. Then move to Solutions Architect Associate. The AWS free tier is great for hands-on practice!',
        createdAt: '2025-06-27T10:30:00Z',
        likeCount: 12,
        isLiked: false
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Tips for negotiating a salary raise',
    content: 'I\'ve been at my current company for 18 months and I think I\'m ready to ask for a raise. I\'ve taken on more responsibilities and delivered several successful projects. What\'s the best approach? How do I prepare for the conversation? Any tips on what to avoid?',
    author: {
      id: '3',
      name: 'Emily Rodriguez',
      avatarUrl: '/avatars/jane.svg',
      role: 'Software Engineer'
    },
    category: 'Career Advice',
    createdAt: '2025-06-28T08:00:00Z',
    likeCount: 31,
    commentCount: 23,
    viewCount: 234,
    isLiked: false,
    isBookmarked: true,
    isTrending: true,
    tags: ['salary', 'negotiation', 'career'],
    comments: []
  },
  '4': {
    id: '4',
    title: 'How to build a personal brand as a developer',
    content: 'I want to build my personal brand as a developer to stand out in the job market and connect with others in the industry. What are some effective strategies? Should I focus on blogging, social media, open source contributions, or a combination? I\'d love to hear from developers who have successfully built their brand.',
    author: {
      id: '4',
      name: 'James Wilson',
      avatarUrl: '/avatars/jane.svg',
      role: 'Full Stack Developer'
    },
    category: 'Career Advice',
    createdAt: '2025-06-26T16:45:00Z',
    likeCount: 42,
    commentCount: 15,
    viewCount: 178,
    isLiked: true,
    isBookmarked: false,
    isTrending: false,
    tags: ['personal-brand', 'developer', 'networking'],
    comments: [
      {
        id: 'c4',
        author: {
          id: '5',
          name: 'Alex Thompson',
          avatarUrl: '/avatars/john.svg',
          role: 'Senior Developer'
        },
        content: 'Consistency is key! I\'d recommend starting with one platform - maybe Twitter/X for quick tips or a blog for longer content. Once you\'re consistent there, expand to other channels.',
        createdAt: '2025-06-26T18:00:00Z',
        likeCount: 15,
        isLiked: false
      }
    ]
  }
};

export default function DiscussionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [discussion, setDiscussion] = useState<Discussion | null>(mockDiscussions[id] || null);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  if (!discussion) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Discussion not found</h2>
        <p className="text-gray-600 mb-4">The discussion you're looking for doesn't exist.</p>
        <button
          onClick={() => router.push('/community')}
          className="text-cyan-600 hover:text-cyan-700 font-medium"
        >
          Back to Community
        </button>
      </div>
    );
  }

  const handleLike = () => {
    setDiscussion(prev => prev ? {
      ...prev,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      isLiked: !prev.isLiked
    } : null);
  };

  const handleBookmark = () => {
    setDiscussion(prev => prev ? {
      ...prev,
      isBookmarked: !prev.isBookmarked
    } : null);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: CommentType = {
      id: `c${Date.now()}`,
      author: {
        id: 'current-user',
        name: 'You',
        avatarUrl: '/avatars/jane.svg'
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      isLiked: false
    };

    setDiscussion(prev => prev ? {
      ...prev,
      comments: [...prev.comments, comment],
      commentCount: prev.commentCount + 1
    } : null);
    setNewComment('');
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const addReply = (comments: CommentType[]): CommentType[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: `c${Date.now()}`,
                author: {
                  id: 'current-user',
                  name: 'You',
                  avatarUrl: '/avatars/jane.svg'
                },
                content: replyContent,
                createdAt: new Date().toISOString(),
                likeCount: 0,
                isLiked: false
              }
            ]
          };
        }
        if (comment.replies) {
          return { ...comment, replies: addReply(comment.replies) };
        }
        return comment;
      });
    };

    setDiscussion(prev => prev ? {
      ...prev,
      comments: addReply(prev.comments),
      commentCount: prev.commentCount + 1
    } : null);
    setReplyContent('');
    setReplyTo(null);
  };

  const handleCommentLike = (commentId: string) => {
    const toggleLike = (comments: CommentType[]): CommentType[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
            isLiked: !comment.isLiked
          };
        }
        if (comment.replies) {
          return { ...comment, replies: toggleLike(comment.replies) };
        }
        return comment;
      });
    };

    setDiscussion(prev => prev ? {
      ...prev,
      comments: toggleLike(prev.comments)
    } : null);
  };

  const timeAgo = (date: string) => {
    const now = Date.now();
    const then = new Date(date).getTime();
    const diffMs = now - then;
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const renderComment = (comment: CommentType, isReply = false) => (
    <div key={comment.id}>
      <Comment
        comment={comment}
        isReply={isReply}
        onLike={handleCommentLike}
        onReply={setReplyTo}
        showReplyButton={!isReply}
      />
      {replyTo === comment.id && (
        <div className="ml-11 mt-3">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleReply(comment.id)}
              className="px-3 py-1.5 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Reply
            </button>
            <button
              onClick={() => {
                setReplyTo(null);
                setReplyContent('');
              }}
              className="px-3 py-1.5 text-gray-600 text-sm hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map(reply => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <button
        onClick={() => router.push('/community')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Community
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar
            src={discussion.author.avatarUrl}
            alt={discussion.author.name}
            name={discussion.author.name}
            size="lg"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900">{discussion.author.name}</span>
              {discussion.author.role && (
                <span className="text-sm text-gray-500">{discussion.author.role}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <CategoryBadge category={discussion.category} />
              <span className="text-sm text-gray-500">{timeAgo(discussion.createdAt)}</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{discussion.title}</h1>

        {discussion.tags && discussion.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {discussion.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-gray max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{discussion.content}</p>
        </div>

        <DiscussionMetadata
          metadata={discussion}
          onLike={handleLike}
          onBookmark={handleBookmark}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Comments ({discussion.commentCount})
        </h2>

        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {discussion.comments.map(comment => renderComment(comment))}
        </div>

        {discussion.comments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
