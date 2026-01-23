'use client'
import Link from "next/link";
import { Twitter, Linkedin, Github, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import Logo from "../logo";
import { usePathname } from "next/navigation";

const Footer = () => {

  const pathname = usePathname();
  if(pathname?.startsWith("/landings")) return <></>


  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  

  const services = [
    { label: "Web Development", href: "/services/web-development" },
    { label: "App Development", href: "/services/app-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Custom Software", href: "/services/custom-software" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ];

  const theme = useTheme()

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/sqrock", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/sqrock", label: "LinkedIn" },
    // { icon: Github, href: "https://github.com/sqrock", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com/sqrock.tech", label: "Instagram" },
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-col">
                {/* <Logo  w={200}/> */}
                <span className="text-2xl font-bold text-primary">SQROCK</span>
                <span className="text-sm text-muted-foreground tracking-wider">IT SOLUTIONS</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                We build scalable, secure, and high-performance digital solutions.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium">Connect with us</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:sqrock.business@outlook.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    sqrock.business@outlook.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a
                    href="tel:+916378695548"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    +91 63786 95548
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">
                    India
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2026 SQROCK IT Solutions. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <span className="text-red-500">❤️</span> by SQROCK
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;