"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Camera, Droplets, Search, Anchor, ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Robótica ROV",
    desc: "Operaciones de alta precisión con tecnología de punta para inspecciones profundas y recuperación.",
    icon: Camera,
    className: "md:col-span-3 md:row-span-2 bg-white",
    image: "https://servirov.cl/wp-content/uploads/2023/07/WhatsApp-Image-2023-06-28-at-1.00.15-PM.jpeg",
    accent: "text-cyan-neon"
  },
  {
    title: "Buceo Profesional",
    desc: "Equipo certificado para trabajos complejos en centros de cultivo.",
    icon: Droplets,
    className: "md:col-span-1 md:row-span-2 bg-navy-950 text-white",
    image: "https://servirov.cl/wp-content/uploads/2023/07/101937092_556125008303097_8757925582611107975_n.jpg",
    accent: "text-white"
  },
  {
    title: "Inspección Técnica",
    desc: "Análisis estructural y control de mortalidad mediante sensores avanzados.",
    icon: Search,
    className: "md:col-span-2 md:row-span-1 bg-slate-50",
    image: null,
    accent: "text-cyan-neon"
  },
  {
    title: "Logística y Soporte",
    desc: "Asistencia 24/7 y gestión de activos submarinos.",
    icon: Anchor,
    className: "md:col-span-2 md:row-span-1 bg-white",
    image: null,
    accent: "text-cyan-neon"
  }
];

export function BentoServices() {
  return (
    <section id="servicios" className="app-container py-24 sm:py-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-10 h-[1px] bg-cyan-neon" />
            <span className="text-navy-900 font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs">División de Operaciones</span>
          </motion.div>
          <h2 className="text-4xl sm:text-7xl font-bold text-navy-950 tracking-tighter leading-none">
            Soluciones de <br />
            <span className="text-slate-500">Ingeniería Aplicada</span>
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <p className="text-slate-500 max-w-xs md:text-right text-sm sm:text-base leading-relaxed">
            Desplegamos tecnología de vanguardia para garantizar la continuidad operativa en entornos extremos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`premium-card p-8 sm:p-10 flex flex-col justify-between group overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-700 ${s.className} rounded-[2rem] border border-slate-100/50`}
          >
            {s.image && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={s.image} 
                  className="w-full h-full object-cover opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-[3s] ease-out"
                  alt=""
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  s.className.includes('bg-navy-950') ? "from-transparent to-navy-950/80" : "from-transparent to-slate-200/50"
                )} />
              </div>
            )}
            
            <div className="relative z-10">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform duration-500 group-hover:scale-110",
                s.className.includes('bg-navy-950') ? 'bg-white/10' : 'bg-slate-50'
              )}>
                <s.icon size={28} className={s.accent} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{s.title}</h3>
              <p className={cn(
                "text-base leading-relaxed max-w-[280px] transition-opacity duration-500",
                s.className.includes('text-white') ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-navy-950'
              )}>
                {s.desc}
              </p>
            </div>
            
            <div className="mt-12 flex justify-between items-center relative z-10">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0",
                s.className.includes('text-white') ? 'text-cyan-neon' : 'text-navy-950'
              )}>
                Detalles Técnicos
              </span>
              <div className={cn(
                "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:bg-cyan-neon group-hover:border-cyan-neon group-hover:text-white",
                s.className.includes('text-white') ? 'border-white/20 text-white' : 'border-slate-200 text-navy-950'
              )}>
                <ArrowUpRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
