import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code, Palette, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Expertise',
    icon: Code,
    color: 'from-[#7C3AED] to-[#06B6D4]',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Ant Design', level: 90 },
      { name: 'SCSS', level: 85 },
      { name: 'Redux', level: 85 },
      { name: 'Flutter', level: 80 },
    ],
  },
  {
    title: 'UI/UX Expertise',
    icon: Palette,
    color: 'from-[#06B6D4] to-[#7C3AED]',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Figma Make AI', level: 90 },
      { name: 'Wireframing', level: 90 },
      { name: 'Prototyping', level: 90 },
      { name: 'Design Systems', level: 85 },
      { name: 'UX Research', level: 85 },
      { name: 'Interaction Design', level: 90 },
    ],
  },
  {
    title: 'Backend Skills',
    icon: Database,
    color: 'from-[#7C3AED] to-purple-500',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Supabase', level: 80 },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: 'from-[#06B6D4] to-blue-500',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
      { name: 'Bitbucket', level: 85 },
      { name: 'Zoho Sprints', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Cursor AI', level: 90 },
    ],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-[#0F172A] to-[#1E293B] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px]" />
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
            Skills & Expertise
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            A comprehensive toolkit for building modern digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#7C3AED]/10">
                {/* Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                  >
                    <category.icon className="text-white" size={28} />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: categoryIndex * 0.2 + skillIndex * 0.1,
                        duration: 0.4,
                      }}
                      className="group/skill"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="text-gray-300 font-medium group-hover/skill:text-white transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {skill.name}
                        </span>
                        <span className="text-[#06B6D4] font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{
                            delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                            duration: 1,
                            ease: 'easeOut',
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Skill Badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {['React', 'Next.js', 'TypeScript', 'Figma', 'Node.js', 'MongoDB'].map(
            (tech, index) => (
              <motion.div
                key={tech}
                className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED]/10 transition-all cursor-default"
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {tech}
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
