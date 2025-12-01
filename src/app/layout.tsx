import type { Metadata } from "next";
import "@/styles/globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import { DEFAULT_METADATA } from "@/config/site";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getCanonicalUrl } from "@/lib/seo";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthContext";


export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  alternates: {
    canonical: getCanonicalUrl("/"), // homepage canonical
  },
  // You can add more default metadata properties here if needed
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <ThemeProvider>
        {/* Navigation */}
        <Navigation />


        <AuthProvider>
        {/* Main Content */}
        <main>
          {children}
          </main>
        </AuthProvider>

        {/* Footer */}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
