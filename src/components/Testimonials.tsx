"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = [
    {
      quote: "O atendimento da LONM DECOR é impecável. Desde a consultoria técnica para escolher a tela Screen 3% ideal para nossa sacada, até a instalação a laser com precisão milimétrica. O resultado superou nossas expectativas, transformou o apartamento por completo!",
      author: "Mariana Mendes",
      location: "Campinas - SP",
      project: "Sacada Integrada com Persiana Rolô Translúcida"
    },
    {
      quote: "Decidimos automatizar todas as persianas blackout do quarto principal e a integração com a Alexa ficou maravilhosa. Acordar com a abertura gradual da luz é outro nível de conforto. A equipe técnica foi extremamente profissional, limpa e pontual.",
      author: "Dr. Ricardo Silveira",
      location: "Sorocaba - SP",
      project: "Dormitórios Master com Persianas Blackout Motorizadas"
    },
    {
      quote: "A qualidade do tecido e dos componentes é visível de longe. As persianas Double Vision que instalei na sala de jantar trouxeram uma sofisticação indescritível. O controle térmico funciona de verdade; a sala ficou muito mais fresca nos dias quentes.",
      author: "Patrícia Alencar",
      location: "Sorocaba - SP",
      project: "Sala de Jantar Social com Double Vision Sob Medida"
    }
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="depoimentos"
      className="py-24 md:py-32 bg-brand-cream text-brand-black relative overflow-hidden"
    >
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute left-[20%] top-0 w-[1px] h-full bg-brand-black" />
        <div className="absolute right-[20%] top-0 w-[1px] h-full bg-brand-black" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Monogram header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="text-[10px] tracking-[0.3em] text-[#7C6235] font-semibold uppercase mb-4">
            Depoimentos Reais
          </span>
          <div className="w-10 h-10 border border-[#7C6235]/40 flex items-center justify-center font-serif text-[#7C6235] text-base font-bold rounded-sm tracking-wider">
            LD
          </div>
        </div>

        {/* Big Editorial Quote Container */}
        <div className="relative min-h-[320px] sm:min-h-[260px] md:min-h-[220px] flex flex-col justify-center items-center text-center">
          {/* Background Decorative Quote Mark */}
          <div className="absolute top-0 opacity-[0.04] text-brand-gold pointer-events-none select-none">
            <Quote className="w-24 h-24" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-brand-black/95 text-balance max-w-4xl">
                “{testimonials[activeIdx].quote}”
              </blockquote>
              
              <div className="mt-8 flex flex-col items-center">
                <span className="text-sm font-semibold tracking-wider text-brand-black">
                  {testimonials[activeIdx].author}
                </span>
                <span className="text-xs tracking-[0.15em] text-brand-black/75 uppercase font-medium mt-1.5">
                  {testimonials[activeIdx].location} · <span className="text-brand-gold font-semibold">{testimonials[activeIdx].project}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="mt-12 flex justify-between items-center max-w-[200px] mx-auto pt-6 border-t border-brand-gold/10">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-brand-black/10 hover:border-brand-gold/50 flex items-center justify-center text-brand-black hover:text-brand-gold transition-all duration-300 cursor-pointer"
            aria-label="Depoimento Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Numbers pagination indicator */}
          <div className="font-serif text-sm text-brand-gold tracking-widest font-medium">
            {activeIdx + 1} <span className="text-brand-black/60 font-sans">/</span> {testimonials.length}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-brand-black/10 hover:border-brand-gold/50 flex items-center justify-center text-brand-black hover:text-brand-gold transition-all duration-300 cursor-pointer"
            aria-label="Próximo Depoimento"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
