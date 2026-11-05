import Image from "next/image";
import { PageHeading } from "@/components/ui/page-heading";
import { TextLink } from "@/components/ui/link-arrow";
import { ContactBand } from "@/components/home/contact-band";
import { metadata as buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata(
  "Our Firm & History",
  "Learn about Lasser Hochman, a full-service Roseland, New Jersey law firm established in 1954 with a commitment to personal service.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageHeading
        eyebrow="Our firm"
        title="A lasting perspective."
        description="Established in 1954. Committed to the relationships that carry us forward."
        path="/about"
      />
      <section className="wrap content-grid">
        <div className="section-side">
          <p className="eyebrow">Experience. Continuity. Care.</p>
          <span className="small-rule" />
        </div>
        <div className="prose">
          <h2>
            Full-service counsel.
            <br />
            <em>A personal commitment.</em>
          </h2>
          <p>
            Lasser Hochman is a full-service law firm located in Roseland, New
            Jersey. Since its inception, the firm has remained committed to
            offering the skills and professionalism of a large firm while
            limiting its size to provide the quality and personal service
            expected of a smaller one.
          </p>
          <p>
            Many clients have been with the firm for generations. Our clients
            include corporations, small businesses, individuals, institutional
            lenders, real estate boards, brokers, builders, developers,
            operators, and managers.
          </p>
          <h3>Our beginnings</h3>
          <p>
            In 1954, Aaron Lasser and Lawrence Lasser began the practice of law
            under the name Lasser and Lasser. H. Lee Sarokin and B. William
            Hochman joined as partners shortly thereafter.
          </p>
          <p>
            The firm’s history includes partners who went on to judicial
            service. H. Lee Sarokin served on the federal district court and the
            United States Court of Appeals for the Third Circuit. Lawrence L.
            Lasser served as Chief Judge of the New Jersey Tax Court for more
            than ten years. Harold A. Kuskin also served on the New Jersey Tax
            Court, and Jodi Lee Alper left the firm at the end of 2016 to become
            a Judge of the Superior Court of New Jersey.
          </p>
          <h3>A broad commercial practice</h3>
          <p>
            Since its inception, the firm has maintained an active commercial
            practice with a special emphasis on real property tax appeals and
            real estate. Its work encompasses property acquisition, disposition,
            leasing, zoning, land use, financing, and local and state tax
            issues.
          </p>
          <p>
            The firm also conducts an active litigation practice. For many
            years, it has represented banks, life insurance companies, real
            estate investment trusts, pension funds, and other financial
            institutions in matters including foreclosures, workouts, and
            property dispositions.
          </p>
          <TextLink href="/attorneys">Meet our attorneys</TextLink>
        </div>
      </section>
      <figure className="wrap history-art">
        <Image
          className="art-image"
          src="/images/source-aboutus.jpg"
          alt="An architectural cityscape artwork signed Aaron Lasser, 1959, reproduced from the firm’s existing website"
          width={2461}
          height={806}
          sizes="(max-width: 700px) 100vw, 90vw"
        />
        <figcaption>
          From the firm’s history: artwork signed Aaron Lasser, 1959.
        </figcaption>
      </figure>
      <ContactBand />
    </>
  );
}
