import { Figtree } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import BeseamFooter from "@/components/beseam/footer";
import BeseamNavbar from "@/components/beseam/navbar";
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
    default: "Beseam — Free Shopify AI Visibility Scan",
    template: "%s | Beseam",
  },
  description:
    "Paste one Shopify product page and see what ChatGPT, Google AI Mode, and Perplexity can actually understand — plus the first fix worth making.",
  keywords: [
    "Beseam",
    "Shopify AI visibility scan",
    "Shopify product page audit",
    "ChatGPT shopping visibility",
    "Google AI shopping readiness",
    "Perplexity product visibility",
    "Shopify structured data audit",
    "product page AI scan",
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
    title: "Beseam — Free Shopify AI Visibility Scan",
    description:
      "Run a free scan on one Shopify product page and see what AI shoppers can actually understand, trust, and recommend.",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beseam — Free Shopify AI Visibility Scan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam — Free Shopify AI Visibility Scan",
    description:
      "Paste one Shopify product page and see what AI shoppers can actually understand — plus the first fix worth making.",
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
