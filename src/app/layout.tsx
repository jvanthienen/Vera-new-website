import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Optimize font loading for mobile performance
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Improves loading performance
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true, // Reduces layout shift
});

export const metadata: Metadata = {
  title: "Human Design App for Self-Discovery & Alignment | Vera",
  description: "Unlock your unique Human Design blueprint with Vera. Gain clarity, make aligned decisions, and live with ease. Start your journey today.",
  keywords: ["Human Design", "Self-Discovery", "Personal Growth", "Alignment", "Chart Reading", "Life Coaching"],
  authors: [{ name: "Vera Team" }],
  creator: "Vera",
  publisher: "Vera",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover", // For devices with notches
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFDF" },
    { media: "(prefers-color-scheme: dark)", color: "#FFFFDF" },
  ],
  colorScheme: "light dark",
  icons: {
    icon: [
      { url: "/vera-logo-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/vera-logo-favicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/vera-logo-favicon.png",
    apple: [
      { url: "/vera-logo-favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vera - Human Design",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vera.app",
    title: "Human Design App for Self-Discovery & Alignment | Vera",
    description: "Unlock your unique Human Design blueprint with Vera. Gain clarity, make aligned decisions, and live with ease. Start your journey today.",
    siteName: "Vera",
    images: [
      {
        url: "/screenshot-chart-rightsize.png",
        width: 280,
        height: 480,
        alt: "Vera Human Design Chart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Human Design App for Self-Discovery & Alignment | Vera",
    description: "Unlock your unique Human Design blueprint with Vera. Gain clarity, make aligned decisions, and live with ease. Start your journey today.",
    images: ["/screenshot-chart-rightsize.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
