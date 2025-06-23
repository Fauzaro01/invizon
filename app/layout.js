import { Inter, Inter_Tight } from "next/font/google";
import Navbar from "@/components/navbar";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const InterTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata = {
  title: "Invizone Class | SMKS TI Muhammadiyah 1 Cikampek - Official Website",
  description: "Welcome to Invizone Class at SMKS TI Muhammadiyah 1 Cikampek. Discover our student community, achievements, and latest activities.",
  keywords: ["Invizone Class", "SMKS TI Muhammadiyah 1 Cikampek", "student website", "class community"],
  openGraph: {
    title: "Invizone Class | SMKS TI Muhammadiyah 1 Cikampek",
    description: "Official website of Invizone Class showcasing our student community and achievements",
    url: "https://invizon.web.app",
    siteName: "Invizone Class",
    images: [
      {
        url: "https://invizon.web.app/hero.webp",
        width: 1200,
        height: 630,
        alt: "Invizone Class Group Photo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invizone Class | SMKS TI Muhammadiyah 1 Cikampek",
    description: "Official website of Invizone Class",
    images: ["https://invizon.web.app/hero.webp"],
  },
  alternates: {
    canonical: "https://invizon.web.app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${InterFont.className } ${InterTight.className } antialiased bg-gray-50`}
      >
       <Navbar />
       <main>{children}</main>
      </body>
      <GoogleAnalytics gaId="G-D4MYBFEEJ5"/>
    </html>
  );
}
