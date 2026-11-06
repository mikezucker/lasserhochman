import { MapPin, MessageSquare, Phone } from "lucide-react";
import styles from "./contact-band.module.css";
import { firm } from "@/data/firm";
import { TextLink } from "@/components/ui/link-arrow";
export function ContactBand({ showIcons = false }: { showIcons?: boolean }) {
  return (
    <section className="contact-band">
      <div className="wrap contact-grid">
        <div>
          <p className={`eyebrow${showIcons ? ` ${styles.eyebrow}` : ""}`}>
            {showIcons && (
              <MessageSquare
                className={styles.icon}
                size={20}
                strokeWidth={1.4}
                aria-hidden="true"
                focusable="false"
              />
            )}
            Let’s start a conversation
          </p>
          <h2>
            Good counsel begins
            <br />
            with a conversation.
          </h2>
          <TextLink href="/contact">Get in touch</TextLink>
        </div>
        <div className="contact-details">
          <p className="eyebrow">Visit our office</p>
          <address className={showIcons ? styles.address : undefined}>
            {showIcons && (
              <MapPin
                className={styles.icon}
                size={20}
                strokeWidth={1.4}
                aria-hidden="true"
                focusable="false"
              />
            )}
            <span>
              {firm.street}
              <br />
              {firm.city}
            </span>
          </address>
          <a
            className={`contact-phone${showIcons ? ` ${styles.phone}` : ""}`}
            href={`tel:${firm.telephone}`}
          >
            {showIcons && (
              <Phone
                className={styles.icon}
                size={20}
                strokeWidth={1.4}
                aria-hidden="true"
                focusable="false"
              />
            )}
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
