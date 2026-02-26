import { motion } from 'motion/react';
import { useState } from 'react';
import profileImage from '../../assets/profileImage.png';
import casualImage from '../../assets/casualImage.png';

interface ProfilePhoto3DProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  variant?: 'professional' | 'casual';
}

export function ProfilePhoto3D({ size = 'medium', className = '', variant = 'professional' }: ProfilePhoto3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const imageSrc = variant === 'casual' ? casualImage : profileImage;

  const sizeClasses = {
    small: 'w-64 h-64',
    medium: 'w-80 h-80',
    large: 'w-full h-full aspect-square',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation based on mouse position (max 15 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`${sizeClasses[size]} ${className} perspective-1000`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Photo Container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
            <motion.img
              src={imageSrc}
              alt="Aparnaa Kumar - Full Stack Developer"
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />

          {/* Floating Rings */}
          <motion.div
            className="absolute top-8 right-8 w-20 h-20 border-2 border-[#7C3AED]/40 rounded-full pointer-events-none"
            style={{ transform: 'translateZ(50px)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-2 border-[#06B6D4]/40 rounded-lg pointer-events-none"
            style={{ transform: 'translateZ(30px)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 5,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* 3D Shadow */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 blur-2xl"
          style={{
            transform: 'translateZ(-100px)',
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* Floating Animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}