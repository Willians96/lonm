"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageSquare, MapPin, Mail } from "lucide-react";

export default function Footer() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5515974018511", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/lonm_decor", "_blank");
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(id, { offset: 0, duration: 1.5 });
    }
  };

  return (
    <footer className="bg-brand-dark text-brand-cream/80 border-t border-brand-cream/5 py-16 md:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1 - Brand description */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="#" className="flex items-center gap-3 group mb-6">
              <div className="relative w-8 h-8 flex-shrink-0 transition-all duration-300">
                <Image
                  src="/images/logo/logo_clean_gold.png"
                  alt="LONM DECOR Logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-[0.3em] font-bold text-brand-cream uppercase leading-none">
                  LONM DECOR
                </span>
                <span className="text-[8px] tracking-[0.4em] text-brand-gold font-light uppercase mt-1">
                  Persianas Rolô
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-brand-cream/65 leading-relaxed font-light mb-8 max-w-sm">
              Especialistas em alfaiataria de persianas sob medida e cortinas modernas. Unimos a engenharia de precisão com a sofisticação escandinava para criar ambientes repletos de luz natural e conforto térmico.
            </p>

            {/* Social Links Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleInstagramClick}
                className="w-9 h-9 rounded-full border border-brand-cream/10 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors duration-300 cursor-pointer"
                aria-label="Instagram LONM DECOR"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="w-9 h-9 rounded-full border border-brand-cream/10 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center transition-colors duration-300 cursor-pointer"
                aria-label="WhatsApp LONM DECOR"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-brand-gold font-semibold mb-6">
              Navegação
            </h4>
            <ul className="flex flex-col gap-4 text-xs font-light">
              <li>
                <a
                  href="#sobre"
                  onClick={(e) => handleScrollToSection(e, "#sobre")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  O Conceito
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  onClick={(e) => handleScrollToSection(e, "#servicos")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  Nossos Sistemas
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  onClick={(e) => handleScrollToSection(e, "#galeria")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  Galeria de Projetos
                </a>
              </li>
              <li>
                <a
                  href="#controle-luz"
                  onClick={(e) => handleScrollToSection(e, "#controle-luz")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  Controle Lumínico
                </a>
              </li>
              <li>
                <a
                  href="#depoimentos"
                  onClick={(e) => handleScrollToSection(e, "#depoimentos")}
                  className="hover:text-brand-gold transition-colors duration-300"
                >
                  Clientes Reais
                </a>
              </li>
              <li>
                <a
                  href="https://www.lonmdecor.com.br/studio"
                  className="hover:text-brand-gold transition-colors duration-300 font-medium"
                >
                  Painel Administrativo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Physical Contacts & Map info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-brand-gold font-semibold mb-6">
              Escritório Técnico
            </h4>
            <ul className="flex flex-col gap-4 text-xs font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Av. Pedro Bifano, nº 114 - Wanel Ville<br />
                  Sorocaba - SP · CEP 18053-500
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>
                  WhatsApp: (15) 97401-8511<br />
                  Segunda a Sábado, 8h às 18h
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold flex-shrink-0 mt-0.5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Instagram: @lonm_decor</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:lonmservice@gmail.com" className="hover:text-brand-gold transition-colors duration-300">
                  lonmservice@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="mt-16 pt-8 border-t border-brand-cream/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] tracking-widest text-brand-cream/35 uppercase font-light">
          <p>© {new Date().getFullYear()} LONM DECOR. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link href="https://www.lonmdecor.com.br" className="hover:text-brand-gold transition-colors">
              www.lonmdecor.com.br
            </Link>
            <span className="hidden sm:inline">|</span>
            <span>CNPJ: Sob medida para sua casa</span>
            <span className="hidden sm:inline">|</span>
            <Link href="https://www.lonmdecor.com.br/studio" className="hover:text-brand-gold transition-colors">
              Painel Administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
