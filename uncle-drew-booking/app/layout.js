import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Uncle Drew Sports Center",
  description: "Experience world-class training, facilities, and events at Uncle Drew Sports Center.",
  keywords: ["sports center", "basketball", "training", "Uncle Drew", "booking", "volleyball", "events"],
  openGraph: {
    title: "Uncle Drew Sports Center",
    description: "Experience world-class training, facilities, and events.",
    url: "https://www.uncledrewsportscenter.com/",
    siteName: "Uncle Drew Sports Center",
    images: [
      {
        url: "https://www.uncledrewsportscenter.com/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Uncle Drew Sports Center Facility",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncle Drew Sports Center",
    description: "Experience world-class training and events.",
    images: ["https://www.uncledrewsportscenter.com/preview-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
