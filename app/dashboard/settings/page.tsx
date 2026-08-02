"use client";

import React, { useState } from "react";
import { User, Bell, Shield, CreditCard, LogOut, Save, Upload } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "billing">("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    bio: "Aspiring product manager looking to grow my career in tech. Passionate about building user-centered products.",
    location: "San Francisco, CA",
    jobTitle: "Junior Product Manager",
    company: "StartupXYZ",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
    { id: "security", label: "Security", icon: <Shield className="h-5 w-5" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-5 w-5" /> },
  ];

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile saved successfully!");
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="max-w-screen-xl mx-auto px-4 py-12 sm:py-16">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Settings
            </h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
                {activeTab === "profile" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h2>
                      <p className="text-gray-500 dark:text-gray-400">Manage your personal information and public profile.</p>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <button className="absolute bottom-0 right-0 p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors shadow-lg">
                          <Upload className="h-4 w-4" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{profileData.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG up to 5MB</p>
                        <button className="mt-2 text-sm font-medium text-cyan-600 hover:text-cyan-700">Change photo</button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          name="jobTitle"
                          value={profileData.jobTitle}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={profileData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <Save className="h-5 w-5" />
                        {isSaving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h2>
                      <p className="text-gray-500 dark:text-gray-400">Control when and how you receive notifications.</p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { title: "Email Notifications", description: "Receive email updates about your mentorship activities", enabled: true },
                        { title: "Session Reminders", description: "Get reminders before your upcoming mentorship sessions", enabled: true },
                        { title: "Message Notifications", description: "Receive notifications when you get new messages", enabled: true },
                        { title: "Marketing Emails", description: "Receive updates about new features and platform improvements", enabled: false },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                          </div>
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.enabled ? "bg-cyan-600" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.enabled ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Security Settings</h2>
                      <p className="text-gray-500 dark:text-gray-400">Manage your account security and authentication.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Change Password</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your password to keep your account secure</p>
                          </div>
                          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                            Update
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add an extra layer of security to your account</p>
                          </div>
                          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                            Enable
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Active Sessions</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your active login sessions across devices</p>
                          </div>
                          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
                            View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "billing" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Billing & Subscription</h2>
                      <p className="text-gray-500 dark:text-gray-400">Manage your subscription plan and payment methods.</p>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-cyan-100 text-sm font-medium">Current Plan</p>
                          <h3 className="text-2xl font-bold mt-1">Pro Plan</h3>
                          <p className="text-cyan-100 mt-2">$29/month • Renews on August 15, 2024</p>
                        </div>
                        <button className="px-4 py-2 bg-white text-cyan-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                          Manage Plan
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h3>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/26</p>
                          </div>
                        </div>
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Edit</button>
                      </div>
                      <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-cyan-500 hover:text-cyan-600 transition-colors">
                        + Add Payment Method
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100 dark:border-gray-700">
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">Jul 15, 2024</td>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">Pro Plan Subscription</td>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">$29.00</td>
                              <td className="py-4 px-4"><span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Paid</span></td>
                            </tr>
                            <tr className="border-b border-gray-100 dark:border-gray-700">
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">Jun 15, 2024</td>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">Pro Plan Subscription</td>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">$29.00</td>
                              <td className="py-4 px-4"><span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Paid</span></td>
                            </tr>
                            <tr>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">May 15, 2024</td>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">Pro Plan Subscription</td>
                              <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">$29.00</td>
                              <td className="py-4 px-4"><span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Paid</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}