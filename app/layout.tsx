import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/website/navbar";
import Footer from "@/components/website/footer";

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
    default: "SQROCK Cloud",
    template: "%s | SQROCK Cloud",
  },
  robots: {
    index: true,
    follow: true,
  },
  description:
    "SQROCK Cloud is an IT solutions company providing professional web development, app development, and digital solutions for businesses in India.",
  authors: [{ name: "SQROCK Cloud" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
                  <Navbar />
            
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
