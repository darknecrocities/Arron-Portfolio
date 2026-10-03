import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arronparejas.dev"),
  title: "Arron Kian Parejas | AI Engineer · Systems · Community Leader",
  description:
    "Portfolio of Arron Kian Parejas — AI Engineer, ML Researcher, 6x Hackathon Champion, Consultant & former Chapter Lead at GDG on Campus HAU.",
  keywords: [
    "Arron Parejas",
    "AI Engineer Philippines",
    "Computer Vision",
    "Machine Learning",
    "Hackathon Champion",
    "Google Developer Groups",
    "GDG HAU",
    "Software Engineer",
    "Holy Angel University",
  ],
  authors: [{ name: "Arron Kian Parejas" }],
  creator: "Arron Kian Parejas",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://arronparejas.dev",
    title: "Arron Kian Parejas | AI Engineer · Hackathon Champion",
    description:
      "AI Engineer, Researcher, and 6x Hackathon Champion from the Philippines.",
    siteName: "Arron Kian Parejas",
    images: [
      {
        url: "/new_pfp.png",
        width: 1200,
        height: 630,
        alt: "Arron Kian Parejas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arron Kian Parejas | AI Engineer · Hackathon Champion",
    description: "AI Engineer, 6x Hackathon Champion, Former Chapter Lead at GDG on Campus HAU.",
    images: ["/new_pfp.png"],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-black text-zinc-100 overflow-x-hidden selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
