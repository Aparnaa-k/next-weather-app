import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './utils/ImageWithFallback';

const projects = [
  {
    title: 'Bliss Yoga Life',
    description:
      'Full MERN stack yoga platform with modern UI, interactive features, and scalable architecture.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    gradient: 'from-[#7C3AED] to-[#06B6D4]',
    image: 'https://images.unsplash.com/photo-1767611104887-2db75e031490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHN0dWRpb3xlbnwxfHx8fDE3NzIwNDU4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'WidgetHub',
    description:
      'Next.js and TypeScript app providing real-time location and weather information.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    gradient: 'from-[#06B6D4] to-purple-500',
    image: 'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzcyMDYwODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Food Application',
    description:
      'Fully responsive React application with Redux and Tailwind.',
    tech: ['React', 'Redux', 'Tailwind'],
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1601972602288-3be527b4f18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBhcHB8ZW58MXx8fHwxNzcyMDQ2ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'TripForge Smart Billing',
    description:
      'Flutter and Node.js application that generates automated billing from trip data.',
    tech: ['Flutter', 'Node.js', 'MongoDB'],
    gradient: 'from-pink-500 to-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1732896066042-89c92a60421b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0ZWQlMjBpbnZvaWNlJTIwZ2VuZXJhdGlvbnxlbnwxfHx8fDE3NzIwODE1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-[#1E293B] to-[#0F172A] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px]" />
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
            Featured Projects
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Real-world applications built with modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <h3
                    className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#06B6D4] group-hover:bg-clip-text group-hover:text-transparent transition-all"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-gray-400 mb-6 leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.button
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#7C3AED]/50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      View Project
                    </motion.button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}