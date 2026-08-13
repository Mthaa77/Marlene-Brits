import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import "./motion-performance.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const signature = Allura({
  variable: "--font-signature",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mbritslaw.co.za"),
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
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Marlene Brits Attorneys | Attorney, Conveyancer & Notary",
    description:
      "A distinguished Pretoria East legal practice founded on dedication, trust, and strong relationships. You are never just another client.",
    images: [
      {
        url: "/uploads/main-1612194838.jpg",
        width: 1200,
        height: 800,
        alt: "Pegasus Building 1 at Menlyn Maine, home of Marlene Brits Attorneys",
      },
    ],
    url: "https://mbritslaw.co.za",
    siteName: "Marlene Brits Attorneys",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marlene Brits Attorneys | Attorney, Conveyancer & Notary",
    description: "A distinguished Pretoria East legal practice. You are never just another client.",
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
  alternates: { canonical: "https://mbritslaw.co.za" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#07111f",
};

const legalServiceSchema = {
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
  foundingDate: "2019",
  founder: {
    "@type": "Person",
    name: "Marlene Brits",
    jobTitle: "Attorney, Conveyancer & Notary",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/uploads/main-1612194838.jpg" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${signature.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
