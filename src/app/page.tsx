import { FeaturedAttorneys } from "@/components/home/featured-attorneys";
import { HeroVideo } from "@/components/home/hero-video";
import heroStyles from "@/components/home/cinematic-hero.module.css";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { metadata as buildMetadata } from "@/lib/seo";
import { practices } from "@/data/practices";
import { attorneys } from "@/data/attorneys";
import { TextLink, ButtonLink } from "@/components/ui/link-arrow";
import { Reveal } from "@/components/ui/reveal";
import { ContactBand } from "@/components/home/contact-band";
export const metadata = buildMetadata(
  "New Jersey Attorneys at Law",
  "Established in 1954, Lasser Hochman provides sophisticated legal representation and personal attention to businesses, institutions, and individuals in New Jersey.",
  "/",
);
export default function Home() {
  return (
    <>
      <section
        className={`hero ${heroStyles.hero}`}
        aria-labelledby="hero-heading"
      >
        <div className={heroStyles.media}>
          <HeroVideo />
        </div>
        <div className={`hero-copy ${heroStyles.copy}`}>
          <p className="eyebrow hero-kicker">
            <span />
            Serving New Jersey since 1954
          </p>
          <h1 id="hero-heading">
            Sophisticated
            <br />
            Counsel.
            <br />
            <em>Personal Attention.</em>
          </h1>
          <p className="hero-description">
            Lasser Hochman provides sophisticated legal representation to
            businesses, institutions, and individuals throughout New Jersey.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/practice">Explore Our Practice Areas</ButtonLink>
            <TextLink href="/attorneys">Meet Our Attorneys</TextLink>
          </div>
        </div>
        <p className={heroStyles.location}>
          New Jersey waterfront
          <span className={heroStyles.credit}>
            Free stock footage by <a href="https://www.videezy.com">Videezy</a>
          </span>
        </p>
        <div className={`hero-baseline ${heroStyles.baseline}`}>
          <span>Rooted in New Jersey. Focused on you.</span>
          <a href="#our-firm" aria-label="Discover our firm">
            <span>Discover our firm</span>
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section id="our-firm" className="intro section wrap">
        <Reveal className="section-side">
          <p className="eyebrow">The Lasser Hochman approach</p>
          <span className="small-rule" />
        </Reveal>
        <Reveal className="intro-copy">
          <h2>
            The perspective of a full-service firm.
            <br />
            <em>The attention of a close partnership.</em>
          </h2>
          <div className="intro-bottom">
            <p>
              Since 1954, we have combined the skills and professionalism of a
              large firm with the personal service of a smaller one. It is an
              approach that has kept many clients with us for generations.
            </p>
            <TextLink href="/about">Get to know our firm</TextLink>
          </div>
        </Reveal>
      </section>
      <section className="practice-section section">
        <div className="wrap practice-grid">
          <Reveal className="practice-intro">
            <p className="eyebrow">Our practice</p>
            <h2>
              Experience that
              <br />
              connects the details.
            </h2>
            <p>
              Business decisions. Property matters. Personal plans. Our practice
              brings a broad perspective to the matters that shape your future.
            </p>
            <TextLink href="/practice">Explore our capabilities</TextLink>
            <div className="practice-aside">
              <span className="small-rule" />
              <span>
                A full-service firm.
                <br />A focused commitment.
              </span>
            </div>
          </Reveal>
          <div className="practice-list">
            {practices.map((p, i) => (
              <Reveal key={p.slug}>
                <Link href={`/practice/${p.slug}`} className="practice-row">
                  <span className="practice-number">0{i + 1}</span>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.short}</p>
                  </div>
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap attorneys-preview">
        <Reveal className="section-title">
          <div>
            <p className="eyebrow">Our people</p>
            <h2>Experience is personal.</h2>
          </div>
          <div>
            <p>
              Meet the people behind the counsel.
              <br />
              Thoughtful professionals. A shared commitment.
            </p>
            <TextLink href="/attorneys">Meet all of our attorneys</TextLink>
          </div>
        </Reveal>
        <FeaturedAttorneys
          roster={attorneys.map(({ slug, name, image, position }) => ({
            slug,
            name,
            image,
            position,
          }))}
        />
      </section>
      <section className="history-section">
        <div className="wrap history-grid">
          <Reveal className="history-year">
            <span className="eyebrow">Our foundation</span>
            <span className="year">
              1954<span className="year-dot">.</span>
            </span>
            <span className="history-footnote">
              A lasting commitment to personal service.
            </span>
          </Reveal>
          <Reveal className="history-copy">
            <p className="eyebrow">A history of looking forward</p>
            <h2>
              Built on relationships.
              <br />
              <em>Made to endure.</em>
            </h2>
            <p>
              In 1954, Aaron Lasser and Lawrence Lasser began practicing
              together as Lasser and Lasser. That foundation continues in a firm
              committed to its clients, its craft, and the next chapter.
            </p>
            <TextLink href="/about" light>
              Discover our history
            </TextLink>
          </Reveal>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
