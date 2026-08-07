'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stages = [
  { id: 'hero', label: 'Hero', name: 'Home' },
  { id: 'about', label: 'About', name: 'About' },
  { id: 'services', label: 'Services', name: 'Services' },
  { id: 'contact', label: 'Contact', name: 'Contact' },
];

const STAGE_HEIGHT = 80;

export default function StageIndicator() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;

      for (let index = 0; index < stages.length; index++) {
        const section = document.getElementById(stages[index].id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
            setActiveStage(index);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.id}
          className="flex items-center justify-end gap-4 h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* Label with smooth animation */}
          <motion.div
            className="text-right overflow-hidden"
            animate={{
              opacity: activeStage === index ? 1 : 0.3,
              x: activeStage === index ? 0 : 8,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-orange text-[10px] uppercase tracking-[0.2em] font-medium whitespace-nowrap leading-tight">
              {stage.label}
            </p>
            <p className="text-white/40 text-[9px] uppercase tracking-[0.15em] whitespace-nowrap leading-tight">
              {`0${index + 1} / 0${stages.length}`}
            </p>
          </motion.div>

          {/* Dot indicator */}
          <motion.button
            onClick={() => handleClick(stage.id)}
            className="rounded-full flex-shrink-0"
            animate={{
              width: activeStage === index ? 32 : 12,
              height: 12,
              backgroundColor: activeStage === index ? '#FF4500' : 'rgba(255, 255, 255, 0.2)',
            }}
            whileHover={{
              backgroundColor: activeStage === index ? '#FF4500' : 'rgba(255, 255, 255, 0.4)',
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Go to ${stage.name}`}
          />
        </motion.div>
      ))}

      {/* Progress line */}
      <motion.div
        className="absolute right-[6px] w-px bg-gradient-to-b from-orange/50 to-orange/0 pointer-events-none"
        style={{
          top: `calc(50% - ${(stages.length * STAGE_HEIGHT) / 2}px)`,
        }}
        animate={{
          height: STAGE_HEIGHT + 20,
          y: activeStage * STAGE_HEIGHT,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
