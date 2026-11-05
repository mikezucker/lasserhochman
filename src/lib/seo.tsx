import type { Metadata } from "next";
import { indexingAllowed, siteOrigin } from "./indexing.mjs";
export const origin = siteOrigin(process.env);
export const canIndex = indexingAllowed(process.env);
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Lasser Hochman`,
      description,
      url: path,
      type: "website",
      siteName: "Lasser Hochman",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Lasser Hochman — Attorneys at Law, established 1954",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Lasser Hochman`,
      description,
      images: ["/opengraph-image"],
    },
    robots: { index: canIndex, follow: canIndex },
  };
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...items].map(
          (item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: origin + item.path,
          }),
        ),
      }}
    />
  );
}
