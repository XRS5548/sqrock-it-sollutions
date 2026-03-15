import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UI/UX Design Services India | Mobile & Web Design Agency | SQROCK",
  description:
    "SQROCK IT Solutions offers professional UI/UX design services in India. User research, wireframing, UI design, prototyping & design systems for startups and businesses. 140+ projects delivered. 4.9★ average rating. Get a free consultation today.",
  keywords: [
    "UI UX design services India",
    "mobile app UI design India",
    "web UI design agency India",
    "user experience design company",
    "UX design agency India",
    "wireframing prototyping services",
    "design system development",
    "UI design company Rajasthan",
    "user interface design startup",
    "hire UI UX designer India",
  ],
  authors: [{ name: "SQROCK IT Solutions", url: "https://sqrock.cloud" }],
  creator: "SQROCK IT Solutions",
  publisher: "SQROCK IT Solutions",
  metadataBase: new URL("https://sqrock.cloud"),
  alternates: {
    canonical: "/ui-ux-design-services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sqrock.cloud/ui-ux-design-services",
    siteName: "SQROCK IT Solutions",
    title: "UI/UX Design Services India | SQROCK IT Solutions",
    description:
      "Modern, intuitive digital experiences crafted by SQROCK. User research, wireframing, UI design, prototyping & design systems. 140+ projects | 4.9★ rating.",
    images: [
      {
        url: "/images/uiux-process.png",
        width: 1200,
        height: 630,
        alt: "SQROCK UI/UX Design Services - Design That Moves People",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI/UX Design Services India | SQROCK IT Solutions",
    description:
      "Modern, intuitive digital experiences crafted by SQROCK. User research, wireframing, UI design & prototyping. 140+ projects delivered. Free consultation available.",
    images: ["/images/uiux-process.png"],
  },
  category: "technology",
}


// ✅ Default export zaruri hai
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}