import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });






export const metadata: Metadata = {
  title: "Website Development Company in India",
  description:
    "Affordable website development services in India. We build fast, secure & SEO-friendly business websites starting at ₹4,999. Contact SQROCK Cloud today.",

  alternates: {
    canonical: "https://sqrock.cloud/landings/web-development-service",
  },

  authors: [{ name: "SQROCK Cloud" }],

  openGraph: {
    type: "website",
    url: "https://sqrock.cloud/landings/web-development-service",
    title: "Website Development Company in India | SQROCK Cloud",
    description:
      "Professional website development services in India. Fast, secure & SEO-optimized websites starting at ₹4,999.",
    siteName: "SQROCK Cloud",
    images: [
      {
        url: "https://sqrock.cloud/og/web-development.jpg",
        width: 1200,
        height: 630,
        alt: "Website Development Company in India | SQROCK Cloud",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in India | SQROCK Cloud",
    description:
      "Get professional, fast & SEO-friendly websites at affordable prices. Starting at ₹4,999.",
    images: ["https://sqrock.cloud/og/web-development.jpg"],
  },
}





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
        <>
            {children}       

        </>
      
  );
}