import { PageHeading } from "@/components/ui/page-heading";
import { metadata as buildMetadata } from "@/lib/seo";
import { firm } from "@/data/firm";
export const metadata = buildMetadata(
  "Privacy Policy — Draft for Review",
  "Draft privacy policy for the Lasser Hochman website prototype. This policy requires the firm’s legal review and approval before launch.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageHeading
        eyebrow="Website information"
        title="Privacy policy."
        description="Draft for legal review."
        path="/privacy"
      />
      <section className="wrap content-grid">
        <div>
          <p className="eyebrow">Prototype / November 2026</p>
        </div>
        <div className="prose">
          <div className="policy-label">
            Draft — this policy has not been approved by the firm. It must be
            reviewed and finalized before public launch.
          </div>
          <h2>About this prototype</h2>
          <p>
            This prototype provides information about Lasser Hochman and its
            attorneys. Its contact page includes a prototype form that validates
            entries locally but does not send or save them. The application does
            not include accounts, advertising scripts, or analytics.
          </p>
          <h3>Technical information</h3>
          <p>
            A hosting provider may process technical information necessary to
            deliver and secure a website, such as IP addresses, requested pages,
            browser information, and access times. The production hosting
            configuration, retention periods, and any service providers must be
            confirmed before this policy is approved.
          </p>
          <h3>Contacting the firm</h3>
          <p>
            Telephone and email links connect visitors to their own phone or
            email applications. Directions links open Google Maps. Those
            services operate under their own policies. Contact the firm by
            telephone at{" "}
            <a className="text-link" href={`tel:${firm.telephone}`}>
              {firm.phone}
            </a>{" "}
            with questions about this website.
          </p>
          <h3>Items for legal review</h3>
          <p>
            The firm should confirm its privacy contact, data practices,
            retention and deletion procedures, applicable visitor rights,
            hosting arrangements, and any required attorney advertising or
            website disclaimers. This draft does not establish an approved
            privacy policy or describe legal rights in any jurisdiction.
          </p>
        </div>
      </section>
    </>
  );
}
