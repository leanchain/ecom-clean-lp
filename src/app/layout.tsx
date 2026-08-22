import { Figtree, Lora } from "next/font/google";

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

// Established display face for marketing headings and serif accents.
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-lora",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default:
      "Beseam - AI shopping visibility & behavior: fixes and proof for ecommerce",
    template: "%s | Beseam",
  },
  description:
    "Run real buying questions against AI assistants, see which products were recommended, inspect the product evidence behind the answer, and test the same question again after a change.",
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
    title: "Beseam - See why AI picked someone else",
    description:
      "Run a real buying question, see which products AI recommended, inspect the product evidence you control, and test the same question again after a change.",
    url: "/",
    siteName: "Beseam",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beseam AI shopping visibility & behavior: fixes and proof for ecommerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam - See why AI picked someone else",
    description:
      "Run a real buying question, see which products AI recommended, inspect the product evidence you control, and test the same question again after a change.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} ${lora.variable} antialiased`}>
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
