'use client';

import { useState } from 'react';

export default function TestimonialsSection() {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (name) => {
    setImgErrors(prev => ({ ...prev, [name]: true }));
  };
  return (
    <section className="testimonials bg-white py-20 text-slate-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">Success stories</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Mentorship that helps people reach their next milestone.</h2>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col items-center">
            <div className="mb-6">
              <img
                src={imgErrors['amina'] ? '/tony-adebanjo.jpg' : '/Image (Sarah Johnson).svg'}
                alt="Amina"
                className="w-16 h-16 rounded-full border-4 border-cyan-500"
                onError={() => handleImgError('amina')}
              />
            </div>
            <p className="text-lg leading-8 text-slate-700 text-center">&quot;My mentor helped me define the skills I needed to land a senior position, and the weekly check-ins kept me accountable. I got the offer in three months.&quot;</p>
            <p className="mt-6 font-semibold text-slate-950 text-center">Amina, Product Manager</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col items-center">
            <div className="mb-6">
              <img
                src={imgErrors['daniel'] ? '/tony-adebanjo.jpg' : '/Image (Marcus Williams).svg'}
                alt="Daniel"
                className="w-16 h-16 rounded-full border-4 border-cyan-500"
                onError={() => handleImgError('daniel')}
              />
            </div>
            <p className="text-lg leading-8 text-slate-700 text-center">&quot;The feedback on my interview strategy was clear, practical, and immediately useful. The coaching gave me the edge I needed.&quot;</p>
            <p className="mt-6 font-semibold text-slate-950 text-center">Daniel, Software Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
