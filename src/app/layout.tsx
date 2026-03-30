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
    default:
      "Beseam — AI Commerce Readiness Platform for Shopify",
    template: "%s | Beseam",
  },
  description:
    "Beseam audits how AI shopping engines read your product pages, generates fixes for what they get wrong, and verifies improvement. Make ChatGPT, Gemini, and Perplexity recommend your store.",
  keywords: [
    "Beseam",
    "AI commerce readiness",
    "AI shopping optimization",
    "ChatGPT product recommendations",
    "Gemini shopping",
    "Perplexity shopping",
    "PDP audit",
    "Shopify page fixes",
    "AI-generated fixes",
    "Shopify publish",
    "AI readiness score",
    "structured data",
    "Shopify structured data",
    "ecommerce AI",
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
    title:
      "Beseam — AI Commerce Readiness Platform for Shopify",
    description:
      "Audit how AI engines read your products. Fix what they get wrong. Verify AI now recommends your store.",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beseam — AI Commerce Readiness Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Beseam — AI Commerce Readiness Platform for Shopify",
    description:
      "Audit how AI engines read your products. Fix what they get wrong. Verify AI now recommends your store.",
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
