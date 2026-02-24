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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Authentication Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
        <div className="w-full max-w-md sm:max-w-lg">
          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SkillSync</h1>
          </div>

          {/* Welcome Message */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>

      {/* Right Column - Promotional Section */}
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden hidden md:flex flex-col items-center justify-center p-8 md:p-10 lg:p-12">
        {/* Background Icons */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10 text-white/20">
          <BookOpen size={24} className="sm:hidden" />
          <BookOpen size={32} className="hidden sm:block md:hidden" />
          <BookOpen size={40} className="hidden md:block" />
        </div>
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 text-white/20">
          <GraduationCap size={24} className="sm:hidden" />
          <GraduationCap size={32} className="hidden sm:block md:hidden" />
          <GraduationCap size={40} className="hidden md:block" />
        </div>
        <div className="absolute top-1/4 right-8 sm:top-1/3 sm:right-12 md:top-1/3 md:right-16 lg:top-1/3 lg:right-20 text-white/10">
          <BookOpen size={36} className="sm:hidden" />
          <BookOpen size={48} className="hidden sm:block md:hidden" />
          <BookOpen size={60} className="hidden md:block" />
        </div>
        <div className="absolute bottom-1/4 left-8 sm:bottom-1/3 sm:left-12 md:bottom-1/3 md:left-16 lg:bottom-1/3 lg:left-20 text-white/10">
          <GraduationCap size={36} className="sm:hidden" />
          <GraduationCap size={48} className="hidden sm:block md:hidden" />
          <GraduationCap size={60} className="hidden md:block" />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 flex gap-1 sm:gap-2">
          <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <ChevronLeft size={16} className="sm:hidden" />
            <ChevronLeft size={20} className="hidden sm:block" />
          </button>
          <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <ChevronRight size={16} className="sm:hidden" />
            <ChevronRight size={20} className="hidden sm:block" />
          </button>
        </div>

        {/* Featured Mentor Card */}
        <div className="mb-6 sm:mb-8">
          <MentorCard
            name="Tony Adebanjo"
            role="Software Specialist"
            description="10 years of experience in software development"
            rating={4.5}
            reviewCount={25}
            price="$200.00"
            initials="TA"
          />
        </div>

        {/* Testimonial Text */}
        <div className="text-center max-w-xs sm:max-w-sm md:max-w-md">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Grow confidently with support from skilled mentors who care
          </h3>
        </div>
      </div>
    </div>
  )
}
