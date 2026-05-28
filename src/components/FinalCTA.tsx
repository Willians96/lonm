"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { useModal } from "@/lib/ModalContext";

export default function FinalCTA() {
  const { openOrcamento } = useModal();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5515974018511?text=Gostaria%20de%20solicitar%20um%20or%C3%A7amento.", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/lonm_decor", "_blank");
  };

  return (
    <section
      id="contato"
      className="relative py-28 md:py-36 bg-brand-dark text-brand-cream overflow-hidden border-t border-brand-gold/10"
    >
      {/* Editorial background gradient mimicking a window light beam */}
      <div className="absolute left-[15%] top-0 w-[70%] h-full bg-gradient-to-b from-brand-gold/5 via-brand-gold/0 to-transparent pointer-events-none" />
      <div className="absolute right-[-20%] bottom-[-20%] w-[600px] h-[600px] rounded-full bg-brand-gold/2 blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        
        {/* Decorative logo top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex flex-col items-center"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Image
              src="/images/logo/logo_clean_gold.png"
              alt="LONM DECOR Logo"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
        
        </motion.div>

        {/* Cinematic core message */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-brand-cream leading-snug tracking-wide uppercase text-balance max-w-4xl mb-6"
        >
          Seu ambiente merece <br />
          <span className="italic text-brand-gold font-normal lowercase">conforto, sofisticação e personalidade.</span>
        </motion.h2>

        {/* Refined supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
          className="max-w-xl text-xs sm:text-sm text-brand-cream/70 font-light tracking-[0.15em] uppercase leading-relaxed mb-12 text-balance"
        >
          Agende uma consultoria técnica exclusiva no local. Levamos nosso catálogo técnico, tiramos as medidas a laser e criamos um projeto luminotécnico ideal para seu espaço.
        </motion.p>

        {/* Golden Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={openOrcamento}
            className="w-full sm:w-auto px-10 py-5 bg-brand-gold text-brand-dark text-xs tracking-[0.25em] uppercase rounded-sm font-bold hover:bg-brand-cream hover:text-brand-dark transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-brand-gold/15"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            Solicitar Orçamento
          </button>
          
          <button
            onClick={handleInstagramClick}
            className="w-full sm:w-auto px-10 py-5 border border-brand-cream/20 text-brand-cream text-xs tracking-[0.25em] uppercase rounded-sm font-medium hover:bg-brand-cream/5 hover:border-brand-cream transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-brand-gold">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            Seguir @lonm_decor
          </button>
        </motion.div>

        {/* Quick Contacts line */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-[10px] tracking-widest text-brand-cream/45 uppercase font-light">
          <span>Telefone: (15) 97401-8511</span>
          <span className="hidden sm:inline text-brand-gold/30">•</span>
          <span>Sorocaba · Campinas · Região</span>
        </div>

      </div>
    </section>
  );
}
