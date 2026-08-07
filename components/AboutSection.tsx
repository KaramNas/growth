'use client';
import { motion } from 'framer-motion';

const stats = [
  { value: '25+', label: 'AI Models Deployed' },
  { value: '10+',  label: 'Fortune 500 Clients'  },
  { value: '7',   label: 'Years in AI'  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-[#080808] overflow-hidden">

     

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,69,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,69,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Subtle right-side glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '-10%',
          width: '50%',
          height: '80%',
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(255,69,0,0.06) 0%, rgba(255,69,0,0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col gap-24" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '8rem', paddingBottom: '8rem' }}>

        {/* ── Top row: eyebrow + headline split ────────────────────────── */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Left */}
          <div className="flex flex-col gap-8 flex-1">
            <motion.p
              {...fadeUp(0.1)}
              className="text-orange text-[10px] uppercase tracking-[0.35em] font-medium"
            >
              Who We Are
            </motion.p>

            <motion.h2
              {...fadeUp(0.2)}
              className="text-white font-black leading-[1.08]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)' }}
            >
              Enterprise AI built<br />
              for the <span className="text-orange">future.</span>
            </motion.h2>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-end gap-8 flex-1 max-w-lg">
            <motion.p
              {...fadeUp(0.3)}
              className="text-white/45 text-[0.95rem] leading-[1.8]"
            >
              We're an AI-first company building large language models, computer vision systems,
              and intelligent automation for enterprise clients. Our models understand language,
              see images, and automate complex workflows at scale.
            </motion.p>

            <motion.p
              {...fadeUp(0.4)}
              className="text-white/45 text-[0.95rem] leading-[1.8]"
            >
              From natural language processing to real-time vision analytics, every system we build
              is optimized for accuracy, latency, and integration with your existing infrastructure.
            </motion.p>

            <motion.a
              {...fadeUp(0.5)}
              href="#contact"
              className="self-start text-orange text-[10px] uppercase tracking-[0.3em] border-b border-orange/40 pb-1 hover:border-orange transition-colors duration-300"
            >
              Work with us →
            </motion.a>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-white/[0.06]"
        />

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(0.1 + i * 0.12)}
              className="flex flex-col gap-3 pr-12"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingLeft: i > 0 ? '3rem' : 0 }}
            >
              <span
                className="text-orange font-black leading-none"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
              >
                {s.value}
              </span>
              <span className="text-white/35 text-[10px] uppercase tracking-[0.3em]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom divider ────────────────────────────────────────────── */}
        <div className="w-full h-px bg-white/[0.06]" />

      </div>
    </section>
  );
}
