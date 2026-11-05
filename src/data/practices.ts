export type Practice = {
  slug: string;
  name: string;
  short: string;
  description: string;
  paragraphs: string[];
  services: string[];
  attorneys: string[];
};
export const practices: Practice[] = [
  {
    slug: "real-property-tax-appeals",
    name: "Real Property Tax Appeals",
    short: "A longstanding focus of our New Jersey practice.",
    description:
      "Real property tax appeals are a longstanding focus of Lasser Hochman’s New Jersey commercial practice.",
    paragraphs: [
      "Real property tax appeals have been a special emphasis of the firm’s commercial practice since its inception. Our work in this area sits alongside our real estate practice, which includes local and state tax issues.",
      "Richard C. Stewart’s practice includes real property tax appeals, real estate law, land use law, and commercial transactions. Contact the firm to discuss your property tax matter and the representation it may require.",
    ],
    services: [
      "Real property tax appeals",
      "Local and state real estate tax issues",
    ],
    attorneys: ["stewart"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    short: "From acquisition to the next opportunity.",
    description:
      "Legal representation for property acquisition, disposition, leasing, financing, zoning, and land use matters.",
    paragraphs: [
      "Real estate is central to the firm’s commercial practice. Lasser Hochman represents owners, builders, developers, operators, managers, and financial institutions in a broad range of property matters.",
      "Our attorneys advise on acquisitions and dispositions, commercial leases, financing, and land use. The firm’s history also includes work for banks, life insurance companies, real estate investment trusts, and pension funds on foreclosures, workouts, and property dispositions.",
    ],
    services: [
      "Property acquisition and disposition",
      "Leasing",
      "Financing",
      "Zoning and land use",
      "Local and state tax issues",
    ],
    attorneys: [
      "zucker",
      "stewart",
      "kipnees",
      "konzelman",
      "bibergal",
      "shore",
      "brown",
      "sprouls",
      "agins",
    ],
  },
  {
    slug: "litigation",
    name: "Litigation Matters",
    short: "Experienced representation when disputes arise.",
    description:
      "Trials, appeals, and litigation in commercial, foreclosure, employment, bankruptcy, and environmental matters.",
    paragraphs: [
      "The firm conducts an active litigation practice encompassing commercial, employment, bankruptcy, and environmental matters. Our practice also includes trials and appeals and foreclosure matters.",
      "Our attorneys’ individual areas of focus include complex commercial business litigation, real property litigation, business disputes, and creditors’ rights in bankruptcy and insolvency proceedings. The firm represents businesses, institutions, and individuals.",
    ],
    services: [
      "Trials and appeals",
      "Commercial litigation",
      "Foreclosure",
      "Employment",
      "Bankruptcy",
      "Environmental matters",
    ],
    attorneys: ["guryan", "zucker", "snyder"],
  },
  {
    slug: "corporate-law",
    name: "Corporate Law",
    short: "Counsel for the business of moving forward.",
    description:
      "Corporate and business law, commercial and banking transactions, employment law, and bankruptcy representation.",
    paragraphs: [
      "Lasser Hochman’s corporate practice includes corporate and business law and commercial and banking transactions. The firm serves corporations, small businesses, and institutional clients.",
      "The practice covers matters involving corporations, partnerships, and limited liability companies, as well as employment law and bankruptcy. Business matters may also intersect with the firm’s real estate, litigation, and taxation practices.",
    ],
    services: [
      "Corporate and business law",
      "Commercial and banking transactions",
      "Employment law",
      "Bankruptcy",
      "Corporations, partnerships, and limited liability companies",
    ],
    attorneys: ["silver"],
  },
  {
    slug: "estate-planning-and-administration",
    name: "Estate Planning and Administration",
    short: "Thoughtful planning. Careful administration.",
    description:
      "Wills, trusts, estates, and probate services from Lasser Hochman in Roseland, New Jersey.",
    paragraphs: [
      "The firm’s estate practice includes wills, trusts, estates, and probate. Estate planning and administration form part of the firm’s representation of individuals alongside its business and taxation practices.",
      "David Silver’s practice includes estate planning and administration and taxation. Maryjane D. Cowell focuses on estate administration. Contact the firm to discuss planning needs or the administration of an estate.",
    ],
    services: [
      "Wills",
      "Trusts and estates",
      "Estate administration",
      "Probate",
    ],
    attorneys: ["silver", "cowell"],
  },
  {
    slug: "taxation",
    name: "Taxation",
    short: "Perspective on federal and state tax matters.",
    description:
      "Federal and state taxation counsel as part of Lasser Hochman’s business and estate planning practice.",
    paragraphs: [
      "Lasser Hochman’s taxation practice addresses federal and state matters. Taxation is one of the firm’s established practice areas, alongside corporate law, real estate, and estate planning and administration.",
      "David Silver practices in business, estate planning and administration, and taxation. His education includes an LL.M. in Taxation from New York University. For property-related tax matters, the firm also maintains a dedicated real property tax appeals practice.",
    ],
    services: ["Federal taxation", "State taxation"],
    attorneys: ["silver"],
  },
];
