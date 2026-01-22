import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Top Flutter App Development Company | Android & iOS Apps @ ₹19,999 Only | Sqrock IT Solutions",
  description: "Get professional Flutter app development services for Android & iOS starting at just ₹19,999. Build fast, scalable, high-performance cross-platform mobile apps with Sqrock IT Solutions. 100% Client Satisfaction. Free Consultation.",
  keywords: [
    "flutter app development",
    "android ios app development",
    "flutter app development company India",
    "flutter app development services",
    "cross-platform mobile app development",
    "flutter app development company",
    "mobile app development using flutter",
    "flutter app developers India",
    "affordable flutter app development",
    "flutter app development cost ₹19,999",
    "best flutter app development company",
    "sqrock it solutions flutter",
    "hire flutter developers",
    "flutter for startups",
    "business app development flutter",
    "ecommerce app development flutter"
  ].join(", "),
  openGraph: {
    title: "Flutter App Development Company India | Android & iOS Apps @ ₹19,999",
    description: "Professional Flutter app development for Android & iOS. Build once, deploy everywhere. Starting at ₹19,999 only. Fast delivery & 30-day support.",
    type: "website",
    url: "https://www.sqrock.cloud/flutter-app-development",
    siteName: "Sqrock IT Solutions",
    locale: "en_IN",
    images: [
      {
        url: "https://www.sqrock.cloud/og-flutter-development.jpg",
        width: 1200,
        height: 630,
        alt: "Flutter App Development Services by Sqrock IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flutter App Development @ ₹19,999 | Android & iOS Apps",
    description: "Professional Flutter app development services starting at ₹19,999. Build high-performance mobile apps for both platforms.",
    images: ["https://www.sqrock.cloud/twitter-flutter-development.jpg"],
    creator: "@sqrockitsolutions",
    site: "@sqrockitsolutions",
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
  alternates: {
    canonical: "https://www.sqrock.cloud/flutter-app-development",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  authors: [{ name: "Sqrock IT Solutions", url: "https://www.sqrock.cloud" }],
  creator: "Sqrock IT Solutions",
  publisher: "Sqrock IT Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.sqrock.cloud'),
};


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return (
    <div>{children}</div>
  )
}
