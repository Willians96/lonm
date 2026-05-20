"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium elegant easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Add Lenis to GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Save instance for possible global use
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return <>{children}</>;
}
