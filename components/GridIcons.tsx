'use client';
import { useState } from 'react';
import {
  Cpu,
  Zap,
  Radio,
  Radar,
  Wifi,
  CircuitBoard,
  Smartphone,
  Shield,
  Brain,
  Rocket,
  Network,
  Lightbulb,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: LucideIcon[] = [
  Cpu,
  Zap,
  Radio,
  Radar,
  Wifi,
  CircuitBoard,
  Smartphone,
  Shield,
  Brain,
  Rocket,
  Network,
  Lightbulb,
];

// Stable icon map - generated once, not randomly
const generateStableIconMap = () => {
  return Array.from({ length: 320 }).map((_, i) => {
    return icons[i % icons.length];
  });
};

const iconMap = generateStableIconMap();

export default function GridIcons() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  return (
    <div
      className="absolute inset-0 z-40 pointer-events-none"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(20, 64px)',
        gridTemplateRows: 'repeat(16, 64px)',
      }}
    >
      {Array.from({ length: 320 }).map((_, i) => {
        const id = `${i}`;
        const Icon = iconMap[i];
        const isHovered = id === hoveredCell;

        return (
          <div
            key={id}
            className="flex items-center justify-center pointer-events-auto"
            onMouseEnter={() => setHoveredCell(id)}
            onMouseLeave={() => setHoveredCell(null)}
          >
            <div
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: `opacity ${isHovered ? '0.3s' : '0.8s'} ease-out, transform 0.3s ease-out`,
              }}
            >
              <Icon
                size={32}
                strokeWidth={1.5}
                style={{ color: 'rgba(255,69,0,1)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
