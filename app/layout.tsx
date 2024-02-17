import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kirabaki",
  description: "Kirabaki is a smart budget companion that helps you unleash financial freedom.",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body className={cn(
        inter.className,
        "bg-neutral-950 text-slate-100 w-screen h-screen overflow-x-hidden mx-auto",
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
