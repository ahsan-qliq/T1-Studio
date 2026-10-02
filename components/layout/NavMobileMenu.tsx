'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
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
  closeLabel,
}: NavMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
          <SheetClose
            aria-label={closeLabel}
            className="flex size-10 items-center justify-center rounded-md text-white/70 transition-all duration-200 hover:text-white motion-safe:hover:scale-105 motion-safe:hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X className="size-6" aria-hidden="true" />
          </SheetClose>
        </div>

        {/* Nav links */}
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
      </SheetContent>
    </Sheet>
  );
}
