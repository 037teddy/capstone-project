import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PreferencesProvider } from "@/components/PreferencesProvider";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capstone Project",
  description: "Frontend AI engineering capstone project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PreferencesProvider>
          <SiteHeader />
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
