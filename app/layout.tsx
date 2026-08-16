import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KIRABAKI",
  description: "Your financial intelligence system. What’s happening with your money, why it matters, and what to do next.",
  applicationName: "KIRABAKI",
  keywords: ["financial intelligence", "money", "journey", "malaysia"],
  viewport: "width=device-width, initial-scale=1",
  manifest: "/manifest.json",   
  openGraph: {
    type: "website",
    url: "https://kirabaki.vercel.app",
    siteName: "Kirabaki",
    title: "Kirabaki - Your Simple Budget Companion",
    description: "Unleash financial freedom with Kirabaki, your simple budget companion.",
    images: [
      {
        url: "https://kirabaki.vercel.app/kirabaki-512.png",
        width: 512,
        height: 512,
        alt: "Kirabaki",
      },
    ],
  }, 
  twitter: { 
    card: "summary_large_image", 
    site: "@Mirul22_", 
    creator: "@Mirul22_", 
    title: "Kirabaki - Your Simple Budget Companion",
    description: "Unleash financial freedom with Kirabaki, your simple budget companion.",
    images: "https://kirabaki.vercel.app/kirabaki-512.png",
  },
  appleWebApp: {
    title: "Kirabaki",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        inter.className,
        "bg-kb-bone text-kb-ink w-screen min-h-screen overflow-x-hidden mx-auto",
      )}>
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster richColors  />
      </body>
    </html>
  );
}
