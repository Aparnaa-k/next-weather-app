import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

const achievements = [
  {
    title: 'React Certification',
    issuer: 'Professional Certification',
    icon: '⚛️',
    gradient: 'from-[#7C3AED] to-[#06B6D4]',
  },
  {
    title: 'Node.js Certification',
    issuer: 'Backend Development',
    icon: '🟢',
    gradient: 'from-[#06B6D4] to-purple-500',
  },
  {
    title: 'Backend Development',
    issuer: 'Full Stack Certification',
    icon: '💻',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Python Certification',
    issuer: 'Programming Fundamentals',
    icon: '🐍',
    gradient: 'from-pink-500 to-[#7C3AED]',
  },
  {
    title: 'Tableau Certification',
    issuer: 'Data Visualization',
    icon: '📊',
    gradient: 'from-[#7C3AED] to-[#06B6D4]',
  },
];

export function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative py-32 bg-[#1E293B] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px] opacity-20" />
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
            Achievements & Certifications
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Continuous learning and professional growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500">
                {/* Badge Icon */}
                <motion.div
                  className={`absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br ${achievement.gradient} flex items-center justify-center text-3xl shadow-lg shadow-[#7C3AED]/30`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {achievement.icon}
                </motion.div>

                {/* Award Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Award className="text-white" size={28} />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {achievement.title}
                </h3>
                <p
                  className="text-gray-400 mb-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {achievement.issuer}
                </p>

                {/* Verified Badge */}
                <div className="flex items-center gap-2 text-[#06B6D4]">
                  <CheckCircle2 size={16} />
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Verified Certificate
                  </span>
                </div>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Committed to staying current with the latest technologies and best
            practices in web development and design
          </p>
        </motion.div>
      </div>
    </section>
  );
}
