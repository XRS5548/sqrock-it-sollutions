import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/website/navbar";
import Footer from "@/components/website/footer";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  metadataBase: new URL("https://sqrock.cloud"),
  alternates: {
    canonical: "/",
  },
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
        url: "/og-image.png", // 1200x630px image banana hoga
        width: 1200,
        height: 630,
        alt: "SQROCK IT Solutions - Building Digital Solutions That Scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SQROCK - Web Development, App & Software Company India",
    description:
      "High-performance web development, mobile apps, UI/UX design & custom software for startups and businesses across India.",
    images: ["/og-image.png"],
    creator: "@sqrockofficial", // agar Twitter/X account hai toh
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en" suppressHydrationWarning>
        <head />

 <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GV59SQHG3R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GV59SQHG3R');
          `}
        </Script>

        
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GV59SQHG3R');
          `}
        </Script>


        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
                  <Navbar />
                  <Toaster />
            
            {children}
            <Footer />
          </ThemeProvider>
        </body>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SQROCK Cloud",
      url: "https://sqrock.cloud",
      logo: "https://sqrock.cloud/logo/dark.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-6378695548",
        contactType: "customer support",
        areaServed: "IN",
      },
    }),
  }}
/>



      </html>
  );
}
