'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface LpSelectOption {
  value: string;
  label: string;
}

export interface LpHeroBannerProps {
  description: string;
  heading: string;
  image: { src: string; alt: string };
  formHeading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  countryCode: string;
  phonePlaceholder: string;
  propertyTypeLabel: string;
  propertyTypeOptions: LpSelectOption[];
  spacesRequiredLabel: string;
  spacesRequiredOptions: LpSelectOption[];
  budgetBandLabel: string;
  budgetBandOptions: LpSelectOption[];
  submitLabel: string;
}

// ─── Inline select ────────────────────────────────────────────────────────────

function LpSelect({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: LpSelectOption[];
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
      >
        <option value="" disabled className="bg-[#1a1a1a]">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
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

// ─── Contact form card ────────────────────────────────────────────────────────

function ContactCard({
  formHeading,
  namePlaceholder,
  emailPlaceholder,
  countryCode,
  phonePlaceholder,
  propertyTypeLabel,
  propertyTypeOptions,
  spacesRequiredLabel,
  spacesRequiredOptions,
  budgetBandLabel,
  budgetBandOptions,
  submitLabel,
}: Omit<LpHeroBannerProps, 'description' | 'heading' | 'image'>) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      className="w-full rounded-2xl bg-black/70 p-6 backdrop-blur-md sm:p-7 lg:w-[380px] xl:w-[420px]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, ease: EASE, delay: 0.2 }}
    >
      <h2 className="mb-5 text-center text-xl font-bold text-white">
        {formHeading}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
        aria-label={formHeading}
        noValidate
      >
        {/* Name */}
        <div>
          <label htmlFor="lp-name" className="sr-only">
            {namePlaceholder}
          </label>
          <input
            id="lp-name"
            type="text"
            required
            placeholder={namePlaceholder}
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          />
        </div>

        {/* Email + Phone row */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="lp-email" className="sr-only">
              {emailPlaceholder}
            </label>
            <input
              id="lp-email"
              type="email"
              required
              placeholder={emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            />
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <div className="flex h-full items-center rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white">
              <span>{countryCode}</span>
              <ChevronDown className="ms-1 size-3 text-white/50" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <label htmlFor="lp-phone" className="sr-only">
                {phonePlaceholder}
              </label>
              <input
                id="lp-phone"
                type="tel"
                placeholder={phonePlaceholder}
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                className="w-24 rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              />
            </div>
          </div>
        </div>

        {/* Dropdowns */}
        <LpSelect
          id="lp-property-type"
          label={propertyTypeLabel}
          options={propertyTypeOptions}
        />
        <LpSelect
          id="lp-spaces-required"
          label={spacesRequiredLabel}
          options={spacesRequiredOptions}
        />
        <LpSelect
          id="lp-budget-band"
          label={budgetBandLabel}
          options={budgetBandOptions}
        />

        {/* Submit */}
        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {submitLabel}
        </button>
      </form>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function LpHeroBanner({
  description,
  heading,
  image,
  ...formProps
}: LpHeroBannerProps) {
  return (
    <section
      aria-labelledby="lp-hero-heading"
      className="relative flex min-h-screen w-full flex-col overflow-hidden lg:flex-row"
    >
      {/* Background image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 flex w-full flex-col items-start justify-end gap-8 px-6 pb-16 pt-32 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
        {/* Left — text */}
        <div className="max-w-xl lg:pb-4">
          <motion.p
            className="mb-4 text-sm leading-relaxed text-white/70 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {description}
          </motion.p>

          <motion.h1
            id="lp-hero-heading"
            className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            {heading}
          </motion.h1>
        </div>

        {/* Right — contact form card */}
        <div className="w-full shrink-0 lg:w-auto">
          <ContactCard {...formProps} />
        </div>
      </div>
    </section>
  );
}
