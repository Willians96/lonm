"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Sun, Sunset } from "lucide-react";

export default function LightControl() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section
      id="controle-luz"
      className="py-24 md:py-32 bg-brand-dark text-brand-cream relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-[10px] tracking-[0.3em] text-brand-gold font-semibold uppercase mb-4 block">
            A Experiência do Controle
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase">
            Do sol escaldante à <span className="italic text-brand-gold font-normal lowercase">penumbra perfeita.</span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-cream/70 font-light mt-6 max-w-xl mx-auto leading-relaxed">
            Arraste o cursor central na imagem abaixo para simular a atenuação solar térmica de até 90% obtida pelas nossas persianas inteligentes, criando frescor e bem-estar.
          </p>
        </div>

        {/* Interactive Image Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[360px] sm:h-[480px] md:h-[600px] rounded-sm overflow-hidden select-none cursor-ew-resize shadow-2xl border border-brand-gold/15"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Lado B (Depois) - Penumbra Harmoniosa */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55.jpeg"
              alt="Ambiente com luz controlada e persiana sob medida"
              fill
              sizes="100vw"
              className="object-cover pointer-events-none"
              priority
            />
            {/* Tag Badge */}
            <div className="absolute bottom-6 right-6 z-20 px-3 py-1.5 glass-panel rounded-xs flex items-center gap-2 border border-brand-gold/25 font-light text-[9px] tracking-wider uppercase text-brand-gold">
              <Sunset className="w-3.5 h-3.5" />
              Luz Suave & Térmica (LONM DECOR)
            </div>
          </div>

          {/* Lado A (Antes) - Sol Forte (com clip path dinâmico baseado na sliderPosition) */}
          <div
            className="absolute inset-0 w-full h-full z-10 overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <Image
              src="/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54 (1).jpeg"
              alt="Ambiente exposto a sol forte sem controle térmico"
              fill
              sizes="100vw"
              className="object-cover pointer-events-none"
              priority
            />
            {/* Tag Badge */}
            <div className="absolute bottom-6 left-6 z-20 px-3 py-1.5 bg-brand-cream/80 backdrop-blur-md rounded-xs flex items-center gap-2 border border-brand-black/15 font-light text-[9px] tracking-wider uppercase text-brand-black">
              <Sun className="w-3.5 h-3.5 text-orange-500" />
              Sol Direto & Calor Excessivo
            </div>
          </div>

          {/* Divisor Visual (Slider Line) */}
          <div
            className="absolute top-0 bottom-0 z-20 w-[1px] bg-brand-gold/60 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Glass Handle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-panel flex items-center justify-center border border-brand-gold shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                <path d="m9 18-6-6 6-6" />
                <path d="m15 6 6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dynamic Instructional Indicator under the slider */}
        <div className="mt-8 flex justify-between items-center max-w-sm mx-auto text-brand-cream/55 text-[10px] tracking-widest uppercase">
          <span>← Calor solar</span>
          <span className="text-brand-gold font-light tracking-[0.2em]">Arraste o Divisor</span>
          <span>Sombra elegante →</span>
        </div>

      </div>
    </section>
  );
}
