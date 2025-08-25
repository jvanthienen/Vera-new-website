import { FooterBlur } from "@/components/footer/footer-blur";
import { XIcon, TikTokIcon, InstagramIcon } from "@/components/footer/icons";
import Link from "next/link";

const links = [
  {
    title: "Vera",
    links: [
      {
        label: "Download App",
        href: "https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016",
        title: "Download the app from the App Store",
      },
      {
        label: "Features",
        href: "/#features",
        title: "See our features",
      },
      {
        label: "Blog",
        href: "/blog",
        title: "View our blog",
      },
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
        title: "Read our Privacy Policy",
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        label: "For iPhone",
        href: "https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016",
        title: "Download on iOS",
      },
      {
        label: "For Android (Coming Soon)",
        href: "https://play.google.com/store",
        title: "Download on Android (Coming Soon)",
      },
      
    ],
  },

  {
    title: "Follow Us",
    links: [
      {
        label: (
          <div className="flex items-center gap-2">
            <XIcon className="h-4 w-4" />
            <span>Twitter</span>
          </div>
        ),
        href: "https://x.com/",
        title: "Follow us on Twitter",
      },
      {
        label: (
          <div className="flex items-center gap-2">
            <TikTokIcon className="h-4 w-4" />
            <span>TikTok</span>
          </div>
        ),
        href: "https://www.tiktok.com/@vera.humandesigncoach",
        title: "Follow us on TikTok",
      },
      {
        label: (
          <div className="flex items-center gap-2">
            <InstagramIcon className="h-4 w-4" />
            <span>Instagram</span>
          </div>
        ),
        href: "https://www.instagram.com/vera.humandesign/",
        title: "Follow us on Instagram",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative -mt-25 overflow-hidden py-12 pt-37 md:py-25 md:pt-37">
      <FooterBlur />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 tracking-tight md:grid-cols-3">
        {links.map((link) => (
          <div key={link.title} className="mb-10 text-center">
            <h3 className="font-serif text-muted-foreground mb-8 font-medium">{link.title}</h3>
            <ul className="flex flex-col items-center gap-8">
              {link.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    title={link.title}
                    target={link.href.startsWith("https://") ? "_blank" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
