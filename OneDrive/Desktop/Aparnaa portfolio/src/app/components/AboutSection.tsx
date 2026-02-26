import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Palette, Rocket, Heart } from 'lucide-react';
import { ProfilePhoto3D } from './ProfilePhoto3D';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code2,
      title: 'Frontend Expert',
      description: 'Mastery in React, Next.js, and modern JavaScript',
      color: 'from-[#7C3AED] to-[#06B6D4]',
    },
    {
      icon: Palette,
      title: 'UI/UX Designer',
      description: 'Creating beautiful and intuitive user experiences',
      color: 'from-[#06B6D4] to-purple-500',
    },
    {
      icon: Rocket,
      title: 'Product Builder',
      description: 'From concept to deployment with precision',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Passionate Creator',
      description: 'Building products that make a difference',
      color: 'from-pink-500 to-[#7C3AED]',
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-[#0F172A] to-[#1E293B] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px]" />
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
            About Me
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Passionate about creating exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <ProfilePhoto3D size="large" variant="casual" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <h3
                className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Professional Life
              </h3>

              <p
                className="text-gray-300 text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                A passionate <span className="text-[#7C3AED] font-semibold">Software Product Engineer</span> and{' '}
                <span className="text-[#06B6D4] font-semibold">Full Stack Developer</span> with
                professional experience at Mallow Technologies, where I contributed technical skills and passion for
                innovation building scalable web applications.
              </p>

              <p
                className="text-gray-300 text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Experienced in modern frontend technologies including{' '}
                <span className="text-white font-semibold">React</span>,{' '}
                <span className="text-white font-semibold">Next.js</span>, and the full MERN stack.
                Skilled in translating product requirements into elegant and efficient user experiences
                using tools like Ant Design, SCSS, and Redux-Saga.
              </p>

              <p
                className="text-gray-300 text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Founder of <span className="text-[#7C3AED] font-semibold">Bliss Yoga Life</span>, a
                full MERN stack platform that combines my technical expertise with my passion for yoga,
                bringing wellness to the digital space.
              </p>

              <h3
                className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent mb-6 mt-8"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Personal Passions & Achievements
              </h3>

              <p
                className="text-gray-300 text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Beyond technology, I'm an accomplished{' '}
                <span className="text-[#06B6D4] font-semibold">International Yoga Champion</span>,
                having represented India at the TRACCS International Yoga Carnival 2019 in Malaysia,
                winning a <span className="text-white font-semibold">Bronze Medal</span>. I've also
                competed at the 1st International Yoga Olympic Games 2020.
              </p>

              <p
                className="text-gray-300 text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                My yoga journey includes a{' '}
                <span className="text-white font-semibold">National Gold Medal</span> at Shivamogga
                (2020), State Level Gold, and National Bronze at the 5th National Ownchoice Yogasana
                Championship 2019. Honored with prestigious awards including the NNI Leadership Award
                (2025), Sadhaka Rathna Award (2021), and India Star Young Achiever Award (2021).
              </p>

              <p
                className="text-gray-300 text-lg leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                I'm also a determined state-level{' '}
                <span className="text-white font-semibold">Kabaddi player</span>, trained{' '}
                <span className="text-white font-semibold">Bharatanatyam and folk dancer</span>,
                and experienced event host. My life is a testament to balancing technology, sports,
                arts, and wellness with equal passion and dedication.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: '15+', label: 'Projects' },
                  { number: '2+', label: 'Years Exp' },
                  { number: '10+', label: 'Tech Stack' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div
                      className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent mb-2"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="text-gray-400 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <highlight.icon className="text-white" size={24} />
              </div>
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {highlight.title}
              </h3>
              <p
                className="text-gray-400 text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {highlight.description}
              </p>

              {/* Hover Glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}