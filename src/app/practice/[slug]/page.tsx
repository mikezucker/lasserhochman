import Link from "next/link";
import { notFound } from "next/navigation";
import { practices } from "@/data/practices";
import { attorneys } from "@/data/attorneys";
import { PageHeading } from "@/components/ui/page-heading";
import { TextLink } from "@/components/ui/link-arrow";
import { ContactBand } from "@/components/home/contact-band";
import { metadata as buildMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = practices.find((p) => p.slug === slug);
  return p
    ? buildMetadata(
        `${p.name} | New Jersey`,
        p.description,
        `/practice/${p.slug}`,
      )
    : {};
}
export default async function PracticeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = practices.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageHeading
        eyebrow="Our practice"
        title={p.name}
        description={p.short}
        path={`/practice/${p.slug}`}
        parents={[{ name: "Practice Areas", path: "/practice" }]}
      />
      <section className="wrap content-grid">
        <aside className="side-nav">
          <p className="eyebrow">Our capabilities</p>
          {practices.map((item) => (
            <Link
              href={`/practice/${item.slug}`}
              key={item.slug}
              aria-current={item.slug === slug ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </aside>
        <div className="prose">
          <h2>
            A considered approach
            <br />
            <em>
              to your{" "}
              {p.slug === "taxation"
                ? "tax matters"
                : p.slug === "litigation"
                  ? "dispute"
                  : "legal needs"}
              .
            </em>
          </h2>
          {p.paragraphs.map((para) => (
            <p key={para}>{para}</p>
          ))}
          <h3>Our work includes</h3>
          <ul className="service-list">
            {p.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <TextLink href="/contact">Discuss your matter with us</TextLink>
        </div>
      </section>
      <section className="related-people">
        <div className="wrap">
          <p className="eyebrow">Related experience</p>
          <h2>Meet our attorneys</h2>
          <div className="related-people-list">
            {p.attorneys.map((slug) => {
              const a = attorneys.find((a) => a.slug === slug)!;
              return (
                <Link key={slug} href={`/${slug}`}>
                  {a.name} <span aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
