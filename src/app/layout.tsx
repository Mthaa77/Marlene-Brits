import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "./mobile-fixes.css";
import "./premium-upgrades.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Marlene Brits Attorneys | Attorney, Conveyancer & Notary | Pretoria East",
  description:
    "Marlene Brits Attorneys is a distinguished Pretoria East legal practice providing personalised services in conveyancing, deceased estate administration, antenuptial contracts, wills & estate planning, family law, and notarial services. You are never just another client.",
  keywords: [
    "Marlene Brits Attorneys",
    "Pretoria attorney",
    "conveyancer Pretoria",
    "notary Pretoria",
    "deceased estate administration",
    "antenuptial contract",
    "will drafting",
    "estate planning",
    "family law Pretoria",
    "property transfer Pretoria",
    "Menlyn Maine attorney",
    "Pretoria East lawyer",
  ],
  authors: [{ name: "Marlene Brits Attorneys" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Marlene Brits Attorneys | Attorney, Conveyancer & Notary",
    description:
      "A distinguished Pretoria East legal practice founded on dedication, trust, and strong relationships. You are never just another client.",
    url: "https://mbritslaw.co.za",
    siteName: "Marlene Brits Attorneys",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marlene Brits Attorneys | Attorney, Conveyancer & Notary",
    description:
      "A distinguished Pretoria East legal practice. You are never just another client.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mbritslaw.co.za",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name: "Marlene Brits Attorneys",
              description:
                "A distinguished Pretoria East legal practice providing personalised services in conveyancing, deceased estate administration, antenuptial contracts, wills & estate planning, family law, and notarial services.",
              url: "https://mbritslaw.co.za",
              telephone: "+27766116965",
              email: "info@mbritslaw.co.za",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Spaces Menlyn Maine, Pegasus Building 1, 210 Amarand Avenue, Waterkloof Glen Ext. 2",
                addressLocality: "Pretoria",
                addressRegion: "Gauteng",
                postalCode: "0181",
                addressCountry: "ZA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -25.7845,
                longitude: 28.2739,
              },
              foundingDate: "2019",
              founder: {
                "@type": "Person",
                name: "Marlene Brits",
                jobTitle: "Attorney, Conveyancer & Notary",
              },
              areaServed: {
                "@type": "City",
                name: "Pretoria",
              },
              serviceType: [
                "Conveyancing",
                "Deceased Estate Administration",
                "Estate Planning",
                "Family Law",
                "Antenuptial Contracts",
                "Notarial Services",
                "Civil Litigation",
                "Debt Collection",
              ],
              priceRange: "$$",
              sameAs: [
                "https://facebook.com/MarleneBritsAttorneys",
                "https://instagram.com/marlenebritsattorneys",
                "https://linkedin.com/in/marlenebrits",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Attorney",
              name: "Marlene Brits",
              jobTitle: "Attorney, Conveyancer & Notary",
              worksFor: {
                "@type": "Organization",
                name: "Marlene Brits Attorneys",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Spaces Menlyn Maine, Pegasus Building 1, 210 Amarand Avenue, Waterkloof Glen Ext. 2",
                addressLocality: "Pretoria",
                addressRegion: "Gauteng",
                postalCode: "0181",
                addressCountry: "ZA",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
