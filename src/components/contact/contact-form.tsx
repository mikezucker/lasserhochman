"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useRef, useState, useSyncExternalStore } from "react";
import { firm } from "@/data/firm";
import styles from "./contact-form.module.css";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function ContactForm() {
  // A disabled server-rendered submit button also prevents accidental native
  // submission if JavaScript is unavailable or hydration has not completed.
  const hydrated = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [previewed, setPreviewed] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.panel}>
      <p className="eyebrow">Start a conversation</p>
      <div className={styles.heading}>
        <MessageSquare
          className={styles.icon}
          size={30}
          strokeWidth={1.4}
          aria-hidden="true"
          focusable="false"
        />
        <h2>How can we help?</h2>
      </div>
      <p id="contact-preview-note" className={styles.notice}>
        Prototype preview — this form does not send messages. To contact the
        firm, please call <a href={`tel:${firm.telephone}`}>{firm.phone}</a>.
      </p>
      <noscript>
        JavaScript is required to preview this form. Please telephone the firm
        to get in touch.
      </noscript>
      <form
        aria-label="Contact the firm"
        aria-describedby="contact-preview-note"
        onChange={() => setPreviewed(false)}
        onSubmit={(event) => {
          event.preventDefault();
          // Prototype only: native field validation runs before this event.
          // Never transmit, log, or persist the visitor's entered information.
          setPreviewed(true);
          window.requestAnimationFrame(() => feedback.current?.focus());
        }}
      >
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="contact-name">
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-phone">
              Telephone <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-subject">
              Subject <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              required
              maxLength={150}
            />
          </div>
          <div className={`${styles.field} ${styles.message}`}>
            <label htmlFor="contact-message">
              Your message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              maxLength={4000}
              rows={5}
              aria-describedby="contact-message-help"
            />
            <p id="contact-message-help" className={styles.help}>
              Please do not include confidential or sensitive information.
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" className="button" disabled={!hydrated}>
            Preview submission{" "}
            <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <span className={styles.help}>* Required fields</span>
        </div>
        {previewed && (
          <div
            ref={feedback}
            role="status"
            tabIndex={-1}
            className={styles.feedback}
          >
            Preview complete. Your message has not been sent or saved. To reach
            the firm, call <a href={`tel:${firm.telephone}`}>{firm.phone}</a> or
            contact an attorney through the{" "}
            <Link href="/attorneys">attorney directory</Link>.
          </div>
        )}
        <p className={styles.privacy}>
          Read our <Link href="/privacy">draft privacy policy</Link>.
        </p>
      </form>
    </div>
  );
}
