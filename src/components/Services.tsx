"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Eye, EyeOff, Layers, Settings, Shield } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

interface SanityService {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  spec: string;
  image: SanityImageSource | null;
  iconName: string;
  order: number;
}

// Fallback local images if Sanity image not set yet
const fallbackImages: Record<string, string> = {
  "service-1": "/images/translucent/Translucidas.jpeg",
  "service-2": "/images/blackout/WhatsApp Image 2026-05-20 at 11.38.58 (2).jpeg",
  "service-3": "/images/double-vision/WhatsApp Image 2026-05-20 at 11.38.57 (1).jpeg",
  "service-4": "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (1).jpeg",
  "service-5": "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54.jpeg",
  "service-6": "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (3).jpeg",
};

const iconMap: Record<string, React.ReactNode> = {
  Eye: <Eye className="w-5 h-5 text-brand-gold" />,
  EyeOff: <EyeOff className="w-5 h-5 text-brand-gold" />,
  Layers: <Layers className="w-5 h-5 text-brand-gold" />,
  Shield: <Shield className="w-5 h-5 text-brand-gold" />,
  Cpu: <Cpu className="w-5 h-5 text-brand-gold" />,
  Settings: <Settings className="w-5 h-5 text-brand-gold" />,
};

const QUERY = `*[_type == "service"] | order(order asc) {
  _id, title, subtitle, description, spec, image, iconName, order
}`;

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<SanityService[]>([]);

  // Fetch from Sanity
  useEffect(() => {
    client.fetch<SanityService[]>(QUERY).then(setServices);
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!services.length || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const cards = cardsRef.current?.children;
    if (!cards) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [services]);

  const getImageSrc = (service: SanityService): string => {
    if (service.image) {
      return urlFor(service.image).width(600).height(480).url();
    }
    return fallbackImages[service._id] ?? "/images/gallery/new.jpeg";
  };

  return (
    <section
      ref={containerRef}
      id="servicos"
      className="py-24 md:py-32 bg-brand-dark text-brand-cream relative overflow-hidden"
    >
      {/* Decorative background light source */}
      <div className="absolute right-[-10%] top-[20%] w-[500px] h-[500px] rounded-full bg-brand-gold/2 blur-[180px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[10%] w-[500px] h-[500px] rounded-full bg-brand-gold/2 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] tracking-[0.3em] text-brand-gold font-semibold uppercase mb-4 block">
            Nossas Soluções
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-tight uppercase">
            Sistemas sofisticados de controle <br className="hidden sm:inline" />
            <span className="italic text-brand-gold font-normal lowercase">de iluminação e bem-estar.</span>
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {services.map((service) => (
            <div
              key={service._id}
              className="group relative bg-[#121211] rounded-sm overflow-hidden border border-brand-gold/5 flex flex-col h-[520px] shadow-lg transition-all duration-700 hover:border-brand-gold/30 hover:shadow-brand-gold/5"
            >
              {/* Image Container with Zoom */}
              <div className="relative w-full h-[240px] overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/10 transition-all duration-700 z-10" />
                <Image
                  src={getImageSrc(service)}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                  unoptimized={!!service.image}
                />
                {/* Float Icon */}
                <div className="absolute bottom-4 right-4 z-20 w-9 h-9 glass-panel rounded-xs flex items-center justify-center border border-brand-gold/20">
                  {iconMap[service.iconName] ?? <Eye className="w-5 h-5 text-brand-gold" />}
                </div>
              </div>

              {/* Text / Body Content */}
              <div className="p-8 flex flex-col flex-grow justify-between relative">
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-brand-gold font-medium">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-brand-cream mt-2 mb-4 group-hover:text-brand-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs text-brand-cream/70 leading-relaxed font-light line-clamp-4">
                    {service.description}
                  </p>
                </div>

                {/* Card Specification Bottom Footer */}
                <div className="mt-6 pt-4 border-t border-brand-gold/10 flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.1em] text-brand-gold/80 font-light uppercase">
                    {service.spec}
                  </span>
                  <span className="text-[8px] text-brand-cream/35 tracking-widest uppercase">LD</span>
                </div>
              </div>

              {/* Hover gold glow borders */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
