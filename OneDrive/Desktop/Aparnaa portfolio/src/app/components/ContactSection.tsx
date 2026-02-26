import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Send, Mail, Linkedin, Github, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/aparnaa-kumar-1308ak/',
      color: 'from-[#0077B5] to-[#00A0DC]',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/Aparnaa-k',
      color: 'from-[#6e5494] to-[#8b6bb7]',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:aparnaakumar13reddy@gmail.com',
      color: 'from-[#7C3AED] to-[#06B6D4]',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 bg-gradient-to-b from-[#1E293B] to-[#0F172A] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06B6D4] rounded-full blur-[150px] opacity-20" />
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
            Let's Work Together
          </h2>
          <p
            className="text-gray-400 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Have a project in mind? Let's create something amazing together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-300 mb-2 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all"
                    placeholder="Your name"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 mb-2 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all"
                    placeholder="Your email ID"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-300 mb-2 font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <MessageCircle size={20} />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Social Links */}
            <div className="space-y-6">
              <h3
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Connect With Me
              </h3>

              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.02, x: 5 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <social.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <div
                      className="text-white font-semibold group-hover:text-[#7C3AED] transition-colors"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {social.name}
                    </div>
                    <div
                      className="text-gray-400 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {social.name === 'Email'
                        ? 'aparnaakumar13reddy@gmail.com' : social.name === 'LinkedIn' ? 'Aparnaa Kumar'
                        : `@aparnaa-K`}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              className="p-8 rounded-3xl bg-gradient-to-br from-[#7C3AED]/10 to-[#06B6D4]/10 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
            >
              <h4
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Quick Response
              </h4>
              <p
                className="text-gray-400 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                I typically respond within 24 hours. Looking forward to discussing
                your project and how we can work together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
