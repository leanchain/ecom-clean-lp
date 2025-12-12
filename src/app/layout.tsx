import { Figtree } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { NavigationProvider } from "@/components/navigation-provider";
import CTA from "@/components/sections/cta";
import { ThemeProvider } from "@/components/theme-provider";

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
    default: "Beseam - AI Media Studio",
    template: "%s | Beseam",
  },
  description:
    "AI Media Studio for AI Search Optimised Product Detail Pages. Create stunning product visuals with advanced AI technology.",
  keywords: [
    "AI Media Studio",
    "Product Photography",
    "AI Search Optimization",
    "Product Detail Pages",
    "E-commerce",
    "AI Technology",
    "Product Visuals",
    "Beseam",
  ],
  authors: [{ name: "Beseam" }],
  creator: "Beseam",
  publisher: "Beseam",
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
    title: "Beseam - AI Media Studio",
    description:
      "AI Media Studio for AI Search Optimised Product Detail Pages. Create stunning product visuals with advanced AI technology.",
    siteName: "Beseam",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beseam - AI Media Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beseam - AI Media Studio",
    description:
      "AI Media Studio for AI Search Optimised Product Detail Pages. Create stunning product visuals with advanced AI technology.",
    images: ["/og-image.jpg"],
    creator: "@Beseam",
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
          <NavigationProvider>
            <Navbar />
            <main className="">
              {children}
              <CTA />
            </main>
            <Footer />
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
