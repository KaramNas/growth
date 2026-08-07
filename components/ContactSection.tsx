'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formState);
    setFormState({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative w-full bg-[#080808] overflow-hidden">

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
          bottom: '10%',
          right: '-15%',
          width: '50%',
          height: '70%',
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(255,69,0,0.08) 0%, rgba(255,69,0,0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="flex flex-col gap-24 w-full max-w-5xl" style={{ paddingLeft: '10%', paddingRight: '10%' }}>

        {/* Header */}
        <div className="flex flex-col gap-16 max-w-2xl">
          <motion.p
            {...fadeUp(0.1)}
            className="text-orange text-[10px] uppercase tracking-[0.35em] font-medium"
          >
            Get In Touch
          </motion.p>

          <motion.h2
            {...fadeUp(0.2)}
            className="text-white font-black leading-[1.08]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)' }}
          >
            Let's build AI<br />
            that <span className="text-orange">matters.</span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.3)}
            className="text-white/45 text-[0.95rem] leading-[1.8] max-w-lg"
          >
            Have an AI challenge? We'd love to hear about it. Let's discuss how LLMs, computer vision, or custom models can transform your business.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-white/[0.06]"
        />

        {/* Contact content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact info */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              {/* Email */}
              <motion.div
                {...fadeUp(0.2)}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="mt-1">
                  <Mail
                    size={24}
                    className="text-orange group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Email</p>
                  <a
                    href="mailto:hello@growth.com"
                    className="text-white text-[0.95rem] hover:text-orange transition-colors duration-300"
                  >
                    hello@growth.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                {...fadeUp(0.3)}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="mt-1">
                  <Phone
                    size={24}
                    className="text-orange group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Phone</p>
                  <a
                    href="tel:+961-1-234567"
                    className="text-white text-[0.95rem] hover:text-orange transition-colors duration-300"
                  >
                    +961 (1) 234 567
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                {...fadeUp(0.4)}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="mt-1">
                  <MapPin
                    size={24}
                    className="text-orange group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Location</p>
                  <p className="text-white text-[0.95rem]">Beirut, Lebanon</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact form */}
          <motion.form
            {...fadeUp(0.3)}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            {/* Name input */}
            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* Email input */}
            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Email</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* Message input */}
            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-[10px] uppercase tracking-[0.2em]">Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows={5}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange/50 focus:bg-white/10 transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="flex items-center justify-center gap-2 bg-orange text-black font-bold px-8 py-3 rounded-lg hover:bg-orange/90 transition-all duration-300 mt-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Send Message</span>
              <Send size={16} />
            </motion.button>
          </motion.form>
        </div>

        {/* Bottom divider */}
        <div className="w-full h-px bg-white/[0.06]" />

        </div>
      </div>
    </section>
  );
}
