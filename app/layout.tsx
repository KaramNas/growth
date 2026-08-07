import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexus AI | LLM & Computer Vision Solutions',
  description: 'Enterprise AI solutions: LLMs, computer vision, and machine learning models for the modern world.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
