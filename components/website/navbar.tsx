"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "../Togglemod";
import { useTheme } from "next-themes";
import Logo from "../logo";
import { usePathname, useRouter } from "next/navigation";
import { authClient, signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  if(pathname?.startsWith("/landings") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")){
    return <></>
  }

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
            <Link href={"/getquote"}>
              <Button className="bg-primary hover:bg-primary/90">
                Get Quote
              </Button>
            </Link>
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium truncate">{session.user.name}</div>
                  <div className="px-2 pb-2 text-xs text-muted-foreground truncate">{session.user.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" /> Login
                </Button>
              </Link>
            )}
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium truncate">{session.user.name}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
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
                  <div className="px-6 py-6 border-t space-y-3">
                    {session?.user ? (
                      <>
                        <div className="text-sm text-muted-foreground px-1">Signed in as <span className="font-medium text-foreground">{session.user.email}</span></div>
                        <SheetClose asChild>
                          <Link href="/dashboard">
                            <Button className="w-full" variant="outline">Dashboard</Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button className="w-full" variant="destructive" onClick={() => signOut()}>Sign Out</Button>
                        </SheetClose>
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Link href="/login">
                          <Button className="w-full bg-primary hover:bg-primary/90">Login</Button>
                        </Link>
                      </SheetClose>
                    )}
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
