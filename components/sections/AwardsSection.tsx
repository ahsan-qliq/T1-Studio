import Image from 'next/image';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface AwardLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface AwardsSectionProps {
  label: string;
  logos: AwardLogo[];
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function AwardsSection({ label, logos }: AwardsSectionProps) {
  return (
    <section
      aria-label={label}
      className="page-wrap py-12"
    >
      <div className="mx-auto flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-12">

        {/* Label */}
        <p className="shrink-0 text-3xl font-bold text-secondary">
          {label}
        </p>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />

        {/* Logos */}
        <ul
          role="list"
          aria-label="Partner and award logos"
          className="flex flex-wrap items-center justify-center gap-8 sm:justify-start sm:gap-10 lg:gap-14"
        >
          {logos.map((logo) => (
            <li key={logo.alt} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width ?? 120}
                height={logo.height ?? 40}
                className="max-h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
