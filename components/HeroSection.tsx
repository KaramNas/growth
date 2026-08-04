'use client';
import { motion } from 'framer-motion';
import GridHighlight from './GridHighlight';
import FloatingServices from './FloatingServices';
import DotsButton from './DotsButton';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#080808]">

      {/* ── Grid background ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,69,0,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,69,0,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── Grid cell hover highlight ─────────────────────────────────── */}
      <GridHighlight />

      {/* ── Orange radial glow – sits behind text area ─────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '0%',
          left: '-5%',
          width: '55%',
          height: '70%',
          background:
            'radial-gradient(ellipse at 30% 45%, rgba(255,69,0,0.10) 0%, rgba(255,69,0,0.04) 40%, transparent 72%)',
        }}
      />

      {/* ── Hero text — upper-left, vertically centred above the video ── */}
      <div
        className="absolute left-0 top-0 right-0 flex items-center"
        style={{ bottom: '45%', paddingLeft: 'clamp(2rem, 8vw, 7rem)' }}
      >
        <div className="max-w-xl flex flex-col gap-6">
          {/* Label */}
          <motion.p
            {...fadeUp(0.6)}
            className="text-orange text-[10px] uppercase tracking-[0.35em] font-medium mb-7"
          >
            Digital Marketing Agency &nbsp;·&nbsp; Lebanon
          </motion.p>

          {/* Main heading */}
          <motion.h1
            {...fadeUp(0.8)}
            className="text-white font-black leading-[1.05] mb-7"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}
          >
            We create<br />
            <span className="text-orange">Growth</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            {...fadeUp(1.0)}
            className="text-white/45 text-[0.9rem] leading-relaxed mb-10 max-w-xs mt-5"
          >
            An ocean of channels, strategies, and possibilities —
            we surface exactly what grows your brand.
          </motion.p>

          {/* CTA */}
          <motion.div {...fadeUp(1.2)} className="flex items-center gap-6">
            <DotsButton href="#contact">Get Started</DotsButton>
            <a
              href="#work"
              className="text-white/35 text-[10px] uppercase tracking-[0.3em] hover:text-orange transition-colors duration-300"
            >
              View Work →
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Services rising from the wave ───────────────────────────── */}
      <FloatingServices />

      {/* ── Wave video — lower 45 % of the screen ────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '45%' }}>
        {/* Top fade — blends video into the dark grid bg */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '45%',
            background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)',
          }}
        />
        {/* Left edge fade */}
        <div
          className="absolute inset-y-0 left-0 z-10 pointer-events-none"
          style={{
            width: '12%',
            background: 'linear-gradient(to right, #080808 0%, transparent 100%)',
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute inset-y-0 right-0 z-10 pointer-events-none"
          style={{
            width: '12%',
            background: 'linear-gradient(to left, #080808 0%, transparent 100%)',
          }}
        />
        {/* Bottom fade — blends into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '40%',
            background: 'linear-gradient(to top, #080808 0%, transparent 100%)',
          }}
        />

        <video
          src="/growthwave2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
        />
      </div>
    </section>
  );
}
