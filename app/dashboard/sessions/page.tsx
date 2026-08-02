"use client";

import React, { useState } from "react";
import { Calendar, Clock, Video, MessageSquare, X, Check, Filter } from "lucide-react";

type Session = {
  id: string;
  mentorName: string;
  mentorRole: string;
  avatar: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  topic: string;
};

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock sessions data
  const allSessions: Session[] = [
    {
      id: "1",
      mentorName: "Sarah Johnson",
      mentorRole: "Senior Product Manager at Google",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      date: "Aug 2, 2024",
      time: "3:00 PM",
      status: "upcoming",
      topic: "Product Management Career Growth",
    },
    {
      id: "2",
      mentorName: "Michael Chen",
      mentorRole: "Staff Software Engineer at Meta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      date: "Aug 3, 2024",
      time: "11:00 AM",
      status: "upcoming",
      topic: "System Design Interview Prep",
    },
    {
      id: "3",
      mentorName: "Emily Rodriguez",
      mentorRole: "Design Director at Airbnb",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
      date: "Jul 28, 2024",
      time: "2:00 PM",
      status: "completed",
      topic: "UX Portfolio Review",
    },
    {
      id: "4",
      mentorName: "James Wilson",
      mentorRole: "Engineering Manager at Amazon",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
      date: "Jul 20, 2024",
      time: "10:00 AM",
      status: "completed",
      topic: "Becoming an Engineering Manager",
    },
    {
      id: "5",
      mentorName: "Lisa Wang",
      mentorRole: "Data Scientist at Netflix",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100",
      date: "Jul 15, 2024",
      time: "4:00 PM",
      status: "cancelled",
      topic: "ML Career Path Discussion",
    },
  ];

  const filteredSessions = allSessions.filter((session) => session.status === activeTab);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          My Sessions
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Manage and track all your mentorship sessions in one place.
        </p>
      </div>

          {/* Tabs and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 w-fit">
              {(["upcoming", "completed", "cancelled"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab
                      ? "bg-cyan-600 text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                    {allSessions.filter((s) => s.status === tab).length}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Sessions List */}
          {filteredSessions.length > 0 ? (
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={session.avatar}
                        alt={session.mentorName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {session.mentorName}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusStyles(
                              session.status
                            )}`}
                          >
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {session.mentorRole}
                        </p>
                        <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-2">
                          {session.topic}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {session.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {session.status === "upcoming" && (
                        <>
                          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                            <Video className="h-4 w-4" />
                            Join Call
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      {session.status === "completed" && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          <Check className="h-4 w-4" />
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gray-400 dark:text-gray-500">
                <Calendar className="h-12 w-12" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                No {activeTab} sessions
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {activeTab === "upcoming"
                  ? "Book a session with a mentor to get started on your learning journey."
                  : `You don't have any ${activeTab} sessions yet.`}
              </p>
              {activeTab === "upcoming" && (
                <div className="mt-6">
                  <a
                    href="/discover-mentors"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Find a Mentor
                  </a>
                </div>
              )}
            </div>
          )}
    </>
  );
}