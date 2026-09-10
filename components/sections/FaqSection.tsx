import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Public types ─────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  label: string;
  heading: string;
  items: FaqItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FaqSection({ label, heading, items }: FaqSectionProps) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="page-wrap py-12"
    >
      <div>
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-secondary">
            {label}
          </p>
          <h2
            id="faq-heading"
            className="text-3xl font-bold leading-tight text-secondary sm:text-4xl"
          >
            {heading}
          </h2>
        </div>

        {/* Accordion */}
        <Accordion
          defaultValue={items.length > 0 ? ["faq-0"] : []}
          aria-label={heading}
      
        >
          {items.map((item, i) => (
            <AccordionItem key={`faq-${i}`} value={`faq-${i}`}>
              <AccordionTrigger
                className="text-base text-secondary font-semibold py-5 hover:no-underline text-left"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-secondary leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
