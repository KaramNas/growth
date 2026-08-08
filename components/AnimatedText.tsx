'use client';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap' as const
  },
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden' as const,
    clipPath: 'rect(0,0,0,0)',
    border: 0
  }
};

const words = ['understands', 'adapts', 'executes'];

export default function AnimatedText() {
  const [textIndex, setTextIndex] = useState(0);
  const text = words[textIndex];

  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(true);
  const [direction, setDirection] = useState('forward');

  const containerRef = useRef<HTMLSpanElement>(null);
  const orderRef = useRef<number[]>([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const speed = 50;
  const maxIterations = 10;
  const sequential = true;
  const revealDirection = 'start';
  const useOriginalCharsOnly = false;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
      : characters.split('');
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText, currentRevealed) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    },
    [availableChars]
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setDirection('forward');
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;

    const getNextIndex = revealedSet => {
      const textLength = text.length;
      return revealedSet.size;
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices(prevRevealed => {
        if (direction === 'forward') {
          if (prevRevealed.size < text.length) {
            const nextIndex = getNextIndex(prevRevealed);
            const newRevealed = new Set(prevRevealed);
            newRevealed.add(nextIndex);
            setDisplayText(shuffleText(text, newRevealed));
            return newRevealed;
          } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setIsDecrypted(true);
            setDisplayText(text);
            return prevRevealed;
          }
        }
        return prevRevealed;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAnimating, text, speed, shuffleText, direction]);

  useEffect(() => {
    setDisplayText(text);
    setIsDecrypted(true);
    setRevealedIndices(new Set());
    setDirection('forward');
  }, [text]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex(prev => (prev + 1) % words.length);
      triggerDecrypt();
    }, 3000);

    return () => clearInterval(timer);
  }, [triggerDecrypt]);

  return (
    <motion.span
      style={{
        ...styles.wrapper,
        fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)',
        fontWeight: '900',
        color: '#ff4500',
        display: 'inline-block',
        lineHeight: '1.05'
      }}
      ref={containerRef}
    >
      <span style={styles.srOnly}>{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || (!isAnimating && isDecrypted);

          return (
            <span
              key={index}
              style={{
                opacity: 1,
                textShadow: isRevealedOrDone
                  ? '0 0 8px rgba(255, 69, 0, 0.6)'
                  : '0 0 12px rgba(255, 69, 0, 1), 0 0 24px rgba(255, 100, 0, 0.8)',
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
