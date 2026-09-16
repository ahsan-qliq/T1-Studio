'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  label: string;
  heading: string;
  items: FaqItem[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function FaqSection({ label, heading, items }: FaqSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef as React.RefObject<Element>, {
    once: true,
    margin: "-40px",
  });

  return (
    <section aria-labelledby="faq-heading" className="page-wrap py-12">
      {/* Header */}
      <div ref={headingRef} className="mb-10 text-center">
        <motion.p
          className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary"
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {label}
        </motion.p>
        <motion.h2
          id="faq-heading"
          className="text-3xl font-bold leading-tight text-secondary sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
        >
          {heading}
        </motion.h2>
      </div>

      {/* Accordion items — staggered */}
      <div ref={listRef}>
        <Accordion
          defaultValue={items.length > 0 ? ["faq-0"] : []}
          aria-label={heading}
        >
          {items.map((item, i) => (
            <motion.div
              key={`faq-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={listInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
            >
              <AccordionItem value={`faq-${i}`}>
                <AccordionTrigger className="text-base text-secondary font-semibold py-5 hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-secondary leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
