'use client';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Level up your <span className="gradient-text">skills</span> <br />
          with expert mentors.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
          Connect with industry leaders, learn through hands-on projects, and accelerate your career with SkillSync's personalized learning ecosystem.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-primary/25">
            Start Your Journey
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass rounded-full font-semibold hover:bg-white/5 transition-all">
            Browse Mentors
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold font-mono">10k+</span>
            <span className="text-sm uppercase tracking-wider">Mentees</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold font-mono">500+</span>
            <span className="text-sm uppercase tracking-wider">Mentors</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold font-mono">50+</span>
            <span className="text-sm uppercase tracking-wider">Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold font-mono">95%</span>
            <span className="text-sm uppercase tracking-wider">Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
