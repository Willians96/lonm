"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Galeria", href: "#galeria" },
    { name: "Controle de Luz", href: "#controle-luz" },
    { name: "Contato", href: "#contato" },
  ];

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5515974018511", "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-brand-dark/85 backdrop-blur-md border-b border-brand-gold/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex-shrink-0 transition-all duration-300">
              <Image
                src="/images/logo/logo_clean_gold.png"
                alt="LONM DECOR Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.3em] font-bold text-brand-cream uppercase leading-none">
                LONM DECOR
              </span>
              <span className="text-[9px] tracking-[0.4em] text-brand-gold font-light uppercase mt-1">
                Persianas Rolô
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase font-light text-brand-cream/80 hover:text-brand-gold transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={handleWhatsAppClick}
              className="px-5 py-2.5 border border-brand-gold/45 text-brand-gold text-[10px] tracking-[0.2em] uppercase rounded-sm hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all duration-500 flex items-center gap-2 cursor-pointer font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Solicitar Orçamento
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-brand-cream hover:text-brand-gold transition-colors p-2"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark/98 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center">
          <div className="relative w-20 h-20 mb-4 mx-auto">
            <Image
              src="/images/logo/logo_clean_gold.png"
              alt="LONM DECOR Logo"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.1em] text-brand-cream hover:text-brand-gold transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleWhatsAppClick();
            }}
            className="mt-6 px-8 py-3 bg-brand-gold text-brand-dark text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-brand-cream hover:text-brand-dark transition-all duration-300 flex items-center gap-2 font-bold cursor-pointer"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            WhatsApp Orçamento
          </button>
        </nav>
      </div>
    </>
  );
}
