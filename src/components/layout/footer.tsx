import Link from "next/link";
import { firm } from "@/data/firm";
import { practices } from "@/data/practices";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="wordmark footer-brand">
            <span>
              LASSER HOCHMAN<span className="brand-dot">.</span>
            </span>
            <small>ATTORNEYS AT LAW</small>
          </Link>
          <p>
            Serving New Jersey.
            <br />
            Building relationships since 1954.
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Our practice</h2>
          {practices.map((p) => (
            <Link key={p.slug} href={`/practice/${p.slug}`}>
              {p.name}
            </Link>
          ))}
        </div>
        <div>
          <h2 className="eyebrow">The firm</h2>
          <Link href="/about">Our Firm</Link>
          <Link href="/attorneys">Our Attorneys</Link>
          <Link href="/contact">Contact & Directions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <div>
          <h2 className="eyebrow">Roseland, New Jersey</h2>
          <address>
            {firm.street}
            <br />
            {firm.city}
          </address>
          <a href={`tel:${firm.telephone}`}>{firm.phone}</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} Lasser Hochman, LLC. All rights reserved.
        </span>
        <span>Established 1954</span>
      </div>
    </footer>
  );
}
