"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "../Togglemod";
import { useTheme } from "next-themes";
import Logo from "../logo";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-lg"
          : "bg-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA - Right */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-primary hover:bg-primary/90">
              Get Quote
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <Logo />
                      </div>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Close menu</span>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-6 py-8">
                    <ul className="space-y-4">
                      {navItems.map((item) => (
                        <li key={item.label}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 block"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="px-6 py-6 border-t">
                    <SheetClose asChild>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Get Quote
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;