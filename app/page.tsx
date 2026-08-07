'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import StageIndicator from '@/components/StageIndicator';
import ScrollManager from '@/components/ScrollManager';
import Loader from '@/components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative w-full">
      <ScrollManager />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Navbar />
      <StageIndicator />

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
    </main>
  );
}
