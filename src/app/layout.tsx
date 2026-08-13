import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Wardrobe Configurator",
  description: "3D object manipulator with dynamic price calculator",
  openGraph: {
    title: "Wardrobe Configurator",
    description: "3D object manipulator with dynamic price calculator",
    url: "https://vercel.app",
    siteName: "Wardrobe Configurator",
    images: [
      {
        url: "https://vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Wardrobe Configurator 3D Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
