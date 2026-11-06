"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";

export type FeaturedAttorney = {
  slug: string;
  name: string;
  image: string;
  position: string;
};

export function FeaturedAttorneys({ roster }: { roster: FeaturedAttorney[] }) {
  // Keep server output and first hydration identical, then select from the
  // entire roster in the browser so static hosting never freezes the choice.
  const [people, setPeople] = useState(() =>
    ["zucker", "kipnees", "shore"]
      .map((slug) => roster.find((person) => person.slug === slug))
      .filter((person): person is FeaturedAttorney => person !== undefined),
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const shuffled = [...roster];
      // Fisher–Yates gives every firm member the same chance, without repeats.
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setPeople(shuffled.slice(0, 3));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [roster]);

  return (
    <div className="featured-attorneys">
      {people.map((a) => (
        <Reveal key={a.slug}>
          <Link href={`/${a.slug}`} className="attorney-preview">
            <div className="portrait">
              <Image
                src={a.image}
                alt={a.name}
                fill
                sizes="(max-width: 600px) 85vw, 30vw"
              />
            </div>
            <div className="attorney-caption">
              <div>
                <h3>{a.name}</h3>
                <p>{a.position}</p>
              </div>
              <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
