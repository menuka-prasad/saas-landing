"use client"
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { pricingContent } from "@/content/pricing";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function PricingSection() {

  const [isAnnual, setIsAnnual] = useState(false);
  const isMobile = useIsMobile();

  const togglePricing = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <section id="pricing" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            {pricingContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pricingContent.subtitle}
          </p>
        </AnimatedSection>

        {/* Pricing Toggle */}
        <AnimatedSection animation="fadeIn" delay={200} className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-4 p-1 rounded-lg bg-muted">
            <button onClick={togglePricing} className={cn(
              isAnnual ?
                "px-4 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                :
                "px-4 py-2 rounded-md bg-background text-foreground shadow-sm transition-all hover:shadow-md"
            )}>
              {pricingContent.pricingCards.monthly}
            </button>
            <button onClick={togglePricing} className={cn(
              isAnnual ?
                "px-4 py-2 rounded-md bg-background text-foreground shadow-sm transition-all hover:shadow-md"
                : "px-4 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            )}>
              {pricingContent.pricingCards.annual}
            </button>
          </div>
          <div className="ml-4 px-3 py-1 rounded-full bg-green-100 dark:bg-green-800/10 text-green-800 dark:text-green-500 dark:border dark:border-green-500 text-sm animate-pulse-slow">
            {pricingContent.pricingCards.saveText}
          </div>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingContent.plans.map((plan, index) => (
            <AnimatedSection
              key={index}
              animation="scale"
              delay={index * 150}
              className={`relative rounded-2xl flex flex-col items-center p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-105 
                ${plan.popular
                ? "border-primary bg-card shadow-lg scale-105 "
                : "border-border bg-card hover:border-primary/20"
                }
                ${plan.popular && !isMobile &&"animate-pulse-slow"}
                `}
            >
             
                {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-4 py-1 bg-primary text-primary-foreground">
                    {pricingContent.pricingCards.popularText}
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl text-foreground">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
                  <span className="text-muted-foreground">/{isAnnual ? "year" : "month"}</span>
                </div>
                <p className="text-sm text-muted-foreground">{pricingContent.pricingCards.billedText}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 w-full">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
             

              <div className="absolute bottom-0 pb-6">
                {/* CTA Button */}
                <Button
                  className={`w-full py-6 rounded-lg group ${plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : ""
                    }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {pricingContent.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                {/* Trial Info */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {pricingContent.pricingCards.trialText}
                </p>
              </div>
              <div className="h-20"/>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Info */}
        <AnimatedSection animation="fadeUp" delay={600} className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            {pricingContent.bottomInfo.title} <a href="#" className="text-primary hover:underline transition-colors">{pricingContent.bottomInfo.linkText}</a>
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Check className="h-4 w-4 text-green-500" />
              <span>{pricingContent.bottomInfo.guranteeText}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Check className="h-4 w-4 text-green-500" />
              <span>{pricingContent.bottomInfo.cancelText}</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}