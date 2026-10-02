'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  href: string;
}

interface NavMobileMenuProps {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  openLabel: string;
  closeLabel: string;
}

export function NavMobileMenu({
  links,
  ctaLabel,
  ctaHref,
  openLabel,
  closeLabel,
}: NavMobileMenuProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Hamburger — hidden on desktop */}
      <button
        type="button"
        aria-label={openLabel}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-md text-white transition-all duration-200 motion-safe:hover:scale-105 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-y-0 end-0 z-50 flex w-72 flex-col bg-zinc-950 px-6 py-8 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Drawer header */}
        <div className="mb-8 flex items-center justify-between">
          <span className="select-none text-xl font-semibold tracking-tight text-white">
            T<span className="text-gold">.</span>one
            <span className="mx-2 font-light text-white/40" aria-hidden="true">|</span>
            <span className="font-light tracking-widest">keller</span>
          </span>
          <button
            type="button"
            aria-label={closeLabel}
            onClick={close}
            className="flex size-10 items-center justify-center rounded-md text-white/70 transition-all duration-200 hover:text-white motion-safe:hover:scale-105 motion-safe:hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        {/* Nav links + CTA */}
        <nav className="flex flex-1 flex-col justify-between">
          <ul role="list" className="flex flex-col gap-1">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  className="block rounded-md px-3 py-3 text-base text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white motion-safe:hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={ctaHref}
            onClick={close}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group mt-8 w-full rounded-full gap-2',
            )}
          >
            {ctaLabel}
            <ArrowRight
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </nav>
      </div>
    </>
  );
}
