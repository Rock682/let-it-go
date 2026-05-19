import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { CookieConsent } from "@/components/layout/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://rupeeorbit.in"),
  title: {
    default: "RupeeOrbit India | Compare Cards, Loans, Insurance & Finance Tools",
    template: "%s | RupeeOrbit India"
  },
  description:
    "RupeeOrbit helps Indian users compare credit cards, loans, insurance, demat accounts and finance apps with transparent reviews and calculators.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "RupeeOrbit India",
    description: "Compare India-focused finance offers with expert-backed guides.",
    url: "https://rupeeorbit.in",
    siteName: "RupeeOrbit India",
    locale: "en_IN",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>
        <ThemeScript />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
