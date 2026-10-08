"use client";

import { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, FileText, Download, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const PER_PAGE = 3;

// ─── Public types ──────────────────────────────────────────────────────────────

export interface ResourceItem {
  id: string;
  title: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
}

export interface ResourceCenterSectionProps {
  heading: string;
  items: ResourceItem[];
  prevLabel?: string;
  nextLabel?: string;
  downloadLabel?: string;
}

// ─── Lead modal ───────────────────────────────────────────────────────────────

interface LeadForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

const EMPTY_FORM: LeadForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
};

function LeadModal({
  item,
  onClose,
}: {
  item: ResourceItem;
  onClose: () => void;
}) {
  const titleId = useId();
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<LeadForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus first input on open
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const set = (field: keyof LeadForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Partial<LeadForm> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Trigger download
      const a = document.createElement("a");
      a.href = item.downloadUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/50 focus:bg-white/10";
  const errorClass = "mt-1 text-xs text-red-400";

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-lg bg-[#0a0a0a] border border-white/10"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Download</p>
            <h2 id={titleId} className="text-lg font-semibold text-white leading-snug">
              {item.title}
            </h2>
            <p className="mt-0.5 text-xs text-white/40">
              {item.fileType} · {item.fileSize}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="mt-0.5 shrink-0 text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-4">
          <p className="text-sm text-white/50 -mt-1">
            Please fill in your details to download this resource.
          </p>

          {/* First / Last name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rc-firstName" className="sr-only">First Name</label>
              <input
                ref={firstInputRef}
                id="rc-firstName"
                type="text"
                placeholder="First Name *"
                autoComplete="given-name"
                value={form.firstName}
                onChange={set("firstName")}
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "rc-firstName-err" : undefined}
                className={inputClass}
              />
              {errors.firstName && (
                <p id="rc-firstName-err" className={errorClass}>{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="rc-lastName" className="sr-only">Last Name</label>
              <input
                id="rc-lastName"
                type="text"
                placeholder="Last Name *"
                autoComplete="family-name"
                value={form.lastName}
                onChange={set("lastName")}
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "rc-lastName-err" : undefined}
                className={inputClass}
              />
              {errors.lastName && (
                <p id="rc-lastName-err" className={errorClass}>{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="rc-email" className="sr-only">Email</label>
            <input
              id="rc-email"
              type="email"
              placeholder="Email Address *"
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "rc-email-err" : undefined}
              className={inputClass}
            />
            {errors.email && (
              <p id="rc-email-err" className={errorClass}>{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="rc-phone" className="sr-only">Phone</label>
            <input
              id="rc-phone"
              type="tel"
              placeholder="Phone Number *"
              autoComplete="tel"
              value={form.phone}
              onChange={set("phone")}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "rc-phone-err" : undefined}
              className={inputClass}
            />
            {errors.phone && (
              <p id="rc-phone-err" className={errorClass}>{errors.phone}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="rc-company" className="sr-only">Company</label>
            <input
              id="rc-company"
              type="text"
              placeholder="Company Name"
              autoComplete="organization"
              value={form.company}
              onChange={set("company")}
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex w-full items-center justify-center gap-2 bg-white py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="size-4" aria-hidden="true" />
            )}
            {submitting ? "Preparing download…" : "Download Now"}
          </button>
        </form>
      </motion.div>
    </div>
  );

  return createPortal(
    <AnimatePresence>{modal}</AnimatePresence>,
    document.body
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────

function ResourceCard({
  item,
  downloadLabel,
  index,
  onRequestDownload,
}: {
  item: ResourceItem;
  downloadLabel: string;
  index: number;
  onRequestDownload: (item: ResourceItem) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
    >
      <button
        type="button"
        onClick={() => onRequestDownload(item)}
        aria-label={`${downloadLabel}: ${item.title} (${item.fileType}, ${item.fileSize})`}
        className="group flex w-full items-center gap-4 border border-white/20 p-5 text-left transition-colors duration-200 hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center border border-white/30 text-white"
        >
          <FileText className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-white">
            {item.title}
          </p>
          <p className="mt-0.5 text-sm text-white/50">
            {item.fileType} · {item.fileSize}
          </p>
        </div>

        <Download
          aria-hidden="true"
          className="size-4 shrink-0 text-white/30 transition-colors duration-200 group-hover:text-white/70"
        />
      </button>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export function ResourceCenterSection({
  heading,
  items,
  prevLabel = "Previous resources",
  nextLabel = "Next resources",
  downloadLabel = "Download",
}: ResourceCenterSectionProps) {
  const [page, setPage] = useState(0);
  const [activeItem, setActiveItem] = useState<ResourceItem | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  const totalPages = Math.ceil(items.length / PER_PAGE);
  const visible = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  if (!items.length) return null;

  return (
    <>
      <section
        ref={ref}
        aria-labelledby="resource-center-heading"
        className="bg-black py-16 lg:py-24"
      >
        <motion.div
          className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* ── Header ── */}
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <h2
              id="resource-center-heading"
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              {heading}
            </h2>

            {totalPages > 1 && (
              <div className="flex items-center gap-2" role="group" aria-label="Resource pagination">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label={prevLabel}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  aria-label={nextLabel}
                  className="flex size-10 items-center justify-center rounded-full bg-white text-black transition-colors duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          {/* ── Grid ── */}
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            aria-live="polite"
            aria-atomic="true"
          >
            {visible.map((item, i) => (
              <ResourceCard
                key={item.id}
                item={item}
                downloadLabel={downloadLabel}
                index={i}
                onRequestDownload={setActiveItem}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <p className="sr-only">Page {page + 1} of {totalPages}</p>
          )}
        </motion.div>
      </section>

      <AnimatePresence>
        {activeItem && (
          <LeadModal
            item={activeItem}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
