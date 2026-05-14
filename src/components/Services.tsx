"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Droplets, Search, Anchor, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Servicio de Robótica (ROV)",
    description: "Operaciones submarinas de alta precisión, soporte técnico especializado y ejecución eficiente en terreno mediante tecnología robótica de vanguardia.",
    icon: Camera,
    color: "from-cyan-500/20 to-blue-600/20",
    accent: "text-cyan-400"
  },
  {
    title: "Buceo Profesional",
    description: "Intervención segura y apoyo operativo directo. Personal certificado para las condiciones más exigentes del entorno marino.",
    icon: Droplets,
    color: "from-blue-500/20 to-indigo-600/20",
    accent: "text-blue-400"
  },
  {
    title: "Inspección Submarina",
    description: "Extracción de mortalidad, revisión exhaustiva de centros de cultivo y monitoreo estructural con equipos de alta resolución.",
    icon: Search,
    color: "from-teal-500/20 to-cyan-600/20",
    accent: "text-teal-400"
  },
  {
    title: "Alimentación y Apoyo",
    description: "Asistencia manual y técnica integral para asegurar la continuidad operacional de su centro de cultivo en todo momento.",
    icon: Anchor,
    color: "from-sky-500/20 to-blue-500/20",
    accent: "text-sky-400"
  }
];

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-neon/5 rounded-full blur-[100px] -mr-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -ml-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-navy-950"
          >
            Nuestros <span className="text-cyan-neon">Servicios</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Combinamos experiencia humana y tecnología de punta para ofrecer soluciones integrales en el entorno submarino.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-3xl flex flex-col items-start group bg-white border border-slate-100 shadow-sm"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br shadow-inner",
                service.color
              )}>
                <service.icon className={cn("w-8 h-8", service.accent)} />
              </div>
              <h3 className="text-2xl font-bold text-navy-950 mb-4 group-hover:text-cyan-neon transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              <button className="mt-auto flex items-center text-sm font-bold tracking-widest uppercase text-cyan-neon group/btn">
                Saber Más 
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
