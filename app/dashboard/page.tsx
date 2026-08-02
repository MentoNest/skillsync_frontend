"use client";

import React, { useState } from "react";
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
  Menu,
  X,
  Search,
  Bell,
  Video,
  BookOpen,
  Compass,
  MessageCircle,
  Target,
  Zap,
  Briefcase,
  MessageSquarePlus,
  MapPin,
  CheckCircle2,
  Circle,
  Flame,
  Coffee,
  PlayCircle,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  
  // Mock data - enhanced with more details
  const stats = [
    {
      title: "Total Connections",
      value: "12",
      change: "+2 this week",
      icon: <Users className="h-6 w-6 text-cyan-600" />,
      bgColor: "bg-cyan-50",
      changeType: "positive",
    },
    {
      title: "Active Sessions",
      value: "3",
      change: "1 scheduled today",
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      bgColor: "bg-green-50",
      changeType: "neutral",
    },
    {
      title: "Unread Messages",
      value: "7",
      change: "3 new today",
      icon: <MessageSquare className="h-6 w-6 text-amber-600" />,
      bgColor: "bg-amber-50",
      changeType: "warning",
    },
    {
      title: "Saved Mentors",
      value: "5",
      change: "1 added recently",
      icon: <Heart className="h-6 w-6 text-rose-600" />,
      bgColor: "bg-rose-50",
      changeType: "positive",
    },
  ];

  const upcomingSessions = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      mentorRole: "Senior Product Manager at Google",
      date: "Today, 3:00 PM",
      duration: "60 min",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      status: "upcoming",
    },
    {
      id: "2",
      mentorName: "Michael Chen",
      mentorRole: "Staff Software Engineer at Meta",
      date: "Tomorrow, 11:00 AM",
      duration: "45 min",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      status: "scheduled",
    },
    {
      id: "3",
      mentorName: "Emily Rodriguez",
      mentorRole: "Design Director at Airbnb",
      date: "Aug 5, 2:00 PM",
      duration: "90 min",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
      status: "scheduled",
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
    { id: "4", action: "New message from", user: "Emma Thompson", time: "5 hours ago", icon: <MessageCircle className="h-4 w-4 text-purple-500" />, },
  ];

  const notifications = [
    { id: "1", message: "Sarah Johnson sent you a message", time: "10 min ago", read: false },
    { id: "2", message: "Your session with Michael is tomorrow", time: "1 hour ago", read: false },
    { id: "3", message: "New mentor matching available", time: "3 hours ago", read: true },
  ];

  // Skills progress data
  const skillsProgress = [
    { name: "Leadership", progress: 75, color: "bg-cyan-500" },
    { name: "Product Management", progress: 60, color: "bg-green-500" },
    { name: "Communication", progress: 85, color: "bg-purple-500" },
    { name: "Technical Skills", progress: 45, color: "bg-amber-500" },
  ];

  // Recommended mentors
  const recommendedMentors = [
    {
      id: "1",
      name: "Alex Turner",
      role: "VP of Engineering at Netflix",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
      location: "San Francisco, CA",
      rating: 4.9,
      reviews: 24,
    },
    {
      id: "2",
      name: "Jessica Wong",
      role: "Product Lead at Stripe",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
      location: "New York, NY",
      rating: 4.8,
      reviews: 18,
    },
  ];

  // Weekly goals
  const weeklyGoals = [
    { id: "1", title: "Complete product management course", completed: true },
    { id: "2", title: "Schedule 2 new mentorship sessions", completed: true },
    { id: "3", title: "Read 'The Lean Startup' book", completed: false },
    { id: "4", title: "Update LinkedIn profile with new skills", completed: false },
  ];

  // Upcoming learning milestones
  const learningMilestones = [
    {
      id: "1",
      title: "Product Management Fundamentals",
      type: "Course",
      progress: 75,
      nextLesson: "Agile Methodologies",
      icon: <PlayCircle className="h-5 w-5 text-green-500" />,
    },
    {
      id: "2",
      title: "Leadership Workshop Series",
      type: "Workshop",
      progress: 40,
      nextLesson: "Team Management",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
  ];

  const quickActions = [
    {
      title: "Find Mentors",
      description: "Discover new mentors in your field",
      icon: <Compass className="h-8 w-8 text-blue-600" />,
      bgColor: "bg-blue-50",
      link: "/discover-mentors",
    },
    {
      title: "Join Session",
      description: "Start your scheduled session",
      icon: <Video className="h-8 w-8 text-green-600" />,
      bgColor: "bg-green-50",
      link: "/dashboard/sessions",
    },
    {
      title: "Learning Paths",
      description: "Continue your skill development",
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      bgColor: "bg-purple-50",
      link: "/learning-resources",
    },
  ];

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", active: true },
    { href: "/dashboard/sessions", label: "Sessions", active: false },
    { href: "/dashboard/messages", label: "Messages", active: false },
    { href: "/dashboard/saved-mentors", label: "Saved Mentors", active: false },
    { href: "/dashboard/settings", label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced navigation - with mobile support and user controls */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 rounded-lg">
                <Users className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SkillSync</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    link.active
                      ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search...</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notification dropdown */}
                {notificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notification.read ? "bg-cyan-50 dark:bg-cyan-900/20" : ""}`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                      <Link
                        href="/dashboard/notifications"
                        className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User avatar */}
              <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=40&h=40"
                  alt="User avatar"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 dark:border-gray-700">
              <nav className="flex flex-col gap-1 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      link.active
                        ? "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main content - renders immediately, no loading state */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back! 👋</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Here's what's happening with your mentorship journey today.
          </p>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.link}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
            >
              <div className={`${action.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
              <div className="mt-4 flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                Get started <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
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
                  <p className={`mt-1 text-xs ${
                    stat.changeType === "positive" ? "text-green-600 dark:text-green-400" :
                    stat.changeType === "warning" ? "text-amber-600 dark:text-amber-400" :
                    "text-gray-500 dark:text-gray-400"
                  }`}>{stat.change}</p>
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
                        <p className="text-xs text-gray-500 dark:text-gray-400">{session.duration}</p>
                        <button className="mt-2 text-xs px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-1">
                          <Video className="h-3 w-3" /> Join
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

        {/* Skills Progress Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Development */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Skills Development
              </h2>
              <Link
                href="/learning-resources"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-5">
              {skillsProgress.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`${skill.color} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Mentors */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Recommended For You
              </h2>
              <Link
                href="/discover-mentors"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recommendedMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{mentor.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{mentor.location}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{mentor.rating} ({mentor.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-xs px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1">
                    <MessageSquarePlus className="h-3 w-3" /> Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Goals & Learning Milestones */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Goals */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Weekly Goals
              </h2>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {weeklyGoals.filter(g => g.completed).length}/{weeklyGoals.length} done
              </span>
            </div>
            <div className="space-y-3">
              {weeklyGoals.map((goal) => (
                <div key={goal.id} className="flex items-start gap-3">
                  {goal.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${goal.completed ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-700 dark:text-gray-300"}`}>
                    {goal.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button className="w-full py-2 text-sm font-medium text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors">
                + Add new goal
              </button>
            </div>
          </div>

          {/* Current Learning */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Coffee className="h-5 w-5 text-cyan-600" />
                Continue Learning
              </h2>
              <Link
                href="/learning-resources"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{milestone.icon}</div>
                    <div className="flex-1">
                      <span className="text-xs font-medium px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full">
                        {milestone.type}
                      </span>
                      <h3 className="font-medium text-gray-900 dark:text-white mt-2">{milestone.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Next: {milestone.nextLesson}</p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{milestone.progress}% complete</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                          <div
                            className="bg-cyan-500 h-1.5 rounded-full"
                            style={{ width: `${milestone.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="mt-3 text-xs px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" /> Continue
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Quick Links */}
        <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/discover-mentors" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Find Mentors</Link></li>
                <li><Link href="/community" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Community</Link></li>
                <li><Link href="/learning-resources" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Help Center</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Contact Us</Link></li>
                <li><Link href="/feedback" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Send Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard/settings" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Settings</Link></li>
                <li><Link href="/dashboard/profile" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Profile</Link></li>
                <li><Link href="/logout" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Sign Out</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-sm text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 SkillSync. All rights reserved. Empowering growth through mentorship.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}