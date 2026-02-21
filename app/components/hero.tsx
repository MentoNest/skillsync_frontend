"use client";


import Image from "next/image";
import { User, ShieldCheck, Briefcase } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative w-full py-20 lg:py-32 bg-white overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-40 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Headline Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
                        We Connect You with the Right{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333ea] to-[#c084fc]">
                            Mentors for your Growth
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Get personalized guidance from industry experts and accelerate your career journey
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto bg-[#9333ea] hover:bg-[#7e22ce] text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(147,51,234,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(147,51,234,0.5)] transform hover:-translate-y-1 active:scale-95">
                            Find a Mentor
                        </button>

                    </div>
                </div>

                {/* Mentor Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24">
                    {/* Mentor Card 1 */}
                    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2">
                        <div className="h-72 bg-gray-100 relative overflow-hidden">

                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
                                <Image
                                    src="/Image (Cole Hathans).svg"
                                    alt="Sarah - Top Mentor"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#9333ea] flex items-center gap-1">
                                    <ShieldCheck size={12} /> Verified Expert
                                </span>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#9333ea] transition-colors">Cole Hathans</h3>
                                <div className="flex items-center text-yellow-400">
                                    <span className="text-sm font-bold text-gray-900 mr-1">4.9</span>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
                                <Briefcase size={16} /> Expert Career Counsellor
                            </p>
                            <div className="h-1 w-12 bg-purple-200 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Mentor Card 2 */}
                    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2">
                        <div className="h-72 bg-gray-100 relative overflow-hidden">

                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
                                <Image
                                    src="/Image (Sarah Johnson).svg"
                                    alt="Sarah - Top Mentor"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#9333ea] flex items-center gap-1">
                                    <ShieldCheck size={12} /> Top Mentor
                                </span>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#9333ea] transition-colors">Sarah Johnson</h3>
                                <div className="flex items-center text-yellow-400">
                                    <span className="text-sm font-bold text-gray-900 mr-1">5.0</span>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
                                <Briefcase size={16} /> Tech Leadership Coach
                            </p>
                            <div className="h-1 w-12 bg-purple-200 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Mentor Card 3 */}
                    <div className="group bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2">
                        <div className="h-72 bg-gray-100 relative overflow-hidden">

                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
                                <Image
                                    src="/Image (Marcus Williams).svg"
                                    alt="Sarah - Top Mentor"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#9333ea] flex items-center gap-1">
                                    <ShieldCheck size={12} /> Staff Consultant
                                </span>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#9333ea] transition-colors">Marcus Williams</h3>
                                <div className="flex items-center text-yellow-400">
                                    <span className="text-sm font-bold text-gray-900 mr-1">4.8</span>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium mb-4 flex items-center gap-2">
                                <Briefcase size={16} /> Business Strategy Consultant
                            </p>
                            <div className="h-1 w-12 bg-purple-200 rounded-full group-hover:w-full transition-all duration-500"></div>
                        </div>
                    </div>
                </div>

                {/* Brand Logos Section */}
                <div className="mt-32 border-t border-gray-100 pt-16">
                    <p className="text-center text-gray-400 font-semibold mb-10 tracking-widest uppercase text-sm">Trusted by teams at</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-3xl font-black text-gray-600 tracking-tighter hover:text-blue-600 transition-colors">Google</span>
                        <span className="text-3xl font-black text-gray-600 tracking-tighter hover:text-green-600 transition-colors">Spotify</span>
                        <span className="text-3xl font-black text-gray-600 tracking-tighter hover:text-blue-700 transition-colors">LinkedIn</span>
                        <span className="text-3xl font-black text-gray-600 tracking-tighter hover:text-black transition-colors">Microsoft</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
