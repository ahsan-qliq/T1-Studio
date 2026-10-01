"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/app/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

// index 0, 2, 4… → left col; index 1, 3, 5… → right col
function getPlacement(i: number) {
  const col = i % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2";
  return `${col} lg:row-start-${i + 1}`;
}
const CARD_STYLES = [
  "lg:w-[70%] lg:justify-self-end",
  "lg:w-[88%] lg:justify-self-start",
  "lg:w-[58%] lg:justify-self-end",
] as const;

const CARD_ASPECTS = ["4 / 5", "16 / 10", "3 / 4"] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: i * 0.18 },
  }),
};

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-80px",
  });

  const aspect = CARD_ASPECTS[index % CARD_ASPECTS.length];
  return (
    <motion.article
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {/* <Link
        href={post.href}
        aria-label={`${post.title} — ${post.readTime}`}
        className="group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{ aspectRatio: aspect }}
      > */}
      <Link
        href={post.href}
        aria-label={`${post.title} — ${post.readTime}`}
        className="group relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{ aspectRatio: aspect }}
      >
        {post.image?.src ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800" aria-hidden="true" />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 80%)",
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
    </motion.article>
  );
}

export function BlogSection({
  heading,
  posts,
  viewAllLabel,
  viewAllHref,
}: BlogSectionProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef as React.RefObject<Element>, {
    once: true,
    margin: "-40px",
  });

  return (
    <section aria-labelledby="blog-heading" className="page-wrap py-12">
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

      <div className="relative overflow-hidden">
        {/* Vertical spine line */}
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-px bg-white/30 lg:block"
          aria-hidden="true"
        />

        <ul
          role="list"
          className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-0 lg:gap-y-0"
        >
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className={`${getPlacement(i)} ${CARD_STYLES[i % CARD_STYLES.length]}`}
            >
              <BlogCard post={post} index={i} />
            </li>
          ))}
        </ul>
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
