'use client';

import Image from 'next/image';
import Link from 'next/link';
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
  // Developer tab overrides
  developerDropdown1Label?: string;
  developerDropdown1Options?: SelectOption[];
  developerDropdown2Label?: string;
  developerDropdown2Options?: SelectOption[];
  developerDropdown3Label?: string;
  developerDropdown3Options?: SelectOption[];
  // New fields
  companyNameLabel?: string;
  messageLabel?: string;
  consentText?: string;
  privacyPolicyLabel?: string;
  privacyPolicyHref?: string;
  consentRequired?: string;
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
  companyName:   z.string().optional(),
  message:       z.string().optional(),
});

type DreamSpaceFields = z.infer<typeof dreamSpaceSchema>;
type FieldErrors = Partial<Record<keyof DreamSpaceFields | 'consent', string>>;

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
          required
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
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  error?: string;
  required?: boolean;
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
        required={required}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── TextArea ─────────────────────────────────────────────────────────────────

function TextArea({
  id,
  label,
  name,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={cn(fieldClass(error), 'resize-none')}
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
  developerDropdown1Label,
  developerDropdown1Options,
  developerDropdown2Label,
  developerDropdown2Options,
  developerDropdown3Label,
  developerDropdown3Options,
  companyNameLabel = 'Company Name',
  messageLabel = 'Message (optional)',
  consentText = 'By submitting this form, I agree to the ',
  privacyPolicyLabel = 'Privacy Policy',
  privacyPolicyHref = '/privacy-policy',
  consentRequired = 'Please accept the privacy policy to continue',
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
    companyName:   '',
    message:       '',
  });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>, { once: true, margin: '-80px' });

  const EASE = [0.22, 1, 0.36, 1] as const;

  const isDeveloper = activeAudience === 'propertyDevelopers';

  const d1Label   = isDeveloper ? (developerDropdown1Label ?? propertyTypeLabel)    : propertyTypeLabel;
  const d1Options = isDeveloper ? (developerDropdown1Options ?? propertyTypeOptions) : propertyTypeOptions;
  const d2Label   = isDeveloper ? (developerDropdown2Label ?? spaceRequiredLabel)    : spaceRequiredLabel;
  const d2Options = isDeveloper ? (developerDropdown2Options ?? spaceRequiredOptions) : spaceRequiredOptions;
  const d3Label   = isDeveloper ? (developerDropdown3Label ?? typeOfServiceLabel)    : typeOfServiceLabel;
  const d3Options = isDeveloper ? (developerDropdown3Options ?? typeOfServiceOptions) : typeOfServiceOptions;

  const set = (key: keyof DreamSpaceFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Reset audience-specific fields when tab changes
  const switchAudience = (id: string) => {
    setActiveAudience(id);
    setFields((prev) => ({
      ...prev,
      propertyType:  '',
      spaceRequired: '',
      typeOfService: '',
      companyName:   '',
    }));
    setErrors({});
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const audienceToSubmissionType: Record<string, string> = {
    homeOwners:         'homeOwner',
    apartmentsOwners:   'apartmentOwner',
    propertyDevelopers: 'propertyDeveloper',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot — silently discard bot submissions
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const result = dreamSpaceSchema.safeParse(fields);
    const newErrors: FieldErrors = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof DreamSpaceFields;
        if (!newErrors[key]) newErrors[key] = issue.message;
      }
    }

    if (isDeveloper && !fields.companyName?.trim()) {
      newErrors.companyName = `${companyNameLabel} is required`;
    }

    if (!consent) {
      newErrors.consent = consentRequired;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    try {
      const apiBase = (process.env.CMS_API_BASE_URL ?? '').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/contact-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: audienceToSubmissionType[activeAudience] ?? activeAudience,
          firstName:    fields.firstName,
          lastName:     fields.lastName,
          email:        fields.email,
          phone:        fields.phone,
          propertyType: fields.propertyType,
          spaceRequired: fields.spaceRequired,
          typeOfService: fields.typeOfService,
          timeline:     fields.timeline,
          companyName:  fields.companyName,
          message:      fields.message,
        }),
      });

      if (!res.ok && res.status !== 429) {
        const body = await res.json().catch(() => ({})) as { message?: string };
        throw new Error(body.message ?? 'Submission failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          {/* Honeypot — hidden from real users, catches bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Audience tabs */}
          <div role="group" aria-label="Select audience type" className="mb-8 flex">
            {audienceTabs.map((tab) => {
              const isActive = activeAudience === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => switchAudience(tab.id)}
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

          {/* Developer: company name (full width) */}
          {isDeveloper && (
            <div className="mb-4">
              <TextInput
                id="company-name"
                name="companyName"
                label={companyNameLabel}
                value={fields.companyName ?? ''}
                onChange={set('companyName')}
                autoComplete="organization"
                error={errors.companyName}
                required
              />
            </div>
          )}

          {/* Dropdowns */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DarkSelect
              id="dropdown-1"
              label={d1Label}
              options={d1Options}
              value={fields.propertyType}
              onChange={set('propertyType')}
              error={errors.propertyType}
            />
            <DarkSelect
              id="dropdown-2"
              label={d2Label}
              options={d2Options}
              value={fields.spaceRequired}
              onChange={set('spaceRequired')}
              error={errors.spaceRequired}
            />
            <DarkSelect
              id="dropdown-3"
              label={d3Label}
              options={d3Options}
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
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              id="first-name"
              name="firstName"
              label={firstNameLabel}
              value={fields.firstName}
              onChange={set('firstName')}
              autoComplete="given-name"
              error={errors.firstName}
              required
            />
            <TextInput
              id="last-name"
              name="lastName"
              label={lastNameLabel}
              value={fields.lastName}
              onChange={set('lastName')}
              autoComplete="family-name"
              error={errors.lastName}
              required
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
              required
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
              required
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <TextArea
              id="message"
              name="message"
              label={messageLabel}
              value={fields.message ?? ''}
              onChange={set('message')}
              error={errors.message}
            />
          </div>

          {/* Consent */}
          <div className="mb-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
                }}
                className="mt-0.5 size-4 shrink-0 accent-white"
                required
                aria-describedby={errors.consent ? 'consent-error' : undefined}
              />
              <span className="text-sm text-white/70">
                {consentText}
                <Link
                  href={privacyPolicyHref}
                  className="underline underline-offset-2 hover:text-white"
                >
                  {privacyPolicyLabel}
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <p id="consent-error" className="mt-1 text-xs text-red-400" role="alert">
                {errors.consent}
              </p>
            )}
          </div>

          {/* Submit error */}
          {submitError && (
            <p className="mb-4 text-sm text-red-400" role="alert">{submitError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending…' : submitLabel}
            {!submitting && (
              <ArrowRight
                className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
