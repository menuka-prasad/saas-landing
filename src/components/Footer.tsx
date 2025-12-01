"use client"
import { ArrowUp } from "lucide-react";
import { AnimatedSection } from "../hooks/useScrollAnimation";
import { siteConfig } from "@/content/site";
import { SITE_CONFIG } from "@/config/site";
import { DenaroImage } from "./DenaroImage";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


export function Footer() {

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // hide navbar on home page
  const OnHome = pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  if (!OnHome)
    return null;

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <AnimatedSection animation="fadeUp" className="col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <DenaroImage
                width={30}
                height={30}
                fallBackHeight={30}
                fallBackWidth={30}
                alt="Logo"
                src={resolvedTheme === "dark" ? "./logo-dark.svg" : "./logo-light.svg"}
              />
              <span className="text-xl text-foreground font-semibold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.footer.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              {siteConfig.socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Product Links */}
          <AnimatedSection animation="fadeUp" delay={200} className="space-y-4">
            <h3 className="text-foreground">{siteConfig.footer.links.product.name}</h3>
            <ul className="space-y-3">
              {siteConfig.footer.links.product.items.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Company Links */}
          <AnimatedSection animation="fadeUp" delay={400} className="space-y-4">
            <h3 className="text-foreground">{siteConfig.footer.links.company.name}</h3>
            <ul className="space-y-3">
              {siteConfig.footer.links.company.items.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Resources Links */}
          <AnimatedSection animation="fadeUp" delay={600} className="space-y-4">
            <h3 className="text-foreground">{siteConfig.footer.links.resources.name}</h3>
            <ul className="space-y-3">
              {siteConfig.footer.links.resources.items.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Legal Links */}
          <AnimatedSection animation="fadeUp" delay={800} className="space-y-4">
            <h3 className="text-foreground">{siteConfig.footer.links.legal.name}</h3>
            <ul className="space-y-3">
              {siteConfig.footer.links.legal.items.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-muted-foreground text-sm">
            {siteConfig.footer.copyright}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {siteConfig.footer.bottomText.map((text, index) => (
                <span key={index} className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <span>{text}</span>
                </span>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110 animate-pulse-slow"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}