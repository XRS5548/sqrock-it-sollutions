import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alpha 2 Internship Program | Free Engineering Internship for Students",
  description:
    "Apply for the Alpha 2 Internship Program by Sqrock, a free engineering and web development internship for students in India. Gain real-world project experience, earn a certificate, and launch your tech career. Now accepting applications!",
  
  keywords: [
    "Alpha 2 Internship Program",
    "Free Engineering Internship",
    "Web Development Internship India",
    "Software Internship for Students",
    "Sqrock IT Solution Internship",
    "Real-world Project Experience",
    "Internship Certificate",
    "Tech Career Launch",
    "Computer Science Internship",
    "IT Internship India"
  ],

  authors: [{ name: "Sqrock IT Solution", url: "https://sqrock.cloud" }],
  creator: "Sqrock IT Solution",
  publisher: "Sqrock IT Solution",

  metadataBase: new URL("https://sqrock.cloud"),

  openGraph: {
    title: "Alpha 2 Internship Program | Free Training & Certification",
    description:
      "Join Sqrock's Alpha 2 Internship for hands-on experience in engineering and web development. Work on real projects, get certified, and start your career in tech. Apply for free!",
    url: "https://sqrock.cloud/alpha2-interns",
    siteName: "Sqrock IT Solution",
    images: [
      {
        url: "/banner.jpeg",
        width: 1200,
        height: 630,
        alt: "Official Banner for Alpha 2 Internship Program by Sqrock",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Alpha 2 Internship Program - Free Internship by Sqrock",
    description:
      "Gain real-world experience and a certificate with the Alpha 2 Internship Program. Free for engineering students in India. #Internship #Tech #Career",
    images: ["https://sqrock.cloud/banner.jpeg"], // Absolute URL is better for Twitter
    creator: "@sqrocksol", // Add Twitter handle
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Add apple touch icon
  },

  alternates: {
    canonical: "https://sqrock.cloud/alpha2-interns",
  },
}

export default function Alpha2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* JSON-LD Structured Data (SEO Boost) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Sqrock IT Solution",
            url: "https://sqrock.cloud",
            logo: "https://sqrock.cloud/banner.jpeg",
            sameAs: [],
            contactPoint: {
              "@type": "ContactPoint",
              email: "sqrock.business@outlook.com",
              contactType: "customer support",
            },
            description:
              "Alpha 2 Internship Program provides free training, real-world projects, and certification for engineering students.",
          }),
        }}
      />

      {children}
    </>
  );
}