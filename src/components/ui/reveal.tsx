"use client";
import { useEffect, useRef } from "react";
// Content remains visible without JavaScript. Only animate when entering from below.
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.animate(
            [
              { opacity: 0.55, transform: "translateY(16px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 650, easing: "cubic-bezier(.2,.7,.3,1)" },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (el.getBoundingClientRect().top > window.innerHeight)
      observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
