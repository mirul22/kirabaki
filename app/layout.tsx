import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kirabaki",
  description: "Kirabaki is a simple budget companion that helps you unleash financial freedom.",
  applicationName: "Kirabaki",
  keywords: ["budget", "companion", "finance", "money", "management"],
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
        "bg-neutral-950 text-slate-100 w-screen min-h-screen overflow-x-hidden mx-auto",
      )}>
        {children}
        <Toaster richColors  />
      </body>
    </html>
  );
}
