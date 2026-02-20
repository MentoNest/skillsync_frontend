import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Visual Content */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            SkillSync
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Connect with industry experts, grow your skills, and build your career with blockchain-verified mentorship.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl shadow-2xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl shadow-2xl" />
        
        <div className="relative z-10">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} SkillSync. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="lg:hidden text-center mb-8">
             <h2 className="text-2xl font-bold text-primary">SkillSync</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
