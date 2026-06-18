import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arron Kian Parejas | AI Engineer · Hackathon Champion · Community Leader",
  description:
    "Portfolio of Arron Kian Parejas — AI Engineer, Software Engineer, ML Researcher, 7x Hackathon Champion, CEO of GDG on Campus HAU, and Open Source Contributor. Intern at NVIDIA & Microsoft.",
  keywords: [
    "Arron Parejas",
    "AI Engineer Philippines",
    "Software Engineer",
    "Machine Learning",
    "Hackathon Champion",
    "Google Developer Groups",
    "GDG HAU",
    "NVIDIA Intern",
    "Microsoft Intern",
    "Computer Vision",
    "Full Stack Developer",
    "Philippines Developer",
  ],
  authors: [{ name: "Arron Kian Parejas" }],
  creator: "Arron Kian Parejas",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://arronparejas.dev",
    title: "Arron Kian Parejas | AI Engineer · Hackathon Champion",
    description:
      "Elite AI Engineer, Software Engineer, Researcher, and 7x Hackathon Champion from the Philippines.",
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
    description: "Elite AI Engineer, 7x Hackathon Champion, CEO of GDG on Campus HAU.",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-bg-primary text-silver-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
