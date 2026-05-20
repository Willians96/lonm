"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  const images = [
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55.jpeg",
      title: "Residência Contemporânea",
      subtitle: "Persianas Rolô em Sala de Estar",
      span: "md:col-span-2 md:row-span-2",
      aspect: "aspect-[16/10] md:aspect-auto md:h-[620px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54 (1).jpeg",
      title: "Luz e Sombra na Sacada",
      subtitle: "Persianas Rolô Screen de Alta Performance",
      span: "md:col-span-1 md:row-span-2",
      aspect: "aspect-[4/5] md:aspect-auto md:h-[620px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.53.jpeg",
      title: "Cozinha Funcional",
      subtitle: "Persiana Rolô Translúcida Lavável",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square md:h-[300px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54 (2).jpeg",
      title: "Apartamento Wanel Ville",
      subtitle: "Kit Duplo Persianas Blackout & Screen",
      span: "md:col-span-2 md:row-span-1",
      aspect: "aspect-[16/9] md:aspect-auto md:h-[300px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (1).jpeg",
      title: "Living Sofisticado",
      subtitle: "Composição com Cortinas Fluidas",
      span: "md:col-span-1 md:row-span-2",
      aspect: "aspect-[3/4] md:aspect-auto md:h-[600px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (4).jpeg",
      title: "Quarto Casal Premium",
      subtitle: "Persianas Blackout Motorizadas Alexa",
      span: "md:col-span-2 md:row-span-2",
      aspect: "aspect-[4/3] md:aspect-auto md:h-[600px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54.jpeg",
      title: "Escritório Executivo",
      subtitle: "Persiana Rolô Motorizada com Controle",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-video md:h-[280px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (3).jpeg",
      title: "Detalhamento Técnico",
      subtitle: "Trilhos em Alumínio com Acabamento Ouro",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square md:h-[280px]"
    },
    {
      src: "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (2).jpeg",
      title: "Varanda Integrada",
      subtitle: "Fechamento Completo em Persiana Rolô",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square md:h-[280px]"
    }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx - 1 + images.length) % images.length);
    }
  };

  return (
    <section
      id="galeria"
      className="py-24 md:py-32 bg-brand-cream text-brand-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.3em] text-[#7C6235] font-semibold uppercase mb-4 block">
              Nosso Portfólio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase">
              Projetos Realizados e <br />
              <span className="italic text-[#7C6235] font-normal lowercase">ambientes transformados.</span>
            </h2>
          </div>
          
          <div className="mt-6 md:mt-0 max-w-sm">
            <p className="text-[13px] text-brand-black/75 leading-relaxed font-normal">
              Explorar a harmonia de cada projeto real concluído pela nossa equipe. Fotos autênticas de ambientes de clientes reais que ganharam conforto, sofisticação e controle de luminosidade.
            </p>
          </div>
        </div>

        {/* Asymmetric Masonry Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-max">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              onClick={() => setSelectedImageIdx(index)}
              className={`group relative overflow-hidden rounded-xs bg-brand-dark/5 shadow-md cursor-pointer ${image.span} ${image.aspect}`}
            >
              {/* Zoom Trigger Layer */}
              <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/5 transition-all duration-700 z-10" />
              
              {/* Gold light leak effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500 z-10" />
              
              {/* Image asset */}
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-104"
              />

              {/* Float Glass Magnifier Icon */}
              <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xs glass-panel opacity-0 transform translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center border border-brand-gold/25">
                <ZoomIn className="w-3.5 h-3.5 text-brand-gold" />
              </div>

              {/* Title Card Info (reveals smoothly on hover) */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end text-brand-cream transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[9px] tracking-[0.2em] uppercase text-brand-gold font-medium mb-1.5 block">
                  {image.subtitle}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-light tracking-wide uppercase">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIdx(null)}
            className="fixed inset-0 z-50 bg-brand-dark/98 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-6 right-6 text-brand-cream hover:text-brand-gold transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark/50 border border-brand-cream/10"
              aria-label="Fechar Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 text-brand-cream hover:text-brand-gold transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark/50 border border-brand-cream/10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image display */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative max-w-5xl w-full h-[70vh] md:h-[80vh] flex flex-col justify-center items-center pointer-events-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={images[selectedImageIdx].src}
                  alt={images[selectedImageIdx].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Image Description inside Modal */}
              <div className="mt-4 text-center select-none pointer-events-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-gold block mb-1">
                  {images[selectedImageIdx].subtitle}
                </span>
                <h4 className="font-serif text-lg md:text-xl text-brand-cream uppercase tracking-wider font-light">
                  {images[selectedImageIdx].title}
                </h4>
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 text-brand-cream hover:text-brand-gold transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark/50 border border-brand-cream/10"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
