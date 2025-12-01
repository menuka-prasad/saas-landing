import { BlogSection } from "@/components/sections/BlogSection";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";


export function HomePage() {
    return (
        <div className="overflow-hidden">

            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Pricing Section */}
            <PricingSection />

            {/* Integrations Section */}
            <IntegrationsSection />

            {/* Blog/Resources Section */}
            <BlogSection />

            {/* Final CTA Section */}
            <CTASection />

        </div>
    );
}