import {
  Twitter,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export const siteConfig = {
  name: "Denaro SaaS Landing Page",
  description: "This is a fantastic template built with Next.js.",

  header: {
    brandName: "Denaro",
    buttons: {
      login: "Login",
      signup: "Sign Up"
    },

    navLinks: [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#integrations" },
    { name: "Blog", href: "#blog" },
  ]
  }
  ,

  footer: {
    description: "Automate your workflows, gain insights, and scale your business with our intelligent platform.",
    copyright: `© ${new Date().getFullYear()} Denaro. All rights reserved.`,
    bottomText: [
      "🔒 SOC 2 Compliant",
      "🛡️ GDPR Ready",
      "⚡ 99.9% Uptime"
    ],
    links: {
      product: {
        name: "Product",
        items: [
          { name: "Features", href: "#" },
          { name: "Pricing", href: "#" },
          { name: "Integrations", href: "#" },
          { name: "API", href: "#" },
          { name: "Security", href: "#" }
        ]
      },
      company: {
        name: "Company",
        items: [
          { name: "About", href: "#" },
          { name: "Blog", href: "#" },
          { name: "Careers", href: "#" },
          { name: "Press", href: "#" },
          { name: "Contact", href: "#" }
        ]
      },
      resources: {
        name: "Resources",
        items: [
          { name: "Documentation", href: "#" },
          { name: "Help Center", href: "#" },
          { name: "Community", href: "#" },
          { name: "Tutorials", href: "#" },
          { name: "Webinars", href: "#" }
        ]
      },
      legal: {
        name: "Legal",
        items: [
          { name: "Privacy Policy", href: "#" },
          { name: "Terms of Service", href: "#" },
          { name: "Cookie Policy", href: "#" },
          { name: "GDPR", href: "#" }
        ]
      }
    }
  },

  socialLinks: [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Email", icon: Mail, href: "#" }
  ],


  themeToogle: {
    screenReadrsOnly: "Toggle theme",
    themes: {
      light: "Light",
      dark: "Dark",
      system: "System"
    }
  }
}