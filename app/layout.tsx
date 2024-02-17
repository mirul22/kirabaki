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
  manifest: "/manifest.json",    
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Mirul22_" />
        <meta name="twitter:creator" content="@Mirul22_" />
        <meta name="twitter:title" content="Kirabaki - Your Simple Budget Companion" />
        <meta name="twitter:description" content="Unleash financial freedom with Kirabaki, your simple budget companion." />
        <meta name="twitter:image" content="https://kirabaki.vercel.app/kirabaki-512.png" />

        {/* PWA manifest link */}
        <link rel="manifest" href="/manifest.json" />

        {/* Meta tag for viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Add any other head elements you might need */}
      </Head>

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
