'use client';
import { useEffect, useRef } from 'react';

const CELL = 64;
const RADIUS = 2;
const PEAK = 0.15;
const LERP_IN = 0.07;  // fade-in speed  (lower = slower)
const LERP_OUT = 0.04; // fade-out speed (lower = slower)

export default function GridHighlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  // Map of "col,row" → current alpha value
  const cells = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    const onMouseMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let raf: number;

    const frame = () => {
      ctx.clearRect(0, 0, W, H);

      const { x: mx, y: my } = mouse.current;
      const cx = mx > 0 ? Math.floor(mx / CELL) : -9999;
      const cy = my > 0 ? Math.floor(my / CELL) : -9999;

      // Build target intensities for cells near cursor
      const targets = new Map<string, number>();
      if (cx >= 0) {
        for (let dy = -RADIUS; dy <= RADIUS; dy++) {
          for (let dx = -RADIUS; dx <= RADIUS; dx++) {
            const col = cx + dx;
            const row = cy + dy;
            if (col < 0 || row < 0) continue;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > RADIUS) continue;
            const t = 1 - dist / RADIUS;
            targets.set(`${col},${row}`, t * t * PEAK);
          }
        }
      }

      // Seed any new cells at 0 so they lerp up from nothing
      for (const key of targets.keys()) {
        if (!cells.current.has(key)) cells.current.set(key, 0);
      }

      // Lerp every tracked cell toward its target, draw, prune faded-out ones
      const dead: string[] = [];
      for (const [key, cur] of cells.current) {
        const target = targets.get(key) ?? 0;
        const speed = cur < target ? LERP_IN : LERP_OUT;
        const next = cur + (target - cur) * speed;

        if (next < 0.0003 && target === 0) {
          dead.push(key);
          continue;
        }

        cells.current.set(key, next);

        const [col, row] = key.split(',').map(Number);
        ctx.fillStyle = `rgba(255,90,10,${next.toFixed(4)})`;
        ctx.fillRect(col * CELL, row * CELL, CELL, CELL);
      }
      for (const key of dead) cells.current.delete(key);

      raf = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
