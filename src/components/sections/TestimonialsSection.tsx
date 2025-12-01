import { Star } from "lucide-react";
import { DenaroImage } from "@/components/DenaroImage";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { testimonialContent } from "@/content/testimonials";
import testimonials from "@/data/testimonials.json";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-accent/20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
            {testimonialContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {testimonialContent.subtitle}
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={index}
              animation="scale"
              delay={index * 200}
              className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>

              {/* Testimonial */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                &quot;{testimonial.testimonial}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                  <DenaroImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Stats */}
        <AnimatedSection animation="fadeUp" delay={600} className="mt-16 pt-16 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AnimatedSection animation="stagger" delay={0}>
              <div className="text-3xl text-foreground mb-2 animate-pulse-slow">{testimonialContent.bottomStats.stat1.value}</div>
              <div className="text-sm text-muted-foreground">{testimonialContent.bottomStats.stat1.title}</div>
            </AnimatedSection>
            <AnimatedSection animation="stagger" delay={100}>
              <div className="text-3xl text-foreground mb-2 animate-pulse-slow">{testimonialContent.bottomStats.stat2.value}</div>
              <div className="text-sm text-muted-foreground">{testimonialContent.bottomStats.stat2.title}</div>
            </AnimatedSection>
            <AnimatedSection animation="stagger" delay={200}>
              <div className="text-3xl text-foreground mb-2 animate-pulse-slow">{testimonialContent.bottomStats.stat3.value}</div>
              <div className="text-sm text-muted-foreground">{testimonialContent.bottomStats.stat3.title}</div>
            </AnimatedSection>
            <AnimatedSection animation="stagger" delay={300}>
              <div className="text-3xl text-foreground mb-2 animate-pulse-slow">{testimonialContent.bottomStats.stat4.value}</div>
              <div className="text-sm text-muted-foreground">{testimonialContent.bottomStats.stat4.title}</div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}