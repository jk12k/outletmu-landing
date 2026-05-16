"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureRegistered() {
  if (typeof window === "undefined") return;
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

type ScrollRevealProps = {
  children: ReactNode;
  /** Selector untuk element yang ingin di-reveal. Default: "[data-reveal]" */
  selector?: string;
  /** Jarak translate awal */
  y?: number;
  /** Stagger antar element */
  stagger?: number;
  /** Optional: trigger root */
  className?: string;
};

/**
 * Wrap section apapun dengan ScrollReveal supaya child element ber-attribute
 * data-reveal mendapatkan animasi fade-up scroll-triggered yang konsisten.
 */
export function ScrollReveal({
  children,
  selector = "[data-reveal]",
  y = 24,
  stagger = 0.08,
  className,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureRegistered();

    const root = containerRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector));
      if (!items.length) return;

      if (prefersReducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      // Group by their immediate parent so masing-masing section/grid
      // di-stagger relatif terhadap viewport-nya sendiri, bukan satu antrean panjang.
      const buckets = new Map<HTMLElement, HTMLElement[]>();
      items.forEach((item) => {
        const parent = (item.parentElement ?? root) as HTMLElement;
        if (!buckets.has(parent)) buckets.set(parent, []);
        buckets.get(parent)!.push(item);
      });

      buckets.forEach((groupItems, parent) => {
        gsap.fromTo(
          groupItems,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger,
            scrollTrigger: {
              trigger: parent,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [selector, y, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
