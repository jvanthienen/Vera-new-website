import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Design Chart Generator Online | Vera",
  description: "Generate your free Human Design chart online. Explore your energy type, authority, strategy, and centers. Start your journey to alignment and clarity today.",
  metadataBase: new URL('https://vera.app'),
  alternates: {
    canonical: 'https://vera.app/chart',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: "Human Design Chart Generator Online | Vera",
    description: "Generate your free Human Design chart online. Explore your energy type, authority, strategy, and centers. Start your journey to alignment and clarity today.",
    url: 'https://vera.app/chart',
    siteName: 'Vera',
    images: [
      {
        url: "/screenshot-chart-rightsize.png",
        width: 280,
        height: 480,
        alt: "Human Design Chart Generator",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Human Design Chart Generator Online | Vera",
    description: "Generate your free Human Design chart online. Explore your energy type, authority, strategy, and centers. Start your journey to alignment and clarity today.",
    images: ["/screenshot-chart-rightsize.png"],
  },
};

export default function ChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
