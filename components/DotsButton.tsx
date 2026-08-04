'use client';
import { useRef } from 'react';

const COLS      = 17;
const ROWS      = 5;
const SPACING   = 12;
const RADIUS    = 1.5;
const W         = (COLS - 1) * SPACING; // 192 px
const H         = (ROWS - 1) * SPACING; // 48 px
const CX        = W / 2;
const CY        = H / 2;
const CORNER_R  = H / 2; // full pill / capsule shape

// Keep only dots that fall inside a pill (rounded-rectangle) boundary
function insidePill(cx: number, cy: number) {
  const dx = Math.max(0, Math.abs(cx - CX) - (CX - CORNER_R));
  const dy = Math.max(0, Math.abs(cy - CY) - (CY - CORNER_R));
  return dx * dx + dy * dy <= CORNER_R * CORNER_R;
}

const DOTS = Array.from({ length: ROWS }, (_, row) =>
  Array.from({ length: COLS }, (_, col) => ({
    key: `${row}-${col}`,
    cx: col * SPACING,
    cy: row * SPACING,
  }))
).flat().filter(({ cx, cy }) => insidePill(cx, cy));

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DotsButton({ href, children, className = '' }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const onEnter = () => {
    svgRef.current?.querySelectorAll('circle').forEach(c => {
      const dx = (parseFloat(c.getAttribute('cx')!) - CX) * 0.28;
      const dy = (parseFloat(c.getAttribute('cy')!) - CY) * 0.28;
      c.style.transform = `translate(${dx}px, ${dy}px)`;
      c.style.opacity   = '0.35';
    });
  };

  const onLeave = () => {
    svgRef.current?.querySelectorAll('circle').forEach(c => {
      c.style.transform = 'translate(0px, 0px)';
      c.style.opacity   = '1';
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center justify-center text-orange text-[10px] uppercase tracking-[0.3em] px-8 py-4 hover:text-white transition-colors duration-300 ${className}`}
    >
      {/* Dot grid — centred behind the label, overflows visually */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'visible',
          zIndex: 0,
        }}
      >
        {DOTS.map(({ key, cx, cy }) => (
          <circle
            key={key}
            cx={cx}
            cy={cy}
            r={RADIUS}
            fill="rgba(255,69,0,0.55)"
            style={{
              transition: 'transform 0.55s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.55s ease',
            }}
          />
        ))}
      </svg>

      <span className="relative" style={{ zIndex: 1 }}>
        {children}
      </span>
    </a>
  );
}
