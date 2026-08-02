"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Calendar,
  Heart,
  Clock,
  ChevronRight,
  UserCheck,
  Award,
  Star,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data - no authentication required
  const stats = [
    {
      title: "Total Connections",
      value: "12",
      change: "+2 this week",
      icon: <Users className="h-6 w-6 text-cyan-600" />,
      bgColor: "bg-cyan-50",
    },
    {
      title: "Active Sessions",
      value: "3",
      change: "1 scheduled today",
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Unread Messages",
      value: "7",
      change: "3 new today",
      icon: <MessageSquare className="h-6 w-6 text-amber-600" />,
      bgColor: "bg-amber-50",
    },
    {
      title: "Saved Mentors",
      value: "5",
      change: "1 added recently",
      icon: <Heart className="h-6 w-6 text-rose-600" />,
      bgColor: "bg-rose-50",
    },
  ];

  const upcomingSessions = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      mentorRole: "Senior Product Manager at Google",
      date: "Today, 3:00 PM",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      id: "2",
      mentorName: "Michael Chen",
      mentorRole: "Staff Software Engineer at Meta",
      date: "Tomorrow, 11:00 AM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    },
    {
      id: "3",
      mentorName: "Emily Rodriguez",
      mentorRole: "Design Director at Airbnb",
      date: "Aug 5, 2:00 PM",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      action: "You connected with",
      user: "David Kim",
      time: "2 hours ago",
      icon: <UserCheck className="h-4 w-4 text-green-500" />,
    },
    {
      id: "2",
      action: "You completed a session with",
      user: "Lisa Wang",
      time: "1 day ago",
      icon: <Award className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "3",
      action: "You left a review for",
      user: "James Wilson",
      time: "3 days ago",
      icon: <Star className="h-4 w-4 text-amber-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Simple navigation - no auth required */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-cyan-600" />
              <span className="text-xl font-bold text-gray-900">SkillSync Dashboard</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-cyan-600 font-medium">Dashboard</Link>
              <Link href="/dashboard/sessions" className="text-gray-600 hover:text-gray-900 transition-colors">Sessions</Link>
              <Link href="/dashboard/messages" className="text-gray-600 hover:text-gray-900 transition-colors">Messages</Link>
              <Link href="/dashboard/saved-mentors" className="text-gray-600 hover:text-gray-900 transition-colors">Saved Mentors</Link>
              <Link href="/dashboard/settings" className="text-gray-600 hover:text-gray-900 transition-colors">Settings</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content - renders immediately, no loading state */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back! 👋</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Here's what's happening with your mentorship journey today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cyan-600" />
                  Upcoming Sessions
                </h2>
                <Link
                  href="/dashboard/sessions"
                  className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={session.avatar}
                        alt={session.mentorName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{session.mentorName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{session.mentorRole}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{session.date}</p>
                      <button className="mt-1 text-xs px-3 py-1 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="mt-1">{activity.icon}</div>
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {activity.action}{" "}
                        <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}