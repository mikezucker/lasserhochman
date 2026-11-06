import propertyTax from "./real-property-tax-appeals.json";
import realEstate from "./real-estate.json";
import litigation from "./litigation.json";
import corporate from "./corporate-law.json";
import estates from "./estate-planning-and-administration.json";
import taxation from "./taxation.json";

export type PracticeSlug =
  | "real-property-tax-appeals"
  | "real-estate"
  | "litigation"
  | "corporate-law"
  | "estate-planning-and-administration"
  | "taxation";

type Explanation = { title: string; text: string };
export type PracticeGuide = {
  introduction: string[];
  concepts: Explanation[];
  services: Explanation[];
  scenarios: Explanation[];
  process: Explanation[];
  faqs: { question: string; answer: string }[];
  related: string[];
  sources: { label: string; url: string }[];
  reviewStatus: string;
};

// Each guide is maintained independently. All new legal copy remains a review draft.
export const practiceGuides: Record<PracticeSlug, PracticeGuide> = {
  "real-property-tax-appeals": propertyTax,
  "real-estate": realEstate,
  litigation: litigation,
  "corporate-law": corporate,
  "estate-planning-and-administration": estates,
  taxation: taxation,
};
