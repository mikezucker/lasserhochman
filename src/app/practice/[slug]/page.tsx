import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { practices } from "@/data/practices";
import { practiceGuides } from "@/data/practice-guides";
import { attorneys } from "@/data/attorneys";
import { PageHeading } from "@/components/ui/page-heading";
import { Reveal } from "@/components/ui/reveal";
import { TextLink } from "@/components/ui/link-arrow";
import { ContactBand } from "@/components/home/contact-band";
import { JsonLd, metadata as buildMetadata, origin } from "@/lib/seo";
import styles from "./practice-detail.module.css";

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

const sections = [
  ["introduction", "Overview"],
  ["understanding", "Understanding this area of law"],
  ["services", "Specific legal services"],
  ["situations", "Common legal situations"],
  ["process", "Understanding the legal process"],
  ["questions", "Frequently asked questions"],
  ["attorneys", "Related attorneys"],
];

export default async function PracticeDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = practices.find((p) => p.slug === slug);
  if (!p) notFound();
  const guide = practiceGuides[p.slug];
  const related = practices.filter((item) => guide.related.includes(item.slug));
  const people = p.attorneys.map((slug) =>
    attorneys.find((a) => a.slug === slug)!,
  );
  const path = `/practice/${p.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${origin}${path}#webpage`,
          url: `${origin}${path}`,
          name: `${p.name} | New Jersey | Lasser Hochman`,
          description: p.description,
          inLanguage: "en-US",
          about: {
            "@type": "Service",
            name: p.name,
            serviceType: p.name,
            provider: { "@id": `${origin}/#firm` },
            areaServed: { "@type": "State", name: "New Jersey" },
          },
          hasPart: {
            "@type": "FAQPage",
            "@id": `${origin}${path}#questions`,
            mainEntity: guide.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        }}
      />
      <PageHeading
        eyebrow="Our practice"
        title={p.name}
        description={p.short}
        path={path}
        parents={[{ name: "Practice Areas", path: "/practice" }]}
      />
      <div className={`wrap content-grid ${styles.layout}`}>
        <aside>
          <div>
            <nav
              className={`side-nav ${styles.contents}`}
              aria-label="On this page"
            >
              <p className="eyebrow">In this guide</p>
              {sections.map(([id, label]) => (
                <a href={`#${id}`} key={id}>
                  {label}
                </a>
              ))}
            </nav>
            <nav className="side-nav" aria-label="Practice areas">
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
              <TextLink href="/practice">All practice areas</TextLink>
            </nav>
          </div>
        </aside>
        <article
          className={`prose ${styles.article}`}
          aria-label={`${p.name} guide`}
        >
          <p className={styles.reviewNote}>
            {guide.reviewStatus}. The educational explanations below are a
            review draft.
          </p>
          <Reveal>
            <section
              id="introduction"
              className={styles.section}
              aria-labelledby="introduction-heading"
            >
              <p className="eyebrow">Perspective / {p.name}</p>
              <h2 id="introduction-heading">
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
              {guide.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <h3>Lasser Hochman’s practice</h3>
              {p.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          </Reveal>
          <Reveal>
            <section
              id="understanding"
              className={styles.section}
              aria-labelledby="understanding-heading"
            >
              <h2 id="understanding-heading">Understanding this area of law</h2>
              {guide.concepts.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </section>
          </Reveal>
          <Reveal>
            <section
              id="services"
              className={styles.section}
              aria-labelledby="services-heading"
            >
              <h2 id="services-heading">Specific legal services</h2>
              <p>
                These explanations expand on the firm’s published practice
                areas. The work appropriate to a particular matter, and the
                scope of any engagement, must be discussed with the firm.
              </p>
              {guide.services.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </section>
          </Reveal>
          <Reveal>
            <section
              id="situations"
              className={styles.section}
              aria-labelledby="situations-heading"
            >
              <h2 id="situations-heading">Common legal situations</h2>
              <p className={styles.caption}>
                Illustrative scenarios only. These are hypothetical examples,
                not actual firm cases or descriptions of results.
              </p>
              {guide.scenarios.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </section>
          </Reveal>
          <Reveal>
            <section
              id="process"
              className={styles.section}
              aria-labelledby="process-heading"
            >
              <h2 id="process-heading">Understanding the legal process</h2>
              <p>
                The following is a general orientation. The sequence, required
                steps, and timing depend on the facts, governing documents, and
                applicable law.
              </p>
              <ol className={styles.process}>
                {guide.process.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
          <Reveal>
            <section
              id="questions"
              className={styles.section}
              aria-labelledby="questions-heading"
            >
              <h2 id="questions-heading">Frequently asked questions</h2>
              <div className={styles.faqs}>
                {guide.faqs.map((faq) => (
                  <details key={faq.question} className={styles.faq}>
                    <summary>
                      <h3>{faq.question}</h3>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>
          <section className={styles.section} aria-labelledby="related-heading">
            <h2 id="related-heading">Related practice areas</h2>
            <div className={styles.related}>
              {related.map((item) => (
                <TextLink key={item.slug} href={`/practice/${item.slug}`}>
                  {item.name}
                </TextLink>
              ))}
            </div>
          </section>
          <section
            className={`${styles.section} ${styles.resources}`}
            aria-labelledby="resources-heading"
          >
            <h2 id="resources-heading">Further reading</h2>
            <p>
              Firm capabilities are based on Lasser Hochman’s{" "}
              <a href="https://www.lasserhochman.com/practice">
                published practice areas
              </a>
              , <a href="https://www.lasserhochman.com/about">firm history</a>,
              and the attorney biographies linked below. These primary resources
              provide additional context for the educational discussion:
            </p>
            <ul>
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url}>{source.label}</a>
                </li>
              ))}
            </ul>
            <p className={styles.disclaimer}>
              This guide provides general information, not legal or tax advice.
              It may not reflect every change in law and should not be relied on
              to determine a deadline or course of action. Your circumstances
              require individual review. Reading this page or contacting the
              firm does not create an attorney-client relationship. Do not send
              confidential information until the firm confirms an engagement.
              Outcomes depend on the facts and law; no result is guaranteed.
            </p>
          </section>
        </article>
      </div>
      <section
        id="attorneys"
        className="related-people"
        aria-labelledby="attorneys-heading"
      >
        <div className="wrap">
          <p className="eyebrow">Related experience</p>
          <h2 id="attorneys-heading">Meet our attorneys</h2>
          <p className={styles.peopleIntro}>
            The following attorneys list relevant areas in their published
            biographies. Visit each profile for the individual’s practice focus
            and background.
          </p>
          <div className="attorney-grid">
            {people.map((a) => (
              <Reveal key={a.slug}>
                <Link href={`/${a.slug}`} className="attorney-preview">
                  <div className="portrait">
                    <Image
                      src={a.image}
                      alt={a.name}
                      fill
                      sizes="(max-width: 700px) 44vw, (max-width: 1150px) 28vw, 21vw"
                    />
                  </div>
                  <div className="attorney-caption">
                    <div>
                      <h3>{a.name}</h3>
                      <p>{a.position}</p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
