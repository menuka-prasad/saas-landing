import { Calendar, Clock, ArrowRight } from "lucide-react";
import { DenaroImage } from "@/components/DenaroImage";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { blogContent } from "@/content/blog";
import articles from "@/data/articles.json";

export function BlogSection() {
  return (
    <section id="blog" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection animation="fadeUp" className="flex items-center justify-between mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground">
              {blogContent.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {blogContent.subtitle}
            </p>
          </div>
          {/* <a href={blogContent.viewAllButton.link}> */}
          <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent/50 transition-colors animate-pulse-slow">
            {blogContent.viewAllButton.text}
            <ArrowRight className="h-4 w-4" />
          </button>
          {/* </a> */}
        </AnimatedSection>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <AnimatedSection
              key={index}
              animation="stagger"
              delay={index * 200}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              {/* Article Image */}
              <div className="aspect-video overflow-hidden flex justify-center items-center">
                <DenaroImage
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Article Content */}
              <div className="p-6 space-y-4">
                {/* Category & Meta */}
                <div className="flex items-center justify-between text-sm">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Read More */}
                <div className="pt-4">
                  {/* <a href={`/blog?name=${article.title}`} target="_blank" rel="noopener noreferrer"> */}
                    <button className="flex items-center gap-2 text-primary hover:gap-3 transition-all">
                      {blogContent.readMoreText}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  {/* </a> */}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center md:hidden">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent/50 transition-colors mx-auto">
            {blogContent.viewAllButton.text}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Newsletter Signup */}
        <AnimatedSection animation="scale" delay={600} className="mt-16 p-8 rounded-2xl bg-accent/20 border border-border text-center hover:shadow-lg transition-shadow">
          <h3 className="text-2xl text-foreground mb-4">{blogContent.newsletterCTA.title}</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            {blogContent.newsletterCTA.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap animate-pulse-slow">
              {blogContent.newsletterCTA.subscribe.text}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}