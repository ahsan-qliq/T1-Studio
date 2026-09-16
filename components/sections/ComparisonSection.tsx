'use client';

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface ComparisonColumn {
  title: string;
  features: string[];
  variant: "dark" | "light";
}

interface ComparisonSectionProps {
  heading: string;
  columns: ComparisonColumn[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

// Each column slides in from a different direction for visual depth
const COLUMN_ORIGINS = [
  { x: -48, y: 0 },
  { x: 0,   y: 48 },
  { x: 48,  y: 0 },
] as const;

function ComparisonCard({
  title,
  features,
  variant,
  index,
  inView,
}: ComparisonColumn & { index: number; inView: boolean }) {
  const isDark = variant === "dark";
  const origin = COLUMN_ORIGINS[index] ?? { x: 0, y: 48 };

  return (
    <motion.article
      className={cn(
        "flex flex-col gap-6 rounded-2xl p-8",
        isDark ? "bg-primary" : "border border-border bg-white",
      )}
      initial={{ opacity: 0, x: origin.x, y: origin.y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.12 }}
    >
      <h3
        className={cn(
          "text-center text-xl font-bold",
          isDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h3>

      <ul role="list" className="flex flex-col gap-5">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.12 + 0.25 + i * 0.06 }}
          >
            <Check
              className={cn(
                "mt-0.5 size-4 shrink-0",
                isDark ? "text-white" : "text-foreground",
              )}
              aria-hidden="true"
              strokeWidth={2.5}
            />
            <span
              className={cn(
                "text-sm leading-relaxed",
                isDark ? "text-white/85" : "text-muted-foreground",
              )}
            >
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export function ComparisonSection({ heading, columns }: ComparisonSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  const gridRef = useRef<HTMLUListElement>(null);
  const gridInView = useInView(gridRef as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  return (
    <section aria-labelledby="comparison-heading" className="page-wrap py-12">
      <motion.h2
        ref={headingRef}
        id="comparison-heading"
        className="mb-10 text-center text-3xl font-bold text-secondary lg:text-4xl"
        initial={{ opacity: 0, y: 28 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
      >
        {heading}
      </motion.h2>

      <ul
        ref={gridRef}
        role="list"
        className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {columns.map((col, i) => (
          <li key={col.title}>
            <ComparisonCard {...col} index={i} inView={gridInView} />
          </li>
        ))}
      </ul>
    </section>
  );
}
