'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/app/i18n/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stagger } from '@/components/ui/animate';

export interface BlogPost {
  slug: string;
  tag: string;
  readTime: string;
  title: string;
  href: string;
  image?: { src: string; alt: string };
}

interface BlogSectionProps {
  label: string;
  heading: string;
  posts: BlogPost[];
  viewAllLabel: string;
  viewAllHref: string;
  learnMoreLabel: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article>
      <Link
        href={post.href}
        aria-label={`${post.title} — ${post.readTime}`}
        className="group relative block aspect-[4/5] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {post.image ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800" aria-hidden="true" />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="mb-3 text-lg font-bold leading-snug text-white sm:text-xl">
            {post.title}
          </h3>
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {post.tag}
            </span>
            <span className="text-xs text-white/70">{post.readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function BlogSection({
  heading,
  posts,
  viewAllLabel,
  viewAllHref,
}: BlogSectionProps) {
  const left = [posts[0], posts[2]].filter(Boolean) as BlogPost[];
  const right = [posts[1], posts[3]].filter(Boolean) as BlogPost[];

  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef as React.RefObject<Element>, {
    once: true,
    margin: '-60px',
  });

  const rightRef = useRef<HTMLDivElement>(null);
  const rightInView = useInView(rightRef as React.RefObject<Element>, {
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
      aria-labelledby="blog-heading"
      className="page-wrap py-12"
    >
      <motion.h2
        ref={headingRef}
        id="blog-heading"
        className="mb-12 text-center text-4xl font-bold text-white sm:text-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {heading}
      </motion.h2>

      <div
        className="mx-auto max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-2 overflow-hidden"
        role="list"
        aria-label={heading}
      >
        {/* Left column — slides in from left */}
        <motion.div
          ref={leftRef}
          role="presentation"
          className="flex flex-col gap-6"
          variants={{ ...stagger.container, show: { ...stagger.container.show, transition: { staggerChildren: 0.15, delayChildren: 0.05 } } }}
          initial="hidden"
          animate={leftInView ? 'show' : 'hidden'}
        >
          {left.map((post) => (
            <motion.div key={post.slug} role="listitem" variants={stagger.itemFromLeft}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>

        {/* Right column — slides in from right, offset downward */}
        <motion.div
          ref={rightRef}
          role="presentation"
          className="flex flex-col gap-6 sm:mt-24"
          variants={{ ...stagger.container, show: { ...stagger.container.show, transition: { staggerChildren: 0.15, delayChildren: 0.15 } } }}
          initial="hidden"
          animate={rightInView ? 'show' : 'hidden'}
        >
          {right.map((post) => (
            <motion.div key={post.slug} role="listitem" variants={stagger.itemFromRight}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>

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
