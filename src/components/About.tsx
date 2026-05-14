"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, Leaf } from "lucide-react";

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative border border-slate-200 shadow-xl">
              <img 
                src="https://servirov.cl/wp-content/uploads/2023/07/101937092_556125008303097_8757925582611107975_n.jpg" 
                alt="Equipo ServiRov" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl hidden md:block border border-slate-200 shadow-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-neon rounded-2xl flex items-center justify-center text-white">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-cyan-neon font-bold text-2xl">100%</p>
                  <p className="text-slate-500 text-sm">Compromiso en Seguridad</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-navy-950">
              Nosotros y Nuestra <br />
              <span className="text-cyan-neon">Filosofía</span>
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              En ServiRov, no solo operamos equipos; entregamos tranquilidad y resultados precisos. Nuestro personal altamente comprometido es el pilar de cada operación, garantizando la excelencia técnica en los entornos más desafiantes.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyan-neon/10 p-2 rounded-lg">
                  <CheckCircle2 className="text-cyan-neon w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-navy-950 font-bold text-xl mb-2">Respeto por la Normativa</h4>
                  <p className="text-slate-600">Cumplimos estrictamente con los estándares legales y técnicos vigentes.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyan-neon/10 p-2 rounded-lg">
                  <Shield className="text-cyan-neon w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-navy-950 font-bold text-xl mb-2">Seguridad Laboral</h4>
                  <p className="text-slate-600">Priorizamos la integridad de nuestro equipo y de las instalaciones en cada inmersión.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyan-neon/10 p-2 rounded-lg">
                  <Leaf className="text-cyan-neon w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-navy-950 font-bold text-xl mb-2">Cuidado del Medio Ambiente</h4>
                  <p className="text-slate-600">Operamos de manera responsable para minimizar el impacto en el ecosistema marino.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
