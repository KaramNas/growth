'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fallback: force-complete if video stalls or takes too long
    const fallback = setTimeout(onComplete, 15_000);
    return () => clearTimeout(fallback);
  }, [onComplete]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress(video.currentTime / video.duration);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Intro video — full-screen, no controls */}
      <video
        ref={videoRef}
        src="/growthvideo.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-cover"
      />


      {/* Progress bar — bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <motion.div
          className="h-full bg-orange origin-left"
          style={{ scaleX: progress }}
        />
      </div>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 right-8 text-white/35 text-[10px] uppercase tracking-[0.3em] hover:text-white/70 transition-colors duration-300"
      >
        Skip →
      </button>
    </motion.div>
  );
}
