import { Space_Grotesk } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";

import { TRPCReactProvider } from "@/trpc/react";

import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { InstallPromptProvider } from "@/contexts/install-prompt-context";
import { EnvProvider } from "@/contexts/env";

import { AppSidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";

import { env } from "@/env";

import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Dental.AI",
  description: "AI-powered dental analysis and workflow automation",
  appleWebApp: {
    title: "Dental.AI",
    statusBarStyle: "black",
  },
  manifest: "/manifest.json",
  metadataBase: new URL(env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    title: "Dental.AI",
    description: "AI-powered dental analysis and workflow automation",
    url: "https://dental.ai",
    siteName: "Dental.AI",
    images: [
      {
        url: "https://dental.ai/og.png",
        width: 1200,
        height: 630,
        alt: "Dental.AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Analytics />

        <TRPCReactProvider>
          <EnvProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <InstallPromptProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset className="flex h-dvh flex-col">
                    <Navbar />
                    {children}
                  </SidebarInset>
                </SidebarProvider>
              </InstallPromptProvider>
            </ThemeProvider>
          </EnvProvider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
