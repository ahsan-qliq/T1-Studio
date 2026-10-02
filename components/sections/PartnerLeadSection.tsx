'use client';

import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { z } from 'zod';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PartnerSelectOption {
  value: string;
  label: string;
}

export interface PartnerLeadSectionProps {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  submitLabel: string;

  // Tab labels
  tradePartnerLabel: string;
  referralPartnerLabel: string;

  // Trade Partner field labels
  trade: {
    companyNameLabel: string;
    companyTypeLabel: string;
    companyTypeOptions: PartnerSelectOption[];
    projectScaleLabel: string;
    projectScaleOptions: PartnerSelectOption[];
    locationLabel: string;
    locationOptions: PartnerSelectOption[];
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
  };

  // Referral Partner field labels
  referral: {
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    clientNameLabel: string;
    referralSourceLabel: string;
    referralSourceOptions: PartnerSelectOption[];
    clientTypeLabel: string;
    clientTypeOptions: PartnerSelectOption[];
  };
}

// ─── Zod schemas ──────────────────────────────────────────────────────────────

const tradeSchema = z.object({
  companyName:  z.string().min(1, 'Company name is required'),
  companyType:  z.string().min(1, 'Please select a company type'),
  projectScale: z.string().min(1, 'Please select a project scale'),
  location:     z.string().min(1, 'Please select a location'),
  firstName:    z.string().min(1, 'First name is required'),
  lastName:     z.string().min(1, 'Last name is required'),
  email:        z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone:        z.string().min(1, 'Phone number is required').regex(/^\+?[\d\s\-()]{7,}$/, 'Enter a valid phone number'),
});

const referralSchema = z.object({
  firstName:      z.string().min(1, 'First name is required'),
  lastName:       z.string().min(1, 'Last name is required'),
  email:          z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone:          z.string().min(1, 'Phone number is required').regex(/^\+?[\d\s\-()]{7,}$/, 'Enter a valid phone number'),
  clientName:     z.string().min(1, 'Client name is required'),
  referralSource: z.string().min(1, 'Please select how you heard about us'),
  clientType:     z.string().min(1, 'Please select a client type'),
});

type TradeFields    = z.infer<typeof tradeSchema>;
type ReferralFields = z.infer<typeof referralSchema>;
type FieldErrors    = Partial<Record<string, string>>;

// ─── Shared styles ────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const fieldBase =
  'w-full border bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:outline-none';

function fieldCls(error?: string) {
  return cn(
    fieldBase,
    error
      ? 'border-red-400/70 focus:border-red-400'
      : 'border-white/20 focus:border-white/60',
  );
}

// ─── FieldError ───────────────────────────────────────────────────────────────

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-red-400" role="alert">
      {message}
    </p>
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
  options: PartnerSelectOption[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(fieldCls(error), 'cursor-pointer appearance-none pr-10')}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
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
      <FieldError id={errorId} message={error} />
    </div>
  );
}

// ─── TextInput ────────────────────────────────────────────────────────────────

function TextInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldCls(error)}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

// ─── Trade Partner form ───────────────────────────────────────────────────────

