'use client';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DotsButton({ href, children, className = '' }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center justify-center gap-5 px-24 py-8 rounded-full ${className}`}
    >
      {/* Outer rounded border/overlay that fills in */}
      <div
        className="absolute rounded-full border-2 border-orange transition-all duration-700 ease-out"
        style={{
          top: '4px',
          left: '4px',
          right: '4px',
          bottom: '4px',
          background: isHovered
            ? 'linear-gradient(135deg, #FF4500 0%, #FF6B1A 100%)'
            : 'transparent',
          boxShadow: isHovered
            ? '0 0 30px rgba(255,69,0,0.5), inset 0 0 30px rgba(255,69,0,0.2)'
            : '0 0 10px rgba(255,69,0,0.2)',
        }}
      />

      {/* Inner glow effect */}
      <div
        className="absolute rounded-full opacity-0 transition-opacity duration-500"
        style={{
          top: '6px',
          left: '6px',
          right: '6px',
          bottom: '6px',
          opacity: isHovered ? 0.3 : 0,
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Text and icon */}
      <span
        className={`relative font-bold text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${
          isHovered ? 'text-white' : 'text-orange'
        }`}
      >
        {children}
      </span>

      {/* Arrow icon that slides in */}
      <div
        className="relative transition-all duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(-8px) scale(0.7)',
        }}
      >
        <ArrowRight
          size={14}
          className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-orange'}`}
        />
      </div>

      {/* Animated shimmer/pulse effect */}
      <div
        className="absolute rounded-full"
        style={{
          top: '4px',
          left: '4px',
          right: '4px',
          bottom: '4px',
          background: isHovered
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
            : 'transparent',
          animation: isHovered ? 'shimmer 1.5s ease-in-out infinite' : 'none',
        }}
      />

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </a>
  );
}
