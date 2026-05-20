"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Compass, ShieldCheck, Sun } from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: <Sun className="w-5 h-5 text-[#7C6235]" />,
      title: "Gestão Térmica e de Luz",
      desc: "Proteção solar inteligente com telas Screen de 1% e 3% de abertura, aliando conforto e visibilidade.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#7C6235]" />,
      title: "Automação Integrada",
      desc: "Controle por comando manual, controle remoto ou automação completa por voz via Wi-Fi, Alexa e Google Home.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#7C6235]" />,
      title: "Alfaiataria em Persianas",
      desc: "Desenvolvimento 100% sob medida com tecidos importados e engenharia de alta durabilidade.",
    },
  ];

  return (
    <section
      id="sobre"
      className="py-24 md:py-32 bg-brand-cream text-brand-black relative overflow-hidden"
    >
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute left-[10%] top-0 w-[1px] h-full bg-brand-black" />
        <div className="absolute left-[50%] top-0 w-[1px] h-full bg-brand-black" />
        <div className="absolute right-[10%] top-0 w-[1px] h-full bg-brand-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Sophisticated Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <span className="text-[10px] tracking-[0.3em] text-[#7C6235] font-semibold uppercase mb-4">
              O Conceito LONM DECOR
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-brand-black tracking-wide leading-tight mb-8">
              Desenhamos a harmonia perfeita entre <br className="hidden sm:inline" />
              <span className="italic text-[#7C6235] font-normal">arquitetura, sombra e luz natural.</span>
            </h2>

            <div className="font-serif text-lg md:text-xl text-brand-black/90 font-light leading-relaxed mb-6">
              Acreditamos que uma persiana não é apenas um item funcional; ela é uma ferramenta de design que molda o caráter de um espaço, a temperatura do ambiente e o bem-estar de quem o habita.
            </div>

            <p className="text-[15px] text-brand-black/75 leading-relaxed font-normal mb-8 max-w-2xl">
              A LONM DECOR nasceu com o propósito de elevar a experiência de morar. Combinamos a precisão da engenharia sob medida com a estética minimalista escandinava. Trabalhamos exclusivamente com persianas de alta performance, incluindo tecidos nobres como o poliéster e PVC, estruturados para garantir bloqueio UV térmico e beleza intemporal aos seus ambientes.
            </p>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-gold/25 w-full">
              <div>
                <h4 className="font-serif text-3xl font-light text-[#7C6235] tracking-wide">100%</h4>
                <p className="text-xs tracking-[0.15em] text-brand-black/80 uppercase font-semibold mt-2">
                  Sob Medida
                </p>
              </div>
              <div>
                <h4 className="font-serif text-3xl font-light text-[#7C6235] tracking-wide">75% / 25%</h4>
                <p className="text-xs tracking-[0.15em] text-brand-black/80 uppercase font-semibold mt-2">
                  Poliéster & PVC Screen
                </p>
              </div>
              <div>
                <h4 className="font-serif text-3xl font-light text-[#7C6235] tracking-wide">Smart</h4>
                <p className="text-xs tracking-[0.15em] text-brand-black/80 uppercase font-semibold mt-2">
                  Wi-Fi, Alexa & Manual
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Premium Large Image Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-xs overflow-hidden group shadow-2xl"
          >
            {/* Soft sunlight filter overlay */}
            <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/0 transition-colors duration-700 z-10 pointer-events-none" />
            <Image
              src="/images/gallery/new.jpeg"
              alt="Instalação residencial sofisticada LONM DECOR"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              priority
            />
            {/* Architectural Border overlay */}
            <div className="absolute inset-6 border border-brand-cream/35 z-20 pointer-events-none transition-all duration-700 group-hover:inset-8" />
          </motion.div>

        </div>

        {/* Feature Cards Grid (Staggered scroll trigger) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col p-8 bg-brand-cream border border-brand-black/5 hover:border-brand-gold/20 transition-all duration-300 rounded-sm"
            >
              <div className="w-10 h-10 rounded-xs border border-[#7C6235]/30 flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <h3 className="font-serif text-lg font-medium text-brand-black mb-3">
                {stat.title}
              </h3>
              <p className="text-xs text-brand-black/75 leading-relaxed font-normal">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
