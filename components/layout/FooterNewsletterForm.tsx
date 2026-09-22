'use client';

import { useState } from 'react';

interface FooterNewsletterFormProps {
  emailPlaceholder: string;
  submitLabel: string;
  formLabel: string;
}

export function FooterNewsletterForm({ emailPlaceholder, submitLabel, formLabel }: FooterNewsletterFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch gap-2" aria-label={formLabel}>
      <label htmlFor="footer-newsletter-email" className="sr-only">
        {emailPlaceholder}
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={emailPlaceholder}
        className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-foreground"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
      >
        {submitLabel}
      </button>
    </form>
  );
}
