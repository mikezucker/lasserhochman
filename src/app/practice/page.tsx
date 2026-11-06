import { PracticeIcon } from "@/components/ui/practice-icon";
import styles from "./practice.module.css";
import { PageHeading } from "@/components/ui/page-heading";
import { TextLink } from "@/components/ui/link-arrow";
import { ContactBand } from "@/components/home/contact-band";
import { practices } from "@/data/practices";
import { metadata as buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata(
  "Our Practice Areas",
  "Explore Lasser Hochman’s New Jersey legal services: real property tax appeals, real estate, litigation, corporate law, estates, and taxation.",
  "/practice",
);
export default function Practice() {
  return (
    <>
      <PageHeading
        eyebrow="Our capabilities"
        title="A broad perspective. A focused approach."
        description="Legal counsel for businesses, institutions, and individuals, with longstanding experience in real estate and real property tax appeals."
        path="/practice"
      />
      <div className="wrap practice-overview">
        {practices.map((p, i) => {
          return (
            <section className="practice-overview-item" key={p.slug}>
              <p className="eyebrow">0{i + 1} / Our practice</p>
              <div className={styles.heading}>
                <PracticeIcon slug={p.slug} className={styles.icon} />
                <h2>{p.name}</h2>
              </div>
              <p>{p.description}</p>
              <TextLink href={`/practice/${p.slug}`}>Explore {p.name}</TextLink>
            </section>
          );
        })}
      </div>
      <ContactBand />
    </>
  );
}
