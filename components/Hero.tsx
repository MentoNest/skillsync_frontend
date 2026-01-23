'use client';

import { useState } from 'react';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <span className="text-xl font-bold text-gray-900">SkillSync</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Sign In
          </button>
          <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-gray-600"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute z-20 w-full bg-white shadow-lg">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors text-left">
              Sign In
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 px-6 pt-20 pb-16 md:px-12 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
            <span className="w-2 h-2 mr-2 bg-blue-600 rounded-full animate-pulse"></span>
            Now accepting new mentors and mentees
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Grow Your Skills with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Expert Mentorship
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with industry experts, accelerate your learning journey, and achieve your career goals with personalized 1-on-1 mentorship tailored to your ambitions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Find Your Mentor
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all">
              Become a Mentor
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>1000+ Expert Mentors</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>30-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>
    </div>
  );
}
