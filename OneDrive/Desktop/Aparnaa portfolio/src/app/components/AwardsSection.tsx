import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Trophy, Medal, Star } from 'lucide-react';

const awards = [
  {
    title: 'NNI Leadership Award',
    date: 'Jun 2025',
    icon: Trophy,
    color: 'from-[#7C3AED] to-[#06B6D4]',
  },
  {
    title: 'India Icon Star Award',
    date: 'Aug 2022',
    icon: Star,
    color: 'from-[#06B6D4] to-purple-500',
  },
  {
    title: 'International Golden Achievement Awards',
    date: 'Apr 2022',
    icon: Award,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'India 500 Most Inspiring People Award',
    date: 'Feb 2022',
    icon: Medal,
    color: 'from-pink-500 to-[#7C3AED]',
  },
  {
    title: 'Best Yoga Instructor Award',
    issuer: 'Digital Media News Channel (MTTV)',
    date: 'Jan 2022',
    icon: Trophy,
    color: 'from-[#7C3AED] to-[#06B6D4]',
  },
  {
    title: 'Honorary Doctorate Award',
    issuer: 'Magic Books of Records',
    date: 'Jan 2022',
    icon: Award,
    color: 'from-[#06B6D4] to-purple-500',
  },
  {
    title: 'India Star Community Star Award',
    issuer: 'Digital Media News Channel (MTTV)',
    date: 'Jan 2022',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Best Young Achiever of the Year Award',
    date: 'Dec 2021',
    icon: Medal,
    color: 'from-pink-500 to-[#7C3AED]',
  },
  {
    title: "Golden Women's Achievers Award",
    date: 'Sep 2021',
    icon: Trophy,
    color: 'from-[#7C3AED] to-[#06B6D4]',
  },
  {
    title: 'Sadhaka Ratna Award',
    date: 'Sep 2021',
    icon: Award,
    color: 'from-[#06B6D4] to-purple-500',
  },
  {
    title: 'Global Yoga Shilpa Award',
    date: 'Jan 2017',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Global Yogarjuna Award',
    date: 'Jan 2016',
    icon: Medal,
    color: 'from-pink-500 to-[#7C3AED]',
  },
];

export function AwardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="awards"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-[#1E293B] to-[#0F172A] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Awards & Recognition
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Honored with prestigious awards across yoga, leadership, and
            achievement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${award.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <award.icon className="text-white" size={28} />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#06B6D4] group-hover:bg-clip-text group-hover:text-transparent transition-all"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {award.title}
                </h3>

                {/* Issuer */}
                {award.issuer && (
                  <p
                    className="text-gray-400 text-sm mb-3"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {award.issuer}
                  </p>
                )}

                {/* Date */}
                <p
                  className="text-[#06B6D4] text-sm font-semibold"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {award.date}
                </p>

                {/* Hover Glow */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[
            {
              number: '12+',
              label: 'National & International Awards',
              icon: Trophy,
            },
            {
              number: '3',
              label: 'International Competitions',
              icon: Medal,
            },
            {
              number: '2019',
              label: 'Representing India in Malaysia',
              icon: Star,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="text-white" size={24} />
                </div>
                <div
                  className="text-4xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {stat.number}
                </div>
              </div>
              <p
                className="text-gray-300 text-lg"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
