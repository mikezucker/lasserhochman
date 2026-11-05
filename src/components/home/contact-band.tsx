import { firm } from "@/data/firm";
import { TextLink } from "@/components/ui/link-arrow";
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">Let’s start a conversation</p>
          <h2>
            Good counsel begins
            <br />
            with a conversation.
          </h2>
          <TextLink href="/contact">Get in touch</TextLink>
        </div>
        <div className="contact-details">
          <p className="eyebrow">Visit our office</p>
          <address>
            {firm.street}
            <br />
            {firm.city}
          </address>
          <a className="contact-phone" href={`tel:${firm.telephone}`}>
            {firm.phone}
          </a>
          <a
            className="text-link"
            href={firm.directions}
            target="_blank"
            rel="noreferrer"
          >
            Get directions <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
