import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7EFE4",
};

export const metadata: Metadata = {
  title: "KIRABAKI",
  description: "Your financial intelligence system. What’s happening with your money, why it matters, and what to do next.",
  applicationName: "KIRABAKI",
  keywords: ["financial intelligence", "money", "journey", "malaysia"],
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/kirabaki-192.png",
  }, 
  openGraph: {
    type: "website",
    url: "https://kirabaki.vercel.app",
    siteName: "KIRABAKI",
    title: "KIRABAKI",
    description: "What’s happening with your money, why it matters, and what to do next.",
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
    title: "KIRABAKI",
    description: "What’s happening with your money, why it matters, and what to do next.",
    images: "https://kirabaki.vercel.app/kirabaki-512.png",
  },
  appleWebApp: {
    title: "KIRABAKI",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
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
