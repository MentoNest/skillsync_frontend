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
  // Mock data
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
  ];

  const recentActivities = [
    {
      id: "1",
      action: "You connected with",
      user: "David Kim",
      time: "2 hours ago",
      icon: <UserCheck className="h-4 w-4 text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Simple navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-cyan-600" />
              <span className="text-xl font-bold text-gray-900">SkillSync</span>
            </div>
            <nav className="flex gap-6">
              <Link href="/dashboard" className="text-cyan-600 font-medium">Dashboard</Link>
              <Link href="/dashboard/sessions" className="text-gray-600 hover:text-gray-900">Sessions</Link>
              <Link href="/dashboard/messages" className="text-gray-600 hover:text-gray-900">Messages</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="mt-2 text-lg text-gray-600">
            Here's what's happening with your mentorship journey today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-cyan-600" />
            Upcoming Sessions
          </h2>
          {upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={session.avatar}
                  alt={session.mentorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{session.mentorName}</p>
                  <p className="text-sm text-gray-500">{session.mentorRole}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session.date}</p>
                <button className="mt-1 text-xs px-3 py-1 bg-cyan-600 text-white rounded-full">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}