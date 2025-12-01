import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { CTAContent } from "@/content/cta";

export function CTASection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 animate-gradient">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedSection animation="fadeUp" className="space-y-8">
          {/* Badge */}
          <AnimatedSection animation="fadeIn" delay={200}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-pulse-slow">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">{CTAContent.badgeText}</span>
            </div>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection animation="fadeUp" delay={400}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              {CTAContent.headline.part1}
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                {CTAContent.headline.part2}
              </span>
            </h2>
          </AnimatedSection>

          {/* Description */}
          <AnimatedSection animation="fadeUp" delay={600}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {CTAContent.description}
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection animation="scale" delay={800}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="px-8 py-6 rounded-lg group text-lg animate-pulse-slow">
                {CTAContent.primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 rounded-lg border-2 hover:bg-accent/50 text-lg hover:scale-105 transition-transform"
              >
                {CTAContent.secondaryCTA.text}
              </Button>
            </div>
          </AnimatedSection>

          {/* Trust Indicators */}
          <AnimatedSection animation="fadeUp" delay={1000}>
            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                {CTAContent.trustIndicators.map((indicator) => (
                  <div key={indicator} className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
      </div>
    </section>
  );
}