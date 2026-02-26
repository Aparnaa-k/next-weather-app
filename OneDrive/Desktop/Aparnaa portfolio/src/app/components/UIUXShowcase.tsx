import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Smartphone, Monitor, Figma, Palette } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const uiShowcase = [
  {
    title: 'Mobile App Design',
    description: 'Modern mobile UI with intuitive navigation',
    icon: Smartphone,
    image: 'mobile app interface design',
    gradient: 'from-[#7C3AED] to-[#06B6D4]',
  },
  {
    title: 'Dashboard Interface',
    description: 'Data visualization and analytics dashboard',
    icon: Monitor,
    image: 'modern dashboard analytics',
    gradient: 'from-[#06B6D4] to-purple-500',
  },
  {
    title: 'Design System',
    description: 'Comprehensive component library',
    icon: Palette,
    image: 'design system components',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Figma Prototypes',
    description: 'Interactive prototypes and wireframes',
    icon: Figma,
    image: 'figma wireframe prototype',
    gradient: 'from-pink-500 to-[#7C3AED]',
  },
];

export function UIUXShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="uiux"
      ref={ref}
      className="relative py-32 bg-[#0F172A] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px] opacity-20" />
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
            UI/UX Design Portfolio
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Crafting beautiful and functional user experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {uiShowcase.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
                {/* Design Preview */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#7C3AED]/10 to-[#06B6D4]/10">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/900x800/?${encodeURIComponent(
                      item.image
                    )}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay with Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent flex items-end p-8">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="text-white" size={28} />
                    </motion.div>
                  </div>

                  {/* Hover Preview Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-gray-400"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.description}
                  </p>

                  <motion.button
                    className="mt-6 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 transition-all"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Design →
                  </motion.button>
                </div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Design Tools */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3
            className="text-2xl font-bold text-white mb-8"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Design Tools & Process
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'User Research',
              'Wireframing',
              'Prototyping',
              'Usability Testing',
              'Design Systems',
              'Interaction Design',
            ].map((tool, index) => (
              <motion.div
                key={tool}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#7C3AED]/10 to-[#06B6D4]/10 border border-white/10 text-gray-300 hover:border-[#7C3AED] hover:text-white transition-all cursor-default"
                whileHover={{ scale: 1.1, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
