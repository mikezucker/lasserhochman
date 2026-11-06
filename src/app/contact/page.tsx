import { ContactForm } from "@/components/contact/contact-form";
import Link from "next/link";
import { PageHeading } from "@/components/ui/page-heading";
import { firm } from "@/data/firm";
import { metadata as buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata(
  "Contact & Directions",
  "Contact Lasser Hochman at 973-226-2700. Visit our office at 75 Eisenhower Parkway, Suite 120, Roseland, New Jersey 07068.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageHeading
        eyebrow="Contact"
        title="Let’s talk."
        description="Call our Roseland office to arrange a consultation or appointment."
        path="/contact"
      />
      <section className="wrap contact-page-grid">
        <div>
          <p className="eyebrow">Roseland, New Jersey</p>
          <h2>Lasser Hochman, LLC</h2>
          <address>
            {firm.street}
            <br />
            {firm.city}
          </address>
          <dl>
            <dt>Telephone</dt>
            <dd>
              <a href={`tel:${firm.telephone}`}>{firm.phone}</a>
            </dd>
            <dt>Fax</dt>
            <dd>{firm.fax}</dd>
          </dl>
          <a
            className="button"
            href={firm.directions}
            target="_blank"
            rel="noreferrer"
          >
            Get directions<span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens a new tab)</span>
          </a>
          <p style={{ marginTop: 30, fontSize: 13 }}>
            Looking for a particular attorney?
          </p>
          <Link className="text-link" href="/attorneys">
            Find an attorney<span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
