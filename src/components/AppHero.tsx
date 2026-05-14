"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play, ArrowUpRight } from "lucide-react";

export function AppHero() {
  return (
    <section id="inicio" className="w-full app-container pt-4 sm:pt-8 pb-8 sm:pb-12">
      <div className="relative h-[500px] sm:h-[700px] w-full rounded-[2rem] sm:rounded-[3rem] bg-navy-950 shadow-2xl border border-white/10 overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/src/videofondo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-20 z-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/src/logo.png" 
                alt="Logo" 
                className="h-8 w-auto brightness-0 invert opacity-80"
              />
            </div>

            <h1 className="text-3xl sm:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              Ingeniería <br />
              <span className="text-cyan-neon font-medium italic opacity-90">Submarina</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto bg-white/95 text-navy-950 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-cyan-neon hover:text-white transition-all duration-500 shadow-sm">
                Contactar Ahora
              </button>
              <button className="w-full sm:w-auto bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-white/10 transition-all">
                Saber más
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
