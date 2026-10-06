'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface SearchHeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  placeholder: string;
  searchLabel: string;
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchHero({
  heading,
  description,
  imageSrc,
  imageAlt,
  placeholder,
  searchLabel,
  onSearch,
  initialQuery = '',
}: SearchHeroProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <section
      aria-labelledby="search-heading"
      className="relative flex min-h-[60vh] flex-col justify-end bg-zinc-950 pb-10 pt-32"
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"
        aria-hidden="true"
      />

      {/* Copy */}
      <div className="page-wrap relative z-10">
        <h1
          id="search-heading"
          className="mb-3 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
          style={{ animation: 'hero-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) both 0.15s' }}
        >
          {heading}
        </h1>
        <p
          className="mb-8 text-base text-white/75 sm:text-lg"
          style={{ animation: 'hero-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) both 0.3s' }}
        >
          {description}
        </p>

        {/* Search form */}
        <form
          role="search"
          onSubmit={handleSubmit}
          style={{ animation: 'hero-fade-up 0.75s cubic-bezier(0.22,1,0.36,1) both 0.45s' }}
        >
          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-xl">
            <label htmlFor="search-input" className="sr-only">
              {placeholder}
            </label>
            <input
              ref={inputRef}
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-secondary placeholder:text-secondary/40 focus:outline-none sm:text-base"
            />
            <button
              type="submit"
              aria-label={searchLabel}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors duration-200 hover:bg-secondary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              <Search className="size-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
