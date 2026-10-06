'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 't1-recent-searches';
const MAX_RECENT = 8;

interface SearchSuggestionsProps {
  popularHeading: string;
  popularTerms: string[];
  recentHeading: string;
  clearLabel: string;
  onSearch: (query: string) => void;
}

export function SearchSuggestions({
  popularHeading,
  popularTerms,
  recentHeading,
  clearLabel,
  onSearch,
}: SearchSuggestionsProps) {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (Array.isArray(stored)) setRecent(stored);
    } catch {
      setRecent([]);
    }
  }, []);

  function clearRecent() {
    localStorage.removeItem(STORAGE_KEY);
    setRecent([]);
  }

  return (
    <section aria-label="Search suggestions" className="page-wrap py-12 lg:py-16">
      {/* Popular searches */}
      <div className="mb-10">
        <h2 className="mb-5 text-2xl font-semibold text-secondary sm:text-3xl">
          {popularHeading}
        </h2>
        <ul role="list" className="flex flex-wrap gap-3">
          {popularTerms.map((term) => (
            <li key={term}>
              <button
                type="button"
                onClick={() => onSearch(term)}
                className="rounded-full border border-secondary/15 bg-secondary/5 px-5 py-2 text-sm text-secondary/75 transition-colors duration-200 hover:border-secondary/30 hover:bg-secondary/10 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              >
                {term}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-secondary/10" role="separator" />

      {/* Recent searches */}
      {recent.length > 0 && (
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-secondary sm:text-3xl">
              {recentHeading}
            </h2>
            <button
              type="button"
              onClick={clearRecent}
              className="text-sm text-secondary/45 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-sm"
            >
              {clearLabel}
            </button>
          </div>

          <ul role="list" className="divide-y divide-secondary/10">
            {recent.map((term) => (
              <li key={term}>
                <button
                  type="button"
                  onClick={() => onSearch(term)}
                  className="group flex w-full items-center gap-4 py-4 text-left transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-sm"
                >
                  <Search
                    className="size-5 shrink-0 text-secondary/35 group-hover:text-secondary/60"
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-base text-secondary/65 group-hover:text-secondary">
                    {term}
                  </span>
                  <ChevronRight
                    className="size-5 shrink-0 text-secondary/30 group-hover:text-secondary/60"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export function addRecentSearch(term: string) {
  try {
    const stored: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const updated = [term, ...stored.filter((s) => s !== term)].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore storage errors
  }
}
