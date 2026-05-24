"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

interface SanityGalleryItem {
  _id: string;
  order: number;
  title: string;
  subtitle: string;
  image: SanityImageSource | null;
}

// Grid layout configs for the asymmetric masonry grid
const gridLayouts = [
  { span: "md:col-span-2 md:row-span-2", aspect: "aspect-[16/10] md:aspect-auto md:h-[620px]" },
  { span: "md:col-span-1 md:row-span-2", aspect: "aspect-[4/5] md:aspect-auto md:h-[620px]" },
  { span: "md:col-span-1 md:row-span-1", aspect: "aspect-square md:h-[300px]" },
  { span: "md:col-span-2 md:row-span-1", aspect: "aspect-[16/9] md:aspect-auto md:h-[300px]" },
  { span: "md:col-span-1 md:row-span-2", aspect: "aspect-[3/4] md:aspect-auto md:h-[600px]" },
  { span: "md:col-span-2 md:row-span-2", aspect: "aspect-[4/3] md:aspect-auto md:h-[600px]" },
  { span: "md:col-span-1 md:row-span-1", aspect: "aspect-video md:h-[280px]" },
  { span: "md:col-span-1 md:row-span-1", aspect: "aspect-square md:h-[280px]" },
  { span: "md:col-span-1 md:row-span-1", aspect: "aspect-square md:h-[280px]" },
];

// Fallback local images while Sanity photos are not uploaded yet
const fallbackSrcs = [
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55.jpeg",
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54 (1).jpeg",
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.53.jpeg",
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54 (2).jpeg",
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (1).jpeg",
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (4).jpeg",
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.54.jpeg",
  "/images/gallery/WhatsApp Image 2026-05-20 at 11.38.55 (3).jpeg",
  "/images/gallery/new.jpeg",
];

const QUERY = `*[_type == "galleryItem"] | order(order asc) {
  _id, order, title, subtitle, image
}`;

export default function Gallery() {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);
  const [items, setItems] = useState<SanityGalleryItem[]>([]);

  useEffect(() => {
    client.fetch<SanityGalleryItem[]>(QUERY).then(setItems);
  }, []);

  const getImageSrc = (item: SanityGalleryItem, index: number): string => {
    if (item.image) return urlFor(item.image).width(1200).height(900).url();
    return fallbackSrcs[index] ?? "/images/gallery/new.jpeg";
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) setSelectedImageIdx((selectedImageIdx + 1) % items.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) setSelectedImageIdx((selectedImageIdx - 1 + items.length) % items.length);
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
              Projetos Realizados <br />
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
          {items.map((item, index) => {
            const layout = gridLayouts[index % gridLayouts.length];
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                onClick={() => setSelectedImageIdx(index)}
                className={`group relative overflow-hidden rounded-xs bg-brand-dark/5 shadow-md cursor-pointer ${layout.span} ${layout.aspect}`}
              >
                <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/5 transition-all duration-700 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500 z-10" />

                <Image
                  src={getImageSrc(item, index)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                  unoptimized={!!item.image}
                />

                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xs glass-panel opacity-0 transform translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center border border-brand-gold/25">
                  <ZoomIn className="w-3.5 h-3.5 text-brand-gold" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end text-brand-cream transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-brand-gold font-medium mb-1.5 block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-light tracking-wide uppercase">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIdx !== null && items[selectedImageIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIdx(null)}
            className="fixed inset-0 z-50 bg-brand-dark/98 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
          >
            <button
              onClick={() => setSelectedImageIdx(null)}
              className="absolute top-6 right-6 text-brand-cream hover:text-brand-gold transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark/50 border border-brand-cream/10"
              aria-label="Fechar Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 text-brand-cream hover:text-brand-gold transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full bg-brand-dark/50 border border-brand-cream/10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative max-w-5xl w-full h-[70vh] md:h-[80vh] flex flex-col justify-center items-center pointer-events-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={getImageSrc(items[selectedImageIdx], selectedImageIdx)}
                  alt={items[selectedImageIdx].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                  unoptimized={!!items[selectedImageIdx].image}
                />
              </div>

              <div className="mt-4 text-center select-none pointer-events-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-brand-gold block mb-1">
                  {items[selectedImageIdx].subtitle}
                </span>
                <h4 className="font-serif text-lg md:text-xl text-brand-cream uppercase tracking-wider font-light">
                  {items[selectedImageIdx].title}
                </h4>
              </div>
            </motion.div>

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
