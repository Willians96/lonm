"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Eye, EyeOff, Layers, Settings, Shield } from "lucide-react";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

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
  }, []);

  const services = [
    {
      title: "Persianas Rolô Translúcidas",
      subtitle: "Tela Screen 1% e 3%",
      desc: "Desenvolvidas em material nobre (75% poliéster e 25% PVC), as telas Screen regulam a entrada solar com precisão, reduzem o calor e mantêm a privacidade sem perder a vista do horizonte.",
      image: "/images/translucent/WhatsApp Image 2026-05-20 at 11.38.56 (2).jpeg",
      icon: <Eye className="w-5 h-5 text-brand-gold" />,
      spec: "Redução de até 90% dos raios UV"
    },
    {
      title: "Persianas Rolô Blackout",
      subtitle: "Bloqueio Solar 100%",
      desc: "Proteção total contra a claridade. Ideal para dormitórios, salas de conferência e home theaters, oferecendo um escurecimento impecável, isolamento térmico e privacidade máxima.",
      image: "/images/blackout/WhatsApp Image 2026-05-20 at 11.38.58 (2).jpeg",
      icon: <EyeOff className="w-5 h-5 text-brand-gold" />,
      spec: "Opacidade e isolamento térmico total"
    },
    {
      title: "Persianas Double Vision",
      subtitle: "Controle Fluido de Luz",
      desc: "Compostas por faixas horizontais translúcidas e opacas que deslizam de forma alternada, oferecem infinitos níveis de luminosidade e sofisticação em um design de linhas minimalistas.",
      image: "/images/double-vision/WhatsApp Image 2026-05-20 at 11.38.57 (1).jpeg",
      icon: <Layers className="w-5 h-5 text-brand-gold" />,
      spec: "Mecanismo duplo de alta precisão"
    },
    {
      title: "Cortinas Modernas",
      subtitle: "Fluidez e Caimento Editorial",
      desc: "Confecção sob medida em tecidos nobres, leves ou encorpados. Perfeitas para sobreposição com persianas rolô, trazendo aconchego acústico, textura e uma assinatura elegante aos ambientes.",
      image: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (1).jpeg",
      icon: <Layers className="w-5 h-5 text-brand-gold" />,
      spec: "Design fluido e caimento arquitetônico"
    },
    {
      title: "Persianas Motorizadas & Smart",
      subtitle: "Automação por Voz e Wi-Fi",
      desc: "Equipadas com motores silenciosos de alta tecnologia. Controle seus ambientes por controle remoto, aplicativo ou comando de voz integrado com Alexa, Google Home e sistemas smart home.",
      image: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54.jpeg",
      icon: <Cpu className="w-5 h-5 text-brand-gold" />,
      spec: "Compatível com Alexa e Google Home"
    },
    {
      title: "Instalação & Suporte Técnico",
      subtitle: "Precisão Milimétrica Certificada",
      desc: "Instalação realizada por especialistas com ferramentas a laser, garantindo alinhamento perfeito, estabilidade e limpeza absoluta. Suporte pós-venda, ajustes e manutenção preventiva premium.",
      image: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (3).jpeg",
      icon: <Settings className="w-5 h-5 text-brand-gold" />,
      spec: "Alinhamento a laser com zero poeira"
    },
  ];

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
          <div className="w-[80px] h-[1px] bg-brand-gold/40 mt-8" />
        </div>

        {/* Asymmetrical Grid of Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-[#121211] rounded-sm overflow-hidden border border-brand-gold/5 flex flex-col h-[520px] shadow-lg transition-all duration-700 hover:border-brand-gold/30 hover:shadow-brand-gold/5"
            >
              {/* Image Container with Zoom */}
              <div className="relative w-full h-[240px] overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/10 transition-all duration-700 z-10" />
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-108"
                />
                
                {/* Float Icon */}
                <div className="absolute bottom-4 right-4 z-20 w-9 h-9 glass-panel rounded-xs flex items-center justify-center border border-brand-gold/20">
                  {service.icon}
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
                    {service.desc}
                  </p>
                </div>

                {/* Card Specification Bottom Footer */}
                <div className="mt-6 pt-4 border-t border-brand-gold/10 flex items-center justify-between">
                  <span className="text-[9px] tracking-[0.1em] text-brand-gold/80 font-light uppercase">
                    {service.spec}
                  </span>
                  
                  {/* Miniature brand marker */}
                  <span className="text-[8px] text-brand-cream/35 tracking-widest uppercase">
                    LD
                  </span>
                </div>
              </div>

              {/* High-end hover gold glow borders (absolute position) */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
