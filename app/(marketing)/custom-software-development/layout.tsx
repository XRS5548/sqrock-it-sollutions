import type { Metadata } from "next"

export const metadata: Metadata = {
  // ── Base ──
  metadataBase: new URL("https://sqrock.cloud"),
  title: {
    default: "SQROCK - Web Development, App & Software Company India",
    template: "%s | SQROCK IT Solutions",
  },
  description:
    "SQROCK IT Solutions delivers high-performance web development, mobile app development, UI/UX design, and custom software for startups and businesses across India. 250+ projects delivered. 98% client satisfaction.",
  keywords: [
    "web development company India",
    "mobile app development India",
    "custom software development",
    "UI UX design agency India",
    "IT solutions company India",
    "Next.js development",
    "React development agency",
    "startup web development",
    "affordable web development India",
    "SQROCK IT Solutions",
  ],
  authors: [{ name: "SQROCK IT Solutions", url: "https://sqrock.cloud" }],
  creator: "SQROCK IT Solutions",
  publisher: "SQROCK IT Solutions",
  category: "technology",

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sqrock.cloud",
    siteName: "SQROCK IT Solutions",
    title: "SQROCK - Web Development, App & Software Company India",
    description:
      "High-performance web development, mobile apps, UI/UX design & custom software for startups and businesses across India. 250+ projects | 98% satisfaction.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SQROCK IT Solutions - Building Digital Solutions That Scale",
      },
    ],
  },

  // ── Twitter ──
  twitter: {
    card: "summary_large_image",
    title: "SQROCK - Web Development, App & Software Company India",
    description:
      "High-performance web development, mobile apps, UI/UX design & custom software for startups and businesses across India.",
    images: ["/og-image.png"],
    creator: "@sqrock",
  },

  // ── Icons ──
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // ── PWA Manifest ──
  manifest: "/site.webmanifest",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}