'use client';
import { TypeAnimation } from 'react-type-animation';

const words = ['understands', 'adapts', 'executes'];

export default function AnimatedText() {
  const sequence = words.flatMap((word, idx) => [
    word,
    3000,
    idx < words.length - 1 ? '' : undefined,
  ]).filter(Boolean);

  return (
    <TypeAnimation
      sequence={sequence as (string | number)[]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      speed={{ type: 'keyStrokeDelayInMs', value: 50 }}
      deletionSpeed={{ type: 'keyStrokeDelayInMs', value: 40 }}
      style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', fontWeight: '900', color: '#ff4500', display: 'inline-block' }}
    />
  );
}
