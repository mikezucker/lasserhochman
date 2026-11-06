import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd, origin, canIndex } from "@/lib/seo";
import { firm } from "@/data/firm";
import "./globals.css";
const serif = localFont({
  src: [
    {
      path: "../../public/fonts/newsreader.woff2",
      style: "normal",
      weight: "200 800",
    },
    {
      path: "../../public/fonts/newsreader-italic.woff2",
      style: "italic",
      weight: "200 800",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({
  src: "../../public/fonts/manrope.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "200 800",
});
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Lasser Hochman | New Jersey Attorneys at Law",
    template: "%s | Lasser Hochman",
  },
  description:
    "Sophisticated counsel. Personal attention. Lasser Hochman is a full-service law firm in Roseland, New Jersey, established in 1954.",
  robots: { index: canIndex, follow: canIndex },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;try{t=localStorage.getItem('lh-theme')}catch(e){}document.documentElement.dataset.theme=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'})()`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "LegalService"],
            "@id": `${origin}/#firm`,
            name: firm.name,
            url: origin,
            telephone: firm.telephone,
            foundingDate: "1954",
            address: {
              "@type": "PostalAddress",
              streetAddress: firm.street,
              addressLocality: "Roseland",
              addressRegion: "NJ",
              postalCode: "07068",
              addressCountry: "US",
            },
            areaServed: { "@type": "State", name: "New Jersey" },
          }}
        />
      </body>
    </html>
  );
}
