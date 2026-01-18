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
  title: "Sqrock IT Solutions | Website Development & Digital Marketing",
  description: "Professional Website Development, Web Design & SEO Services in India. Transform your digital presence with our expert IT solutions.",
  keywords: ["Sqrock IT Solutions", "Website Development", "Web Design", "SEO Services", "Digital Marketing", "Software Development", "India IT Company"],
};

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
      </html>
  );
}
