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
  variable: "--font-figtree",
  display: "optional",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Beseam — Store Health for Shopify",
    template: "%s | Beseam",
  },
  description:
    "Monitor Shopify discoverability, technical SEO and purchase-health signals in one evidence-backed workspace. See what changed and what to fix first.",
  authors: [{ name: "Beseam" }],
  creator: "Beseam",
  publisher: "Beseam",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com",
  ),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Beseam — Store Health for Shopify",
    description:
      "Know when your Shopify store loses visibility or the purchase experience degrades—and know what to fix first.",
    url: "/",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beseam Store Health for Shopify",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam — Store Health for Shopify",
    description:
      "One evidence-backed view of Shopify discoverability, purchase health and monitoring coverage.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={figtree.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <CookieConsentProvider>
            <AnalyticsScripts />
            <div className="flex min-h-screen flex-col bg-background">
              <BeseamNavbar />
              <main id="main-content" tabIndex={-1} className="flex-1">
                {children}
              </main>
              <BeseamFooter />
            </div>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
