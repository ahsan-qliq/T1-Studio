'use client';

import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { z } from 'zod';

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

// ─── Zod schema ───────────────────────────────────────────────────────────────

const dreamSpaceSchema = z.object({
  propertyType:  z.string().min(1, 'Please select a property type'),
  spaceRequired: z.string().min(1, 'Please select the space required'),
  typeOfService: z.string().min(1, 'Please select a type of service'),
  timeline:      z.string().min(1, 'Please select a timeline'),
  firstName:     z.string().min(1, 'First name is required'),
  lastName:      z.string().min(1, 'Last name is required'),
  email:         z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone:         z.string().min(1, 'Phone number is required').regex(/^\+?[\d\s\-()]{7,}$/, 'Enter a valid phone number'),
});

type DreamSpaceFields = z.infer<typeof dreamSpaceSchema>;
type FieldErrors = Partial<Record<keyof DreamSpaceFields, string>>;

// ─── Shared styles ────────────────────────────────────────────────────────────

const fieldBase =
  'w-full border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:outline-none';

function fieldClass(error?: string) {
  return cn(
    fieldBase,
    error
      ? 'border-red-400/70 focus:border-red-400'
      : 'border-white/20 focus:border-white/60',
  );
}

// ─── DarkSelect ───────────────────────────────────────────────────────────────

function DarkSelect({
  id,
  label,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(fieldClass(error), 'appearance-none pr-10 cursor-pointer')}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#111] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/50"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── TextInput ────────────────────────────────────────────────────────────────

function TextInput({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass(error)}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

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
  const [fields, setFields] = useState<DreamSpaceFields>({
    propertyType:  '',
    spaceRequired: '',
    typeOfService: '',
    timeline:      '',
    firstName:     '',
    lastName:      '',
    email:         '',
    phone:         '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-80px' });

  const EASE = [0.22, 1, 0.36, 1] as const;

  const set = (key: keyof DreamSpaceFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    // Clear field error on change
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = dreamSpaceSchema.safeParse(fields);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof DreamSpaceFields;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    // TODO: send result.data to your API
  };

  if (submitted) {
    return (
      <section
        id="enquiry"
        ref={sectionRef}
        aria-labelledby="dream-space-heading"
        className="flex min-h-[600px] flex-col items-center justify-center bg-[#0C0C0C] px-4 py-16 text-center sm:px-8 sm:py-20"
      >
        <h2 id="dream-space-heading" className="mb-4 text-3xl font-bold text-white lg:text-4xl">
          {heading}
        </h2>
        <p className="text-white/60">Thank you! We'll be in touch soon.</p>
      </section>
    );
  }

  return (
    <section
      id="enquiry"
      ref={sectionRef}
      aria-labelledby="dream-space-heading"
      className="flex min-h-[600px] flex-col lg:flex-row overflow-hidden"
    >
      {/* Left — image */}
      <motion.div
        className="relative h-56 sm:h-72 lg:h-auto lg:w-2/5"
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

      {/* Right — form panel */}
      <motion.div
        className="flex flex-1 flex-col justify-center bg-[#0C0C0C] px-4 py-10 sm:px-8 sm:py-14 lg:px-14 xl:px-20"
        initial={{ opacity: 0, x: 56 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
      >
        <h2
          id="dream-space-heading"
          className="mb-8 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        >
          {heading}
        </h2>

        <form onSubmit={handleSubmit} aria-label={heading} noValidate>
          {/* Audience tabs */}
          <div role="group" aria-label="Select audience type" className="mb-8 flex">
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
              value={fields.propertyType}
              onChange={set('propertyType')}
              error={errors.propertyType}
            />
            <DarkSelect
              id="space-required"
              label={spaceRequiredLabel}
              options={spaceRequiredOptions}
              value={fields.spaceRequired}
              onChange={set('spaceRequired')}
              error={errors.spaceRequired}
            />
            <DarkSelect
              id="type-of-service"
              label={typeOfServiceLabel}
              options={typeOfServiceOptions}
              value={fields.typeOfService}
              onChange={set('typeOfService')}
              error={errors.typeOfService}
            />
            <DarkSelect
              id="timeline"
              label={timelineLabel}
              options={timelineOptions}
              value={fields.timeline}
              onChange={set('timeline')}
              error={errors.timeline}
            />
          </div>

          {/* Text inputs */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              id="first-name"
              name="firstName"
              label={firstNameLabel}
              value={fields.firstName}
              onChange={set('firstName')}
              autoComplete="given-name"
              error={errors.firstName}
            />
            <TextInput
              id="last-name"
              name="lastName"
              label={lastNameLabel}
              value={fields.lastName}
              onChange={set('lastName')}
              autoComplete="family-name"
              error={errors.lastName}
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              label={emailLabel}
              value={fields.email}
              onChange={set('email')}
              autoComplete="email"
              error={errors.email}
            />
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              label={phoneLabel}
              value={fields.phone}
              onChange={set('phone')}
              autoComplete="tel"
              error={errors.phone}
            />
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
