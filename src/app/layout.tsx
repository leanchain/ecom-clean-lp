import { Figtree } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import BeseamFooter from "@/components/beseam/footer";
import BeseamNavbar from "@/components/beseam/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "optional", preload: true });

export const metadata: Metadata = {
  title: { default: "Beseam - Autonomous revenue intelligence for commerce", template: "%s | Beseam" },
  description: "Beseam is a self-improving revenue agent that finds the revenue leaks your commerce stack cannot see, recommends what to change, and learns from the verified outcome.",
  authors: [{ name: "Beseam" }],
  creator: "Beseam",
  publisher: "Beseam",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://beseam.com"),
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon/favicon.ico", sizes: "48x48" }, { url: "/favicon/favicon.svg", type: "image/svg+xml" }, { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" }], apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }] },
  openGraph: { title: "Beseam - Autonomous revenue intelligence for commerce", description: "A self-improving revenue agent that finds the revenue leaks your stack cannot see, recommends what to change, and learns from the outcome.", url: "/", siteName: "Beseam", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Beseam autonomous revenue intelligence for commerce" }] },
  twitter: { card: "summary_large_image", title: "Beseam - Autonomous revenue intelligence for commerce", description: "A self-improving revenue agent that finds the revenue leaks your stack cannot see and learns from the outcome.", images: ["/og-image.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${figtree.variable} antialiased`}><ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange><CookieConsentProvider><AnalyticsScripts /><div data-theme-scope="public" className="flex min-h-screen flex-col bg-background"><BeseamNavbar /><main id="main-content" tabIndex={-1} className="flex-1">{children}</main><BeseamFooter /></div></CookieConsentProvider></ThemeProvider></body></html>;
}
