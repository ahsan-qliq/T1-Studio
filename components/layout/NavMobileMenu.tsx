'use client';

import { Menu, ArrowRight } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';

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
}: NavMobileMenuProps) {
  return (
    <Sheet>
      {/* Hamburger trigger — hidden on desktop */}
      <SheetTrigger
        aria-label={openLabel}
        className="flex size-10 items-center justify-center rounded-md text-white transition-all duration-200 motion-safe:hover:scale-105 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-72 bg-zinc-950 px-6 py-8 flex flex-col border-white/10"
      >
        {/* Drawer header */}
        <div className="mb-8 flex items-center justify-between">
          <span className="select-none text-xl font-semibold tracking-tight text-white">
            T<span className="text-gold">.</span>one
            <span className="mx-2 font-light text-white/40" aria-hidden="true">|</span>
            <span className="font-light tracking-widest">keller</span>
          </span>
          <SheetClose className="flex size-10 items-center justify-center rounded-md text-white/70 transition-all duration-200 hover:text-white motion-safe:hover:scale-105 motion-safe:hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
            <span className="sr-only">Close</span>
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </SheetClose>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col justify-between">
          <ul role="list" className="flex flex-col gap-1">
            {links.map(({ label, href }) => (
              <li key={href}>
                <SheetClose
                  render={
                    <Link
                      href={href}
                      className="block rounded-md px-3 py-3 text-base text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white motion-safe:hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                      {label}
                    </Link>
                  }
                />
              </li>
            ))}
          </ul>

          <SheetClose
            render={
              <Link
                href={ctaHref}
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
            }
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
