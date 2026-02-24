import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Mentors', value: '120+' },
  { label: 'Mentees', value: '2,500+' },
  { label: 'Learning Tracks', value: '35+' },
  { label: 'Resources', value: '400+' },
  { label: 'Sessions Held', value: '1,200+' },
];

export default function PlatformStatistics() {
  return (
    <motion.section
      className="w-full py-12 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-gray-50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-blue-700 tracking-tight drop-shadow-lg">
          Platform Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.08, boxShadow: "0 8px 32px rgba(59,130,246,0.15)" }}
            >
              <motion.span
                className="text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow group-hover:text-blue-800 transition-colors duration-300"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {stat.value}
              </motion.span>
              <span className="mt-3 text-gray-700 font-semibold text-lg tracking-wide group-hover:text-blue-600 transition-colors duration-300">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
