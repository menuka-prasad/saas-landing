import { integrationContent } from "@/content/integrations";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { DynamicIcon } from "../Icons";


export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 px-4 bg-accent/10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            {integrationContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {integrationContent.subtitle}
          </p>
        </AnimatedSection>

        {/* Integration Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {integrationContent.integrations.map((integration, index) => (
            <AnimatedSection
              key={index}
              animation="stagger"
              delay={index * 50}
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">
                <DynamicIcon name={integration.logo} color={integration.color}/>
              </div>
              <span className="text-sm text-center text-foreground group-hover:text-primary transition-colors">
                {integration.name}
              </span>
            </AnimatedSection>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.values(integrationContent.features).map((feature, index) => (
          <AnimatedSection key={index} animation="fadeUp" delay={600} className="text-center p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection animation="fadeUp" delay={750} className="text-center">
          <p className="text-muted-foreground mb-4">
            {integrationContent.bottomCTA.title}
          </p>
          <div className="inline-flex items-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors animate-pulse-slow">
              {integrationContent.bottomCTA.viewAllText}
            </button>
            <button className="px-6 py-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              {integrationContent.bottomCTA.requestText}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}