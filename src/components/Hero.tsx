"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Ocean Background Placeholder/Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/60 z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://servirov.cl/wp-content/uploads/2023/07/101939144_556124918303106_3776436333504564512_n.jpg')] bg-cover bg-center"
          style={{ filter: "brightness(1.1) saturate(0.8)" }}
        />
        {/* Animated Particles/Bubbles simulation */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-neon/20 rounded-full blur-xl"
              initial={{ 
                width: Math.random() * 100 + 50, 
                height: Math.random() * 100 + 50,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0.1
              }}
              animate={{
                y: [null, "-20%"],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-neon/10 border border-cyan-neon/20 text-cyan-neon text-sm font-bold tracking-widest uppercase mb-6">
              Líderes en Tecnología Submarina
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="text-navy-950">Soluciones Submarinas y</span><br />
              <span className="text-gradient">Robótica Avanzada</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
              Precisión, seguridad y eficiencia en cada inmersión. Especialistas en operaciones con ROV y buceo profesional para la industria acuícola.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="w-full sm:w-auto bg-cyan-neon text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-navy-900 transition-all flex items-center justify-center group shadow-xl shadow-cyan-neon/20">
                Explorar Servicios
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white border border-slate-200 text-navy-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                <Play className="mr-2 fill-navy-950" size={18} />
                Ver Operaciones
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-neon to-transparent" />
      </motion.div>
    </section>
  );
}
