import { Figtree } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { NavigationProvider } from "@/components/navigation-provider";
import CTA from "@/components/sections/cta";
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
    default: "Beseam - Guardrails for Every PDP Change",
    template: "%s | Beseam",
  },
  description:
    "Beseam is an AI-native PDP & revenue ops platform. Upgrade product pages for discovery + conversion, then prevent regressions with monitoring, impact explanation, and guided rollback.",
  keywords: [
    "Beseam",
    "E-commerce",
    "Revenue ops",
    "PDP upgrades",
    "PDP monitoring",
    "PDP guardrails",
    "Safe deploy",
    "Rollback",
    "Change intelligence",
    "Discoverability",
    "Conversion",
    "AI Search Optimization",
    "AI Visibility",
    "Product Detail Pages",
    "PDP Audit",
    "SEO",
    "GEO",
    "AEO",
    "AIO",
    "CRO",
    "E-E-A-T",
    "EEAT",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Conversion Rate Optimization",
    "Google Shopping",
    "Google Merchant",
    "Analytics",
    "AMP",
    "UCP",
    "Agentic commerce readiness",
    "Compliance",
    "Audit Layers",
    "Trust Scoring",
    "technical SEO",
    "Schema",
    "Technical Meta",
    "AI Readiness",
    "Personalization",
    "AI Content Generation",
    "AI Product Descriptions",
    "AI Product Images",
    "AI Product Videos",
    "AI Product Photography",
    "AI Product Reviews",
    "AI Product Recommendations",
    "AI Product Personalization",
  ],
  authors: [{ name: "Beseam" }],
  creator: "Beseam",
  publisher: "Beseam",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com"),
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
    title: "Beseam - Guardrails for Every PDP Change",
    description:
      "Upgrade PDPs for discovery + conversion, then protect revenue with monitoring, impact explanation, and rollback.",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beseam - Guardrails for Every PDP Change",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam - Guardrails for Every PDP Change",
    description:
      "Upgrade PDPs for discovery + conversion, then protect revenue with monitoring, impact explanation, and rollback.",
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
            <NavigationProvider>
              <div className="flex h-screen bg-background overflow-hidden">
                <div className="flex flex-1 flex-col min-w-0 min-h-0 relative">
                  {/* Header - In the flow */}
                  <Navbar />

                  {/* Page content */}
                  <main className="flex-1 overflow-auto min-h-0 scrollbar-thin">
                    <div className="w-full min-h-0 h-full relative">
                      {children}
                      <CTA />
                      <Footer />
                    </div>
                  </main>
                </div>
              </div>
            </NavigationProvider>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
