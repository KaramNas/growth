'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Loader from '@/components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative w-full">
      <HeroSection />
      <AboutSection />
      <Navbar />

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
    </main>
  );
}
