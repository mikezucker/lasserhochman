import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { attorneys } from "@/data/attorneys";
import { PageHeading } from "@/components/ui/page-heading";
import { ContactBand } from "@/components/home/contact-band";
import { metadata as buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata(
  "Our Attorneys",
  "Meet the members, associates, and of counsel attorneys of Lasser Hochman in Roseland, New Jersey. View professional backgrounds and practice areas.",
  "/attorneys",
);
export default function Attorneys() {
  return (
    <>
      <PageHeading
        eyebrow="Our people"
        title="Experience is personal."
        description="A team of thoughtful professionals, connected by a shared commitment to our clients."
        path="/attorneys"
      />
      <div className="wrap directory">
        {[
          { position: "Member", title: "Members of the Firm" },
          { position: "Associate", title: "Associates" },
          { position: "Of Counsel", title: "Of Counsel" },
        ].map((group) => (
          <section className="directory-group" key={group.position}>
            <div className="directory-heading">
              <h2>{group.title}</h2>
              <span>
                {String(
                  attorneys.filter((a) => a.position === group.position).length,
                ).padStart(2, "0")}
              </span>
            </div>
            <div className="attorney-grid">
              {attorneys
                .filter((a) => a.position === group.position)
                .map((a) => (
                  <Link
                    key={a.slug}
                    href={`/${a.slug}`}
                    className="attorney-preview"
                  >
                    <div className="portrait">
                      <Image
                        src={a.image}
                        alt={a.name}
                        fill
                        sizes="(max-width: 700px) 44vw, (max-width: 1150px) 28vw, 21vw"
                      />
                    </div>
                    <div className="attorney-caption">
                      <div>
                        <h3>{a.name}</h3>
                        <p>{a.position}</p>
                      </div>
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
      <ContactBand />
    </>
  );
}
