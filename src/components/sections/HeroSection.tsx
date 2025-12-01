import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { DenaroImage } from "@/components/DenaroImage";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { heroContent } from "@/content/hero";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-12 pb-20 bg-gradient-to-br from-background via-background to-accent/20 animate-gradient">
      <div className="container mx-auto max-w-7xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ">
          {/* Content */}
          <AnimatedSection animation="fadeUp" className="text-center lg:text-left space-y-8 ">
            <div className="space-y-6">

              {/* Badge */}
              <AnimatedSection animation="fadeIn" delay={200}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">{heroContent.badgeText}</span>
                </div>
              </AnimatedSection>

              {/* Title */}
              <AnimatedSection animation="fadeUp" delay={400}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                  {heroContent.title.part1}
                  <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 font-bold bg-clip-text text-transparent animate-gradient">
                    {heroContent.title.part2}
                  </span>
                </h1>
              </AnimatedSection>

              {/* Subtitle */}
              <AnimatedSection animation="fadeUp" delay={600}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  {heroContent.subtitle}
                </p>
              </AnimatedSection>
            </div>

            {/* CTA Buttons */}
            <AnimatedSection animation="fadeUp" delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="px-8 py-6 rounded-lg group animate-pulse-slow">
                  {heroContent.primaryCTA.text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 rounded-lg border-2 hover:bg-accent/50"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {heroContent.secondaryCTA.text}
                </Button>
              </div>
            </AnimatedSection>

            {/* Social Proof */}
            <AnimatedSection animation="fadeUp" delay={1000}>
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">{heroContent.socialProof.title}</p>
                <div className="flex items-center justify-center lg:justify-start gap-8 opacity-60">
                  {heroContent.socialProof.companies.map((company) => (
                    <div key={company} className="px-4 py-2 bg-muted rounded text-sm hover:opacity-100 transition-opacity">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Hero Product Mockup */}
          <AnimatedSection animation="slideLeft" delay={600} className="relative mt-[-80px]">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 animate-float">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-card flex justify-center items-center">
                <DenaroImage
                  src={heroContent.heroMockup.src}
                  alt={heroContent.heroMockup.alt}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500/20 rounded-full animate-float-delayed"></div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}