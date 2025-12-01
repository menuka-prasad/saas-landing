
import { featuresContent } from "@/content/features";
import { AnimatedSection } from "@/hooks/useScrollAnimation";


export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            {featuresContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {featuresContent.subtitle}
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresContent.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection
                key={index}
                animation="stagger"
                delay={index * 150}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-foreground mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fadeUp" delay={800} className="text-center mt-16">
          <p className="text-muted-foreground mb-4">{featuresContent.bottomCTA.title}</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/50 border border-border hover:bg-accent/70 transition-colors cursor-pointer">
            <span className="text-sm">🚀</span>
            <span>{featuresContent.bottomCTA.ctaText}</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}