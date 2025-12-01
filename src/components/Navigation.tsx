"use client"
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { siteConfig } from "@/content/site";
import { DenaroImage } from "./DenaroImage";
import { useTheme } from "./ThemeProvider";
import { Menu, X } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";



export function Navigation() {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // hide navbar on home page
  const OnHome = pathname === "/";


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = (element as HTMLElement).offsetTop - navHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  if (!OnHome) 
    return null; 


  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 xl:px-0 transition-all duration-500 ease-in-out 
          ${isScrolled
            ? "px-4 py-3"
            : "px-0 py-0"
          }`}
      >
        <div
          className={`transition-all duration-500 ease-in-out ${isScrolled
            ? "container mx-auto max-w-6xl rounded-2xl bg-background/80 backdrop-blur-lg  shadow-lg shadow-black/5 px-6"
            : "mx-auto max-w-7xl  backdrop-blur-sm "
            }`}
        >
          <div className="flex items-center justify-between  py-4">
            {/* Logo */}
            <Link href='/'>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 group"
            >
              <DenaroImage
                width={40}
                height={40}
                fallBackHeight={40}
                fallBackWidth={40}
                alt="Logo"
                src={resolvedTheme === "dark" ? "./logo-dark.svg" : "./logo-light.svg"}
              />
              <span className="text-xl text-foreground group-hover:text-primary transition-colors font-bold">
                {siteConfig.header.brandName}
              </span>
            </button>
            </Link>



            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {siteConfig.header.navLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>


            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme toggle */}
              <ThemeToggle />
              <Link href='/auth/login'>
              <button className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                {siteConfig.header.buttons.login}
              </button>
              </Link>
              <Link href='/auth/signup'>
              <Button size="sm" className="rounded-lg">
                {siteConfig.header.buttons.signup}
              </Button>
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              {/* Theme toggle */}
              <ThemeToggle />
              {/* Mobile Menu Button */}
              <button
                className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-lg opacity-100 pointer-events-auto"
          : "bg-transparent opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-20 left-4 right-4 bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${isMobileMenuOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-95"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 space-y-4">
            {/* Mobile Navigation Items */}
            {siteConfig.header.navLinks.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`w-full text-left px-4 py-3 rounded-lg text-foreground hover:bg-accent/50 transition-all duration-200 ${isMobileMenuOpen ? "animate-in slide-in-from-top-2" : ""
                  }`}
              >
                {item.name}
              </button>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-border space-y-3">
            <Link href='/auth/login'>
              <button
                className={`w-full px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 ${isMobileMenuOpen ? "animate-in slide-in-from-top-2" : ""
                  }`}
                style={{ animationDelay: `${siteConfig.header.navLinks.length * 50}ms` }}
              >
                {siteConfig.header.buttons.login}
              </button>
              </Link>
            <Link href='/auth/signup'>
              <Button
                className={`w-full rounded-lg ${isMobileMenuOpen ? "animate-in slide-in-from-top-2" : ""
                  }`}
                style={{ animationDelay: `${(siteConfig.header.navLinks.length + 1) * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {siteConfig.header.buttons.signup}
              </Button>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-20" />
    </>
  );
}