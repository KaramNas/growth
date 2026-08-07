'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Megaphone,
  Share2,
  Search,
  PenLine,
  Mail,
  Palette,
  TrendingUp,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const services: { label: string; xPct: number; Icon: LucideIcon }[] = [
  { label: 'Paid Advertising',  xPct: 8,  Icon: Megaphone  },
  { label: 'Social Media',      xPct: 48, Icon: Share2      },
  { label: 'SEO & Search',      xPct: 24, Icon: Search      },
  { label: 'Content Strategy',  xPct: 64, Icon: PenLine     },
  { label: 'Email Marketing',   xPct: 36, Icon: Mail        },
  { label: 'Brand Identity',    xPct: 56, Icon: Palette     },
  { label: 'Analytics',         xPct: 14, Icon: TrendingUp  },
  { label: 'Growth Hacking',    xPct: 72, Icon: Zap         },
];

const STAGGER      = 2.5;
const RISE_DUR     = 6.5;
const REPEAT_DELAY = services.length * STAGGER - RISE_DUR;

const GLOW_BASE  = 'drop-shadow(0 0 3px rgba(255,69,0,0.55))';
const GLOW_BURST = 'drop-shadow(0 0 9px rgba(255,100,0,1))';

export default function FloatingServices() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];

    els.forEach((el, i) => {
      const iconEl = el.querySelector('.svc-icon') as HTMLElement | null;

      // Set initial states
      gsap.set(el, { y: 22, opacity: 0 });
      if (iconEl) gsap.set(iconEl, { scale: 1, filter: GLOW_BASE });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: REPEAT_DELAY,
        delay: i * STAGGER,
      });

      tl
        // 1. Rise up from the wave
        .to(el, { y: -10, opacity: 1, duration: 0.8, ease: 'power2.out' })

        // 2. Float upward
        .to(el, { y: -170, opacity: 0.85, duration: RISE_DUR - 1.6, ease: 'power1.out' })

        // 3. Icon bursts — expand + glow spike (overlaps with end of float)
        .to(iconEl, {
          scale: 2.2,
          filter: GLOW_BURST,
          duration: 0.7,
          ease: 'back.out(2)',
        }, '>')

        // 4. Icon snaps back
        .to(iconEl, {
          scale: 1,
          filter: GLOW_BASE,
          duration: 0.5,
          ease: 'power2.in',
        }, '+=0.12')

        // 5. Whole item fades out upward (starts as icon is contracting)
        .to(el, { y: -210, opacity: 0, duration: 0.8, ease: 'power2.in' }, '<');
    });

    return () => gsap.killTweensOf(els);
  }, []);

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: '54%', right: 0, top: 96, bottom: 0, overflow: 'hidden' }}
    >
      {services.map((svc, i) => (
        <div
          key={svc.label}
          ref={el => { refs.current[i] = el; }}
          className="absolute flex items-center gap-2"
          style={{ left: `${svc.xPct}%`, bottom: '45%' }}
        >
          {/* Icon wrapper — GSAP targets this */}
          <span className="svc-icon flex-shrink-0 inline-flex">
            <svc.Icon
              size={10}
              strokeWidth={2}
              style={{ color: 'rgba(255,69,0,0.85)' }}
            />
          </span>

          {/* Label */}
          <span className="text-[9px] uppercase tracking-[0.3em] text-white font-medium whitespace-nowrap">
            {svc.label}
          </span>
        </div>
      ))}
    </div>
  );
}
