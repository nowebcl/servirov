"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Zap } from "lucide-react";

export function AppAbout() {
  return (
    <section id="nosotros" className="app-container py-12 sm:py-24">
      <div className="premium-card p-1 bg-slate-900 overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-slate-900">
          <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px]">
            <img 
              src="https://servirov.cl/wp-content/uploads/2023/07/101937092_556125008303097_8757925582611107975_n.jpg" 
              alt="Equipo" 
              className="absolute inset-0 w-full h-full object-cover rounded-[1.9rem]"
            />
          </div>
          <div className="p-6 sm:p-12 flex flex-col justify-center bg-white rounded-[1.2rem] sm:rounded-[2rem]">
            <span className="text-cyan-neon font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-2 opacity-50">Nosotros</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 mb-6 tracking-tight">Nuestra Filosofía</h2>
            <p className="text-base sm:text-lg text-slate-500 mb-8 sm:mb-10 leading-relaxed opacity-90">
              No solo operamos robots. Redefinimos la seguridad submarina con un equipo apasionado y tecnología que desafía los límites.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-3">
                <Shield className="text-cyan-neon" size={24} />
                <h4 className="font-bold text-navy-950">Seguridad</h4>
                <p className="text-slate-600 text-sm">Protocolos nivel militar.</p>
              </div>
              <div className="space-y-3">
                <Target className="text-cyan-neon" size={24} />
                <h4 className="font-bold text-navy-950">Precisión</h4>
                <p className="text-slate-600 text-sm">Margen de error cero.</p>
              </div>
              <div className="space-y-3">
                <Zap className="text-cyan-neon" size={24} />
                <h4 className="font-bold text-navy-950">Agilidad</h4>
                <p className="text-slate-600 text-sm">Respuesta inmediata.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
