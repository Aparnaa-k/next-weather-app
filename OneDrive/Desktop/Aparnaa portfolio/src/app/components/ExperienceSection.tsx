import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    role: 'MERN Stack Developer Intern',
    company: 'Mallow Technologies',
    period: 'Feb 2025 – Feb 2026',
    highlights: [
      'Developed scalable React.js applications',
      'Used Ant Design, SCSS, Redux-Saga',
      'Improved code performance and reduced bugs',
      'Worked in Agile Scrum teams',
      'Managed tasks using Zoho Sprints',
    ],
    color: 'from-[#7C3AED] to-[#06B6D4]',
  },
  {
    role: 'React Developer',
    company: 'KwickMetrics',
    period: '2024',
    highlights: [
      'Built responsive frontend interfaces',
      'Worked with complex real-world applications',
      'Implemented modern React patterns',
      'Collaborated with cross-functional teams',
    ],
    color: 'from-[#06B6D4] to-purple-500',
  },
  {
    role: 'Founder',
    company: 'Bliss Yoga Life',
    period: '2023 – Present',
    highlights: [
      'Built full MERN stack platform',
      'Designed UI/UX and frontend architecture',
      'Managed product development lifecycle',
      'Implemented scalable solutions',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    role: 'Registration Manager',
    company: 'TCS iON',
    period: 'Jan 2022 – Oct 2022 · 10 mos',
    highlights: [
      'Handled registrations for major competitive exams',
      'Managed JEE, IIT, SSC, and bank exams',
      'Provided help desk support to candidates',
      'Part-time, On-site in Bengaluru, Karnataka',
    ],
    color: 'from-pink-500 to-[#7C3AED]',
  },
  {
    role: 'Yoga Teacher',
    company: 'Nitte International School Bangalore',
    period: 'Jul 2021 – Oct 2021 · 4 mos',
    highlights: [
      'Taught Children\'s Yoga remotely',
      'Created engaging yoga instruction programs',
      'Worked part-time from Bengaluru, Karnataka',
      'Developed yoga curriculum for young students',
    ],
    color: 'from-[#7C3AED] to-[#06B6D4]',
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-32 bg-[#1E293B] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
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
            Experience
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Building products and solving real-world problems
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] via-[#06B6D4] to-purple-500" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className={`relative flex items-center ${
                  index % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] items-center justify-center shadow-lg shadow-[#7C3AED]/50 z-10">
                  <Briefcase className="text-white" size={24} />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-4rem)] ${
                    index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                  }`}
                >
                  <motion.div
                    className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Role & Company */}
                    <div className="mb-6">
                      <h3
                        className="text-2xl font-bold text-white mb-2"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className={`text-lg font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {exp.company}
                      </p>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 text-gray-400 mb-6">
                      <Calendar size={16} />
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>
                        {exp.period}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-3">
                      {exp.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: index * 0.3 + hIndex * 0.1 + 0.3,
                          }}
                        >
                          <CheckCircle2
                            className="text-[#06B6D4] mt-1 flex-shrink-0"
                            size={16}
                          />
                          <p
                            className="text-gray-300"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {highlight}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover Glow */}
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}