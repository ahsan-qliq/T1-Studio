'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchHero } from '@/components/sections/SearchHero';
import { SearchSuggestions, addRecentSearch } from '@/components/sections/SearchSuggestions';

interface SearchShellProps {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  description: string;
  placeholder: string;
  searchLabel: string;
  popularHeading: string;
  popularTerms: string[];
  recentHeading: string;
  clearLabel: string;
}

export function SearchShell({
  imageSrc,
  imageAlt,
  heading,
  description,
  placeholder,
  searchLabel,
  popularHeading,
  popularTerms,
  recentHeading,
  clearLabel,
}: SearchShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  function handleSearch(query: string) {
    addRecentSearch(query);
    router.push(`?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <SearchHero
        heading={heading}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        placeholder={placeholder}
        searchLabel={searchLabel}
        onSearch={handleSearch}
        initialQuery={initialQuery}
      />
      <SearchSuggestions
        popularHeading={popularHeading}
        popularTerms={popularTerms}
        recentHeading={recentHeading}
        clearLabel={clearLabel}
        onSearch={handleSearch}
      />
    </>
  );
}
