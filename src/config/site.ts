export const SITE_CONFIG = {
  name: "Denaro",
  url: "https://example.com", // Your site's base URL
  defaultOgImage: "/og-default.jpg", // A default social sharing image
  socialLinks: { // Social profile URLs
    twitter: "https://twitter.com/denaro",
    linkedin: "https://linkedin.com/company/denaro",
  },
  // Add verification codes here (Optional)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || '', // Optional
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '', // Optional
    // Other verification services can be added here
  },
  ERROR_IMG_SRC: "/error-image.webp"
};

// DEFAULT Metadata. Used in layout.tsx as fallbacks.
export const DEFAULT_METADATA = {
  title: {
    default: "Denaro SaaS Landing Page", // Default title
    template: "%s | Denaro", // Template for child pages (e.g., "Pricing | Denaro")
  },
  description: "The best SaaS platform for managing your finances.",
  icons: {
    icon: "/favicon.ico",
  }
};