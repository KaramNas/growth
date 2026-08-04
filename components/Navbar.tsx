'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const leftLinks = ['Services', 'Work'];
const rightLinks = ['About', 'Contact'];

const linkVariant = (direction: 'left' | 'right', i: number) => ({
  initial: { opacity: 0, x: direction === 'left' ? 80 : -80 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 1,
    delay: 0.9 + i * 0.12,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center h-24 px-40%">
      {/* Left links — spread outward from center */}
      <div className="flex items-center justify-end gap-12 flex-1">
        {leftLinks.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            {...linkVariant('left', i)}
            className="group flex items-center text-[11px] uppercase tracking-[0.28em] font-medium"
          >
            {link.split('').map((char, j) => (
              <span key={j} className="relative inline-block overflow-hidden">
                <span
                  className="block text-white/50 transition-transform duration-300 ease-out group-hover:translate-y-full"
                  style={{ transitionDelay: `${j * 30}ms` }}
                >
                  {char}
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center text-orange -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                  style={{ transitionDelay: `${j * 30}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </motion.a>
        ))}
      </div>

      {/* Center logo — fades + scales in first */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-72 flex justify-center items-center flex-shrink-0"
      >
        <Image
          src="/growthlogo.png"
          alt="Growth"
          width={150}
          height={60}
          style={{ height: 60, width: 'auto', objectFit: 'contain' }}
          priority
        />
      </motion.div>

      {/* Right links — spread outward from center */}
      <div className="flex items-center justify-start gap-12 flex-1">
        {rightLinks.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            {...linkVariant('right', i)}
            className="group flex items-center text-[11px] uppercase tracking-[0.28em] font-medium"
          >
            {link.split('').map((char, j) => (
              <span key={j} className="relative inline-block overflow-hidden">
                <span
                  className="block text-white/50 transition-transform duration-300 ease-out group-hover:translate-y-full"
                  style={{ transitionDelay: `${j * 30}ms` }}
                >
                  {char}
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center text-orange -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                  style={{ transitionDelay: `${j * 30}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </motion.a>
        ))}
      </div>
    </nav>
  );
}
