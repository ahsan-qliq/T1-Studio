'use client';

import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

export interface SelectOption {
  value: string;
  label: string;
}

export interface AudienceTab {
  id: string;
  label: string;
}

export interface DreamSpaceSectionProps {
  heading: string;
  audienceTabs: AudienceTab[];
  propertyTypeLabel: string;
  propertyTypeOptions: SelectOption[];
  spaceRequiredLabel: string;
  spaceRequiredOptions: SelectOption[];
  typeOfServiceLabel: string;
  typeOfServiceOptions: SelectOption[];
  timelineLabel: string;
  timelineOptions: SelectOption[];
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  submitLabel: string;
  imageSrc: string;
  imageAlt: string;
}

// Shared dark input / select styles
const fieldBase =
  'w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:border-white/60 focus:outline-none';

function DarkSelect({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldBase, 'appearance-none pr-10 cursor-pointer')}
        aria-label={label}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#111] text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/50"
        aria-hidden="true"
      />
    </div>
  );
}

export function DreamSpaceSection({
  heading,
  audienceTabs,
  propertyTypeLabel,
  propertyTypeOptions,
  spaceRequiredLabel,
  spaceRequiredOptions,
  typeOfServiceLabel,
  typeOfServiceOptions,
  timelineLabel,
  timelineOptions,
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  phoneLabel,
  submitLabel,
  imageSrc,
  imageAlt,
}: DreamSpaceSectionProps) {
  const [activeAudience, setActiveAudience] = useState(audienceTabs[0]?.id ?? '');
  const [propertyType, setPropertyType] = useState('');
  const [spaceRequired, setSpaceRequired] = useState('');
  const [typeOfService, setTypeOfService] = useState('');
  const [timeline, setTimeline] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  const EASE = [0.22, 1, 0.36, 1] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission handled externally
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="dream-space-heading"
      className="flex min-h-[600px] flex-col lg:flex-row overflow-hidden"
    >
      {/* Left — image, slides in from left */}
      <motion.div
        className="relative h-64 lg:h-auto lg:w-2/5"
        initial={{ opacity: 0, x: -56 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
          priority={false}
        />
      </motion.div>

      {/* Right — dark form panel, slides in from right */}
      <motion.div
        className="flex flex-1 flex-col justify-center bg-[#0C0C0C] px-8 py-14 lg:px-14 xl:px-20"
        initial={{ opacity: 0, x: 56 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
      >
        <h2
          id="dream-space-heading"
          className="mb-8 text-3xl font-bold text-white lg:text-4xl"
        >
          {heading}
        </h2>

        <form
          onSubmit={handleSubmit}
          aria-label={heading}
          noValidate
        >
          {/* Audience tabs */}
          <div
            role="group"
            aria-label="Select audience type"
            className="mb-8 flex"
          >
            {audienceTabs.map((tab) => {
              const isActive = activeAudience === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveAudience(tab.id)}
                  className={cn(
                    'flex-1 border border-white/20 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset',
                    isActive
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white hover:bg-white/10',
                    // remove double borders between adjacent tabs
                    'first:rounded-s-none last:rounded-e-none [&:not(:first-child)]:-ms-px',
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dropdowns */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DarkSelect
              id="property-type"
              label={propertyTypeLabel}
              options={propertyTypeOptions}
              value={propertyType}
              onChange={setPropertyType}
            />
            <DarkSelect
              id="space-required"
              label={spaceRequiredLabel}
              options={spaceRequiredOptions}
              value={spaceRequired}
              onChange={setSpaceRequired}
            />
            <DarkSelect
              id="type-of-service"
              label={typeOfServiceLabel}
              options={typeOfServiceOptions}
              value={typeOfService}
              onChange={setTypeOfService}
            />
            <DarkSelect
              id="timeline"
              label={timelineLabel}
              options={timelineOptions}
              value={timeline}
              onChange={setTimeline}
            />
          </div>

          {/* Text inputs */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="sr-only">
                {firstNameLabel}
              </label>
              <input
                id="first-name"
                type="text"
                name="firstName"
                placeholder={firstNameLabel}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={fieldBase}
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">
                {lastNameLabel}
              </label>
              <input
                id="last-name"
                type="text"
                name="lastName"
                placeholder={lastNameLabel}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={fieldBase}
                autoComplete="family-name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {emailLabel}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder={emailLabel}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldBase}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                {phoneLabel}
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder={phoneLabel}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldBase}
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
          >
            {submitLabel}
            <ArrowRight
              className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
