import type { Metadata } from "next";
import { Providers } from "@/components/layout/Providers";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Client Guillotine | Execute Unprofitable Clients",
    template: "%s | The Client Guillotine",
  },
  description:
    "AI-powered platform for marketing agencies to identify unprofitable clients, analyze team drain, and execute data-driven client decisions. Brutal business intelligence for agency owners.",
  keywords: [
    "client profitability",
    "agency management",
    "client analysis",
    "toxic clients",
    "agency tools",
    "SaaS",
    "client guillotine",
  ],
  openGraph: {
    title: "The Client Guillotine | Execute Unprofitable Clients",
    description:
      "AI-powered platform that reveals which clients are draining your agency's profits, time, and team morale.",
    type: "website",
    siteName: "The Client Guillotine",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Client Guillotine",
    description:
      "AI-powered client profitability analysis for agencies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-noir-950 text-noir-950 dark:text-noir-100">
        <ThemeProvider>
          <I18nProvider>
            <Providers>{children}</Providers>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
