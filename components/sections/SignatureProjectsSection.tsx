'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagger } from "@/components/ui/animate";

export interface SignatureProject {
  id: string;
  title: string;
  location: string;
  href: string;
  image: { src: string; alt: string };
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

function ProjectCard({ project }: { project: SignatureProject }) {
  return (
    <article>
      <Link
        href={project.href}
        aria-label={`${project.title} — ${project.location}`}
        className="group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, transparent 75%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 inset-x-0 p-6">
            <h3 className="mb-1 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="text-sm text-white/75">{project.location}</p>
          </div>
        </div>
      </Link>
    </article>
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

  const gridRef = useRef<HTMLUListElement>(null);
  const gridInView = useInView(gridRef as React.RefObject<Element>, {
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
        initial={{ opacity: 0, y: 24 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {heading}
      </motion.h2>

      <motion.ul
        ref={gridRef}
        role="list"
        className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8"
        variants={stagger.container}
        initial="hidden"
        animate={gridInView ? 'show' : 'hidden'}
      >
        {projects.map((project, i) => (
          <motion.li
            key={project.id}
            className={GRID_PLACEMENT[i] ?? ""}
            variants={stagger.item}
          >
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        ref={ctaRef}
        className="mt-14 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
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
