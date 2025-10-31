import Navbar from "@/components/global/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Footer from "@/components/global/footer";
import { LanguageProvider } from "@/context/languageContext";
import { seoConfig, structuredData } from "@/lib/seo";
import Script from "next/script";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: seoConfig.fa.title,
  description: seoConfig.fa.description,
  keywords: seoConfig.fa.keywords,
  authors: [{ name: seoConfig.fa.author }],
  creator: seoConfig.fa.author,
  publisher: seoConfig.fa.siteName,
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
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: ["en_US", "ar_SA"],
    url: "https://psycho.tomakdigitalagency.ir/",
    title: seoConfig.fa.ogTitle,
    description: seoConfig.fa.ogDescription,
    siteName: seoConfig.fa.siteName,
    images: [
      {
        url: "https://psycho.tomakdigitalagency.ir//og-image.jpg",
        width: 1200,
        height: 630,
        alt: seoConfig.fa.ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.fa.ogTitle,
    description: seoConfig.fa.ogDescription,
    images: ["https://psycho.tomakdigitalagency.ir//og-image.jpg"],
    creator: "@psycho",
  },
  alternates: {
    canonical: "https://psycho.tomakdigitalagency.ir/",
    languages: {
      "fa-IR": "https://psycho.tomakdigitalagency.ir/",
      "en-US": "https://psycho.tomakdigitalagency.ir//en",
      "ar-SA": "https://psycho.tomakdigitalagency.ir//ar",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <head>
        <meta name="theme-color" content="#6366f1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://psycho.tomakdigitalagency.ir/" />
        <link rel="alternate" hrefLang="fa" href="https://psycho.tomakdigitalagency.ir/" />
        <link rel="alternate" hrefLang="en" href="https://psycho.tomakdigitalagency.ir//en" />
        <link rel="alternate" hrefLang="ar" href="https://psycho.tomakdigitalagency.ir//ar" />
        <link rel="alternate" hrefLang="x-default" href="https://psycho.tomakdigitalagency.ir/" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={vazir.className}>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization),
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
          }}
        />
        <Script
          id="schema-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.softwareApplication),
          }}
        />
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.faqPage),
          }}
        />
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.breadcrumb),
          }}
        />
        <Script
          id="schema-product"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.product),
          }}
        />
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
