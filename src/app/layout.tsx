import { Faustina, Figtree } from "next/font/google";
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

// Display face. Replaces Lora: sharper, sturdier, and not a training default,
// while keeping the serif silhouette the page is built around.
// Only 600/700 are loaded on purpose: display markup asks for `font-normal`,
// and 400 Faustina is too light to carry a headline, so the closest-match rule
// resolves it to 600 without touching every call site.
const faustina = Faustina({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-faustina",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Beseam - Product visibility monitoring for ecommerce",
    template: "%s | Beseam",
  },
  description:
    "Beseam monitors each product across product pages, shopping feeds, search results, and product recommendations, then alerts your team when visibility changes.",
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
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Beseam - Product visibility monitoring for ecommerce",
    description:
      "Know when a valuable product disappears, what changed, and whether the fix restored visibility.",
    url: "/",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beseam product visibility monitoring for ecommerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam - Product visibility monitoring for ecommerce",
    description:
      "Know when a valuable product disappears, what changed, and whether the fix restored visibility.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} ${faustina.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <CookieConsentProvider>
            <AnalyticsScripts />
            <div
              data-theme-scope="public"
              className="flex min-h-screen flex-col bg-background"
            >
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
