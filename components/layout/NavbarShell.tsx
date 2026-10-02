'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function NavbarShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter,-webkit-backdrop-filter] duration-300',
        scrolled
          ? 'bg-black/80 shadow-[0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      {children}
    </header>
  );
}
