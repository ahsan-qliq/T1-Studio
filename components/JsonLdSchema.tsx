interface SeoWithSchema {
  schema?: Record<string, unknown>;
}

interface JsonLdSchemaProps {
  globalSeo?: SeoWithSchema | null;
  pageSeo?: SeoWithSchema | null;
}

export function JsonLdSchema({ globalSeo, pageSeo }: JsonLdSchemaProps) {
  const graph = [
    ...((globalSeo?.schema?.["@graph"] as unknown[]) ?? []),
    ...((pageSeo?.schema?.["@graph"] as unknown[]) ?? []),
  ];
  if (!graph.length) return null;
  const schema = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      async
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
