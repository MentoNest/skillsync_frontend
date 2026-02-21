"use client"

import { ReactNode } from "react"
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap } from "lucide-react"
import MentorCard from "./MentorCard"

interface AuthLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export default function AuthLayout({ 
  children, 
  title = "Welcome to SkillSync",
  subtitle = "Create your account to get started"
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Authentication Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">SkillSync</h1>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>

      {/* Right Column - Promotional Section */}
      <div className="flex-1 bg-linear-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden hidden lg:flex lg:flex-col lg:items-center lg:justify-center p-12">
        {/* Background Icons */}
        <div className="absolute top-10 left-10 text-white/20">
          <BookOpen size={40} />
        </div>
        <div className="absolute bottom-10 right-10 text-white/20">
          <GraduationCap size={40} />
        </div>
        <div className="absolute top-1/3 right-20 text-white/10">
          <BookOpen size={60} />
        </div>
        <div className="absolute bottom-1/3 left-20 text-white/10">
          <GraduationCap size={60} />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-8 right-8 flex gap-2">
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Featured Mentor Card */}
        <div className="mb-8">
          <MentorCard
            name="Tony Adebanjo"
            title="Software Specialist"
            experience="10 years"
            rating={4.5}
            price="$200.00"
            initials="TA"
          />
        </div>

        {/* Testimonial Text */}
        <div className="text-center max-w-md">
          <h3 className="text-2xl font-bold text-white mb-4">
            Grow confidently with support from skilled mentors who care
          </h3>
        </div>
      </div>
    </div>
  )
}
