"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck } from "lucide-react";

type Conversation = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online: boolean;
};

type Message = {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  read: boolean;
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversations
  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Product Manager at Google",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
      lastMessage: "That sounds great! Let's schedule a call for next week.",
      timestamp: "2m ago",
      unread: true,
      online: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Staff Software Engineer at Meta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
      lastMessage: "I've shared some resources that might help you.",
      timestamp: "1h ago",
      unread: false,
      online: false,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Design Director at Airbnb",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
      lastMessage: "Your portfolio is looking really good!",
      timestamp: "3h ago",
      unread: false,
      online: true,
    },
    {
      id: "4",
      name: "James Wilson",
      role: "Engineering Manager at Amazon",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
      lastMessage: "Let me know when you're available to chat.",
      timestamp: "1d ago",
      unread: false,
      online: false,
    },
  ];

  // Mock messages for selected conversation
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        content: "Hi! I saw your profile and I'm really interested in product management.",
        senderId: "me",
        timestamp: "10:30 AM",
        read: true,
      },
      {
        id: "2",
        content: "Great to hear! I'd be happy to help you with your career journey. What specific areas are you looking to grow in?",
        senderId: "1",
        timestamp: "10:32 AM",
        read: true,
      },
      {
        id: "3",
        content: "I'm currently a junior PM and I want to understand how to transition to a senior role. I'd love to get some insights on what skills I should focus on developing.",
        senderId: "me",
        timestamp: "10:35 AM",
        read: true,
      },
      {
        id: "4",
        content: "That sounds great! Let's schedule a call for next week. We can dive deep into your career goals and create a plan.",
        senderId: "1",
        timestamp: "10:38 AM",
        read: false,
      },
    ],
  });

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      senderId: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessage],
    }));
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-screen-xl mx-auto px-4 py-12 sm:py-16">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Messages
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Communicate with your mentors and manage your conversations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
            <div className="flex h-full">
              {/* Conversations List */}
              <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Search */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                </div>

                {/* Conversation Items */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left ${
                        selectedConversation === conversation.id
                          ? "bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600"
                          : "border-l-4 border-transparent"
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {conversation.name}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread && (
                            <span className="w-2 h-2 bg-cyan-600 rounded-full flex-shrink-0 ml-2"></span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              {selectedConversation && selectedConv ? (
                <div className="hidden md:flex flex-1 flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={selectedConv.avatar}
                          alt={selectedConv.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedConv.online && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedConv.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedConv.online ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages[selectedConversation]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === "me"
                              ? "bg-cyan-600 text-white rounded-br-md"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md"
                          }`}
                        >
                          <p>{message.content}</p>
                          <div
                            className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                              message.senderId === "me" ? "text-cyan-100" : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {message.timestamp}
                            {message.senderId === "me" && (
                              message.read ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex flex-1 items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-gray-400">
                      <MessageSquare className="h-12 w-12" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}