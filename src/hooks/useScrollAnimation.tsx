"use client"
import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const { threshold = 0.1, rootMargin = "0px 0px -100px 0px", triggerOnce = true } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { isVisible, elementRef };
}

// Animation wrapper component
interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "stagger";
  delay?: number;
  className?: string;
}

export function AnimatedSection({ 
  children, 
  animation = "fadeUp", 
  delay = 0, 
  className = "" 
}: AnimatedSectionProps) {
  const { isVisible, elementRef } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? `animate-${animation}` 
          : `opacity-0 ${getInitialTransform(animation)}`
      } ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

function getInitialTransform(animation: string): string {
  switch (animation) {
    case "fadeUp":
      return "translate-y-8";
    case "slideLeft":
      return "translate-x-8";
    case "slideRight":
      return "-translate-x-8";
    case "scale":
      return "scale-95";
    case "stagger":
      return "translate-y-4";
    default:
      return "";
  }
}