'use client';
import { useEffect } from 'react';

const SCROLL_THRESHOLD = 50; // pixels to scroll before moving to next section

export default function ScrollManager() {
  useEffect(() => {
    let lastScrollTop = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      clearTimeout(scrollTimeout);

      const currentScrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get all sections
      const sections = document.querySelectorAll('section');
      let currentSectionIndex = 0;

      // Find current section
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (currentScrollTop >= sectionTop - windowHeight / 2) {
          currentSectionIndex = index;
        }
      });

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Determine target section with low threshold
      let targetIndex = currentSectionIndex;

      if (isScrollingDown && Math.abs(e.deltaY) > 10) {
        targetIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
      } else if (isScrollingUp && Math.abs(e.deltaY) > 10) {
        targetIndex = Math.max(currentSectionIndex - 1, 0);
      }

      // Scroll to target section
      if (targetIndex !== currentSectionIndex) {
        const targetSection = sections[targetIndex];
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Prevent multiple rapid scrolls
        scrollTimeout = setTimeout(() => {}, 800);
      }
    };

    // Add wheel event listener (passive mode for better performance)
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}
