import { Figtree } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import BeseamNavbar from "@/components/beseam/navbar";
import BeseamFooter from "@/components/beseam/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-figtree",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Beseam — Prepare Your Shopify Store for AI Search & LLMs",
    template: "%s | Beseam",
  },
  description:
    "ChatGPT, Perplexity, and Gemini are the new shopping search. Beseam automatically fixes your schema markup, geo-tags, and metadata so your entire Shopify catalog is prepared for AI.",
  keywords: [
    "Beseam",
    "AI search optimization",
    "LLM product discovery",
    "Shopify AI readiness",
    "Structured data Shopify",
    "ChatGPT shopping",
    "Perplexity product search",
    "Gemini shopping",
    "Schema markup",
    "Product structured data",
    "AI discoverability",
    "Shopify SEO",
    "AEO Shopify",
    "AI search engine optimization",
  ],
  authors: [{ name: "Beseam" }],
  creator: "Beseam",
  publisher: "Beseam",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com",
  ),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "Beseam — Prepare Your Shopify Store for AI Search & LLMs",
    description:
      "ChatGPT, Perplexity, and Gemini are the new shopping search. Beseam fixes your schema, geo-tags, and metadata so your catalog is prepared for AI.",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beseam — Prepare Your Shopify Store for AI Search & LLMs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam — Prepare Your Shopify Store for AI Search & LLMs",
    description:
      "ChatGPT, Perplexity, and Gemini are the new shopping search. Beseam fixes your schema, geo-tags, and metadata so your catalog is prepared for AI.",
    images: ["/og-image.png"],
    creator: "@Beseam",
    site: "@Beseam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <CookieConsentProvider>
            <AnalyticsScripts />
            <div className="flex min-h-screen flex-col bg-background">
              <BeseamNavbar />
              <main className="flex-1">{children}</main>
              <BeseamFooter />
            </div>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
