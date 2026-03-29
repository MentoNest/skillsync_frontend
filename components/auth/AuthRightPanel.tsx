'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function AuthRightPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900"></div>

      {/* Gradient Overlay Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-sm mx-auto">
        {/* Featured Mentor Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl border border-white/20 hover:border-white/40 transition-all duration-300">
          <div className="flex items-start gap-4">
            {/* Mentor Image */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-400">
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                AO
              </div>
            </div>

            {/* Mentor Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white">Dr. Amara Osei</h3>
                <span className="bg-yellow-400/20 text-yellow-200 text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
              <p className="text-sm text-purple-100 mb-2">Senior AI Engineer</p>

              {/* Rating and Stats */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-300 text-yellow-300"
                      />
                    ))}
                  </div>
                  <span className="text-purple-100">4.97</span>
                </div>
                <span className="text-purple-200">•</span>
                <span className="text-purple-100">312 sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-center">
          <p className="text-white text-xl md:text-2xl font-light mb-4 leading-relaxed">
            "Grow confidently with support from skilled mentors who care"
          </p>
          <p className="text-purple-200 text-sm">Join thousands of learners transforming their careers</p>
        </blockquote>

        {/* Decorative Elements */}
        <div className="flex gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
