import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Growth | Digital Marketing Agency',
  description: 'We create growth.',
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
