"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, MessageSquare } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useModal } from "@/lib/ModalContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal animation on mount
    const ctx = gsap.context(() => {
      // Background video slow scale up
      gsap.fromTo(
        videoRef.current,
        { scale: 1.15, filter: "brightness(0.2)" },
        { scale: 1.0, filter: "brightness(0.4)", duration: 2.5, ease: "power3.out" }
      );

      // Logo monogram fade in
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.3 }
      );

      // Clip path text reveal (simulating a blind opening and light entering)
      const headline = headlineRef.current;
      if (headline) {
        gsap.fromTo(
          headline.querySelectorAll(".reveal-line"),
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.6,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.6,
          }
        );
      }

      // Subtext slide up and fade
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 0.9, y: 0, duration: 1.2, ease: "power3.out", delay: 1.2 }
      );

      // CTA Buttons reveal
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 1.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#sobre", { offset: 0, duration: 1.5 });
    }
  };

  const { openOrcamento } = useModal();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5515974018511?text=Gostaria%20de%20solicitar%20um%20or%C3%A7amento.", "_blank");
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark py-16 md:py-24"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        poster="/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55.jpeg" // Luxury fallback image
      >
        <source src="/video/WhatsApp Video 2026-05-20 at 11.38.54.mp4" type="video/mp4" />
      </video>

      {/* Luxury Vignette and Color Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/45 to-brand-dark/80 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-dark/90 z-10 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 z-20 flex flex-col items-center text-center pt-20 pb-28 md:pb-36">
        {/* Logo Real */}
        <div ref={logoRef} className="mb-6 flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <Image
              src="/images/logo/logo_clean_gold.png"
              alt="LONM DECOR Logo"
              fill
              sizes="96px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Cinematic Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-brand-cream leading-[1.15] tracking-wide mb-6 uppercase text-balance"
        >
          <div className="overflow-hidden inline-block w-full py-1">
            <span className="reveal-line inline-block">Transformando ambientes</span>
          </div>
          <br className="hidden sm:inline" />
          <div className="overflow-hidden inline-block w-full py-1">
            <span className="reveal-line inline-block text-brand-gold italic font-normal">
              com luz e sofisticação.
            </span>
          </div>
        </h1>

        {/* Refined Subtitle */}
        <p
          ref={subtextRef}
          className="max-w-xl text-xs sm:text-sm md:text-base text-brand-cream/80 font-light tracking-[0.15em] uppercase leading-relaxed mb-10 text-balance"
        >
          Persianas de alto padrão sob medida, motorização inteligente e controle térmico com assinatura arquitetônica.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={openOrcamento}
            className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-brand-dark text-[10px] tracking-[0.25em] uppercase rounded-sm font-semibold hover:bg-brand-cream hover:text-brand-dark transition-all duration-500 flex items-center justify-center gap-2.5 shadow-lg shadow-brand-gold/10 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Solicitar Orçamento
          </button>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto px-8 py-4 border border-brand-cream/30 text-brand-cream text-[10px] tracking-[0.25em] uppercase rounded-sm font-medium hover:bg-brand-cream/5 hover:border-brand-cream transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            {/* WhatsApp SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Conversar no WhatsApp
          </button>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
        <span className="text-[8px] tracking-[0.4em] text-brand-cream/45 uppercase mb-3.5">
          Descobrir
        </span>
        <a
          href="#sobre"
          onClick={handleScrollToProjects}
          className="w-8 h-8 rounded-full border border-brand-cream/15 flex items-center justify-center text-brand-cream/60 hover:text-brand-gold hover:border-brand-gold/60 transition-all duration-300 animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
