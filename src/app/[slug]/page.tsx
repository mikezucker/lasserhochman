import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { attorneys } from "@/data/attorneys";
import { practices } from "@/data/practices";
import { firm } from "@/data/firm";
import { PageHeading } from "@/components/ui/page-heading";
import { ContactBand } from "@/components/home/contact-band";
import { metadata as buildMetadata, JsonLd, origin } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return attorneys.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = attorneys.find((a) => a.slug === slug);
  if (!a) return {};
  return buildMetadata(
    `${a.name}, ${a.position}`,
    `${a.name}, ${a.position} at Lasser Hochman in Roseland, New Jersey. View practice areas, education, bar admissions, and contact information.`,
    `/${a.slug}`,
  );
}
export default async function Profile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = attorneys.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = practices.filter((p) => p.attorneys.includes(a.slug));
  return (
    <>
      <PageHeading
        eyebrow={a.position}
        title={a.name}
        path={`/${a.slug}`}
        parents={[{ name: "Attorneys", path: "/attorneys" }]}
      />
      <section className="wrap profile-grid">
        <aside>
          <div className="profile-photo">
            <Image
              src={a.image}
              alt={a.name}
              fill
              preload
              sizes="(max-width: 700px) 90vw, 320px"
            />
          </div>
          <div className="profile-contact">
            <p className="eyebrow">Contact {a.name.split(" ")[0]}</p>
            <a href={`tel:${firm.telephone}`}>{firm.phone}</a>
            <a className="text-link" href={`mailto:${a.email}`}>
              Email {a.name}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
        <div>
          <p className="profile-summary">
            {a.name} is{" "}
            {a.position === "Associate"
              ? "an associate"
              : a.position === "Member"
                ? "a member"
                : "of counsel"}{" "}
            at Lasser Hochman in Roseland, New Jersey.
          </p>
          {a.bio && <p className="profile-bio">{a.bio}</p>}
          <div className="profile-fields">
            {Object.entries(a.fields).map(([label, values]) => (
              <section className="profile-field" key={label}>
                <h2>{label === "Bar Admission" ? "Bar Admissions" : label}</h2>
                <ul>
                  {values?.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {related.length > 0 && (
            <div className="related-links">
              {related.map((p) => (
                <Link
                  className="text-link"
                  key={p.slug}
                  href={`/practice/${p.slug}`}
                >
                  {p.name}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${origin}/${a.slug}#person`,
          name: a.name,
          jobTitle: a.position,
          url: `${origin}/${a.slug}`,
          image: origin + a.image,
          telephone: firm.telephone,
          email: a.email,
          worksFor: { "@id": `${origin}/#firm` },
        }}
      />
      <ContactBand />
    </>
  );
}
