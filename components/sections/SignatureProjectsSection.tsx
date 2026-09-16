'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface SignatureProject {
  id: string;
  title: string;
  location: string;
  href: string;
  image: { src: string; alt: string; width: number; height: number };
}

interface SignatureProjectsSectionProps {
  heading: string;
  viewAllLabel: string;
  viewAllHref: string;
  projects: SignatureProject[];
}

const GRID_PLACEMENT = [
  "lg:col-start-1 lg:col-span-2 lg:row-start-1",
  "lg:col-start-3 lg:col-span-2 lg:row-start-2",
  "lg:col-start-2 lg:col-span-2 lg:row-start-3",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE, delay: i * 0.14 },
  }),
};

function ProjectCard({ project, index }: { project: SignatureProject; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      <Link
        href={project.href}
        aria-label={`${project.title} — ${project.location}`}
        className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: `${project.image.width} / ${project.image.height}` }}
        >
          {/* Image — scales on hover */}
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-in-out motion-safe:group-hover:scale-[1.07]"
          />

          {/* Base gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 80%)",
            }}
            aria-hidden="true"
          />

          {/* Hover tint overlay */}
          <div
            className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20"
            aria-hidden="true"
          />

          {/* Text block — lifts slightly on hover */}
          <div className="absolute inset-x-0 bottom-0 p-6 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:-translate-y-1">
            <h3 className="mb-1 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/75">{project.location}</p>
              {/* Arrow — slides in from left + fades on hover */}
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 opacity-0 backdrop-blur-sm motion-safe:translate-x-3 motion-safe:transition motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100"
                aria-hidden="true"
              >
                <ArrowRight className="size-4 text-white" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function SignatureProjectsSection({
  heading,
  viewAllLabel,
  viewAllHref,
  projects,
}: SignatureProjectsSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef as React.RefObject<Element>, {
    once: true,
    margin: '-40px',
  });

  return (
    <section
      aria-labelledby="signature-projects-heading"
      className="page-wrap py-12"
    >
      <motion.h2
        ref={headingRef}
        id="signature-projects-heading"
        className="mb-12 text-center text-4xl font-bold text-white sm:text-5xl lg:mb-16"
        initial={{ opacity: 0, y: 32 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {heading}
      </motion.h2>

      <ul
        role="list"
        className="grid grid-cols-1 gap-y-6 lg:grid-cols-4 lg:gap-y-8"
      >
        {projects.map((project, i) => (
          <li
            key={project.id}
            className={GRID_PLACEMENT[i] ?? ""}
          >
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>

      <motion.div
        ref={ctaRef}
        className="mt-14 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
      >
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-7 py-3 text-sm font-medium text-[#0C0C0C] transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {viewAllLabel}
          <ArrowRight
            className="size-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </section>
  );
}