function TradePartnerForm({
  props,
  onSuccess,
}: {
  props: PartnerLeadSectionProps['trade'];
  onSuccess: () => void;
}) {
  const empty: TradeFields = {
    companyName: '', companyType: '', projectScale: '',
    location: '', firstName: '', lastName: '', email: '', phone: '',
  };
  const [fields, setFields] = useState<TradeFields>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = (key: keyof TradeFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = tradeSchema.safeParse(fields);
    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    // TODO: send result.data to your API
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Trade partner enquiry" noValidate>
      {/* Company details */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          id="trade-company-name"
          name="companyName"
          label={props.companyNameLabel}
          value={fields.companyName}
          onChange={set('companyName')}
          autoComplete="organization"
          error={errors.companyName}
        />
        <DarkSelect
          id="trade-company-type"
          label={props.companyTypeLabel}
          options={props.companyTypeOptions}
          value={fields.companyType}
          onChange={set('companyType')}
          error={errors.companyType}
        />
        <DarkSelect
          id="trade-project-scale"
          label={props.projectScaleLabel}
          options={props.projectScaleOptions}
          value={fields.projectScale}
          onChange={set('projectScale')}
          error={errors.projectScale}
        />
        <DarkSelect
          id="trade-location"
          label={props.locationLabel}
          options={props.locationOptions}
          value={fields.location}
          onChange={set('location')}
          error={errors.location}
        />
      </div>

      {/* Personal details */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          id="trade-first-name"
          name="firstName"
          label={props.firstNameLabel}
          value={fields.firstName}
          onChange={set('firstName')}
          autoComplete="given-name"
          error={errors.firstName}
        />
        <TextInput
          id="trade-last-name"
          name="lastName"
          label={props.lastNameLabel}
          value={fields.lastName}
          onChange={set('lastName')}
          autoComplete="family-name"
          error={errors.lastName}
        />
        <TextInput
          id="trade-email"
          name="email"
          type="email"
          label={props.emailLabel}
          value={fields.email}
          onChange={set('email')}
          autoComplete="email"
          error={errors.email}
        />
        <TextInput
          id="trade-phone"
          name="phone"
          type="tel"
          label={props.phoneLabel}
          value={fields.phone}
          onChange={set('phone')}
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      <SubmitButton />
    </form>
  );
}

// ─── Referral Partner form ────────────────────────────────────────────────────

function ReferralPartnerForm({
  props,
  onSuccess,
}: {
  props: PartnerLeadSectionProps['referral'];
  onSuccess: () => void;
}) {
  const empty: ReferralFields = {
    firstName: '', lastName: '', email: '', phone: '',
    clientName: '', referralSource: '', clientType: '',
  };
  const [fields, setFields] = useState<ReferralFields>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = (key: keyof ReferralFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = referralSchema.safeParse(fields);
    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    // TODO: send result.data to your API
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Referral partner enquiry" noValidate>
      {/* Personal details */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          id="ref-first-name"
          name="firstName"
          label={props.firstNameLabel}
          value={fields.firstName}
          onChange={set('firstName')}
          autoComplete="given-name"
          error={errors.firstName}
        />
        <TextInput
          id="ref-last-name"
          name="lastName"
          label={props.lastNameLabel}
          value={fields.lastName}
          onChange={set('lastName')}
          autoComplete="family-name"
          error={errors.lastName}
        />
        <TextInput
          id="ref-email"
          name="email"
          type="email"
          label={props.emailLabel}
          value={fields.email}
          onChange={set('email')}
          autoComplete="email"
          error={errors.email}
        />
        <TextInput
          id="ref-phone"
          name="phone"
          type="tel"
          label={props.phoneLabel}
          value={fields.phone}
          onChange={set('phone')}
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      {/* Referral details */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          id="ref-client-name"
          name="clientName"
          label={props.clientNameLabel}
          value={fields.clientName}
          onChange={set('clientName')}
          error={errors.clientName}
        />
        <DarkSelect
          id="ref-referral-source"
          label={props.referralSourceLabel}
          options={props.referralSourceOptions}
          value={fields.referralSource}
          onChange={set('referralSource')}
          error={errors.referralSource}
        />
        <DarkSelect
          id="ref-client-type"
          label={props.clientTypeLabel}
          options={props.clientTypeOptions}
          value={fields.clientType}
          onChange={set('clientType')}
          error={errors.clientType}
        />
      </div>

      <SubmitButton />
    </form>
  );
}

// ─── Submit button (shared) ───────────────────────────────────────────────────

function SubmitButton() {
  return (
    <button
      type="submit"
      className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
    >
      Submit
      <ArrowRight
        className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </button>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type TabId = 'trade' | 'referral';

// ─── Main section ─────────────────────────────────────────────────────────────

export function PartnerLeadSection({
  heading,
  imageSrc,
  imageAlt,
  submitLabel: _submitLabel,
  tradePartnerLabel,
  referralPartnerLabel,
  trade,
  referral,
}: PartnerLeadSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>('trade');
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    margin: '-80px',
  });

  const tabs: { id: TabId; label: string }[] = [
    { id: 'trade',    label: tradePartnerLabel },
    { id: 'referral', label: referralPartnerLabel },
  ];

  if (submitted) {
    return (
      <section
        ref={sectionRef}
        aria-labelledby="partner-lead-heading"
        className="flex min-h-150 flex-col items-center justify-center bg-[#0C0C0C] px-8 py-20 text-center"
      >
        <h2
          id="partner-lead-heading"
          className="mb-4 text-3xl font-bold text-white lg:text-4xl"
        >
          {heading}
        </h2>
        <p className="text-white/60">Thank you! We'll be in touch soon.</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="partner-lead-heading"
      className="flex min-h-150 flex-col overflow-hidden lg:flex-row"
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
        />
      </motion.div>

      {/* Right — form panel */}
      <motion.div
        className="flex flex-1 flex-col justify-center bg-[#0C0C0C] px-8 py-14 lg:px-14 xl:px-20"
        initial={{ opacity: 0, x: 56 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
      >
        <h2
          id="partner-lead-heading"
          className="mb-8 text-3xl font-bold text-white lg:text-4xl"
        >
          {heading}
        </h2>

        {/* Tab switcher */}
        <div
          role="tablist"
          aria-label="Partner type"
          className="mb-8 flex"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`partner-tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`partner-panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 border border-white/20 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset',
                  isActive
                    ? 'bg-white text-black'
                    : 'bg-transparent text-white hover:bg-white/10',
                  'not-first:-ms-px',
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div
          id="partner-panel-trade"
          role="tabpanel"
          aria-labelledby="partner-tab-trade"
          hidden={activeTab !== 'trade'}
        >
          {activeTab === 'trade' && (
            <TradePartnerForm props={trade} onSuccess={() => setSubmitted(true)} />
          )}
        </div>

        <div
          id="partner-panel-referral"
          role="tabpanel"
          aria-labelledby="partner-tab-referral"
          hidden={activeTab !== 'referral'}
        >
          {activeTab === 'referral' && (
            <ReferralPartnerForm props={referral} onSuccess={() => setSubmitted(true)} />
          )}
        </div>
      </motion.div>
    </section>
  );
}
