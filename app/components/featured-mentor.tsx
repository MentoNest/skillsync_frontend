"use client";

import Image from "next/image";


const FeaturedMentor = () => {
    return (
        <section className="w-full py-responsive bg-[#F9F9FF]">
            <div className="container-responsive">
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20 max-w-7xl mx-auto">
                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 relative flex-shrink-0">
                        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] rounded-2xl md:rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-responsive transition-transform duration-500 hover:scale-[1.02]">
                            <Image
                                src="/Image (Cole Hathans).svg"
                                alt="Featured Mentors collaborating"
                                fill
                                className="object-cover img-responsive"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Optional overlay/border effect to match the image's rounded corners feel */}
                            <div className="absolute inset-0 border-[8px] border-white/10 rounded-[2rem] pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Text Content Column */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left mt-8 lg:mt-0">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#111827] leading-[1.15] mb-4 md:mb-6 tracking-tight">
                            Your Potential Can be <br />
                            <span className="text-[#111827]">Unlocked Today</span>
                        </h2>

                        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mb-6 md:mb-10">
                            Join thousands of professionals who have accelerated their careers through
                            personalized mentorship. Whether you're looking to switch careers, advance in
                            your current role, or learn new skills, our mentors are here to guide you.
                        </p>

                        <button type="button" aria-label="Get started with SkillSync" className="bg-[#9333ea] hover:bg-[#7e22ce] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(147,51,234,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(147,51,234,0.5)] transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedMentor;
