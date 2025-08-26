import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Human Design App for Self-Discovery & Alignment | Vera",
  description: "Unlock your unique Human Design blueprint with Vera. Gain clarity, make aligned decisions, and live with ease. Start your journey today.",
  icons: {
    icon: "/vera-logo-favicon.png",
    shortcut: "/vera-logo-favicon.png",
    apple: "/vera-logo-favicon.png",
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
