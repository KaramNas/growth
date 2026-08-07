'use client';
import { motion } from 'framer-motion';
import { Brain, Zap, Eye, Cpu, Network, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'Large Language Models',
    description: 'Custom LLMs fine-tuned on your domain data for precision, accuracy, and reduced hallucinations.',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Real-time image recognition, object detection, and visual understanding at enterprise scale.',
  },
  {
    icon: Zap,
    title: 'Generative AI',
    description: 'Text generation, image synthesis, and multimodal models for creative and practical applications.',
  },
  {
    icon: Cpu,
    title: 'Model Optimization',
    description: 'Quantization, pruning, and deployment optimization for edge and cloud environments.',
  },
  {
    icon: Network,
    title: 'AI Integration',
    description: 'Seamless integration of AI models into your existing systems, APIs, and workflows.',
  },
  {
    icon: Lightbulb,
    title: 'AI Strategy',
    description: 'Consulting and roadmapping to identify high-impact AI opportunities for your business.',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-[#080808] overflow-hidden">

      {/* Grid background */}
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

      {/* Left-side glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '-15%',
          width: '50%',
          height: '70%',
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(255,69,0,0.06) 0%, rgba(255,69,0,0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col gap-24" style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '8rem', paddingBottom: '8rem' }}>

        {/* Header */}
        <div className="flex flex-col gap-16">
          <motion.p
            {...fadeUp(0.1)}
            className="text-orange text-[10px] uppercase tracking-[0.35em] font-medium"
          >
            What We Build
          </motion.p>

          <motion.h2
            {...fadeUp(0.2)}
            className="text-white font-black leading-[1.08]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)' }}
          >
            Complete AI solutions <br />
            from research to <span className="text-orange">production.</span>
          </motion.h2>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-white/[0.06]"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-y-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                {...fadeUp(0.1 + i * 0.08)}
                className="flex flex-col gap-6 group cursor-pointer"
              >
                {/* Icon */}
                <div className="flex items-center justify-start">
                  <div
                    className="p-3 rounded-lg transition-all duration-300 group-hover:bg-orange/10"
                    style={{
                      backgroundColor: 'rgba(255,69,0,0.05)',
                    }}
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      style={{ color: 'rgba(255,69,0,0.85)' }}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg leading-[1.2]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/45 text-[0.95rem] leading-[1.7]">
                  {service.description}
                </p>

                {/* Hover underline */}
                <div
                  className="h-px bg-orange/20 transition-all duration-300 group-hover:bg-orange w-0 group-hover:w-12"
                  style={{ marginTop: '0.5rem' }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom divider */}
        <div className="w-full h-px bg-white/[0.06]" />

      </div>
    </section>
  );
}
