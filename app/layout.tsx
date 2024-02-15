import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kirabaki",
  description: "Kirabaki is an smart budget companion that helps you unleash financial freedom.",
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
        "bg-neutral-950 text-slate-100 w-screen h-screen overflow-hidden max-w-screen-sm mx-auto",
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
