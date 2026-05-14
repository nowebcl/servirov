"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, Briefcase } from "lucide-react";

export function Impact() {
  return (
    <section id="impacto" className="app-container py-24">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-6xl font-bold mb-6 text-navy-950 tracking-tighter"
        >
          Impacto & <span className="text-cyan-neon">Comunidad</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Social Focus Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="premium-card p-8 md:p-12 overflow-hidden bg-white"
        >
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-slate-200">
              <img 
                src="https://servirov.cl/wp-content/uploads/2023/07/compromiso-social-comunidad.jpg" 
                alt="Compromiso Social" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-cyan-neon/10 p-4 rounded-2xl">
                <GraduationCap className="text-cyan-neon w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy-950">Formación y Futuro</h3>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Realizamos charlas de orientación y cursos de robótica submarina con un enfoque práctico para la comunidad de Hualaihué, facilitando la inserción laboral de jóvenes talentos en el sector acuícola.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <Users className="text-cyan-neon mb-2" size={20} />
                <p className="text-navy-950 font-bold">+50 Participantes</p>
                <p className="text-slate-500 text-xs">Cursos dictados</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <Briefcase className="text-cyan-neon mb-2" size={20} />
                <p className="text-navy-950 font-bold">80% Inserción</p>
                <p className="text-slate-500 text-xs">Laboral local</p>
              </div>
            </div>
          </motion.div>

          {/* Client Reference Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="premium-card p-8 md:p-12 flex flex-col justify-center bg-slate-900 text-white"
          >
            <h3 className="text-3xl font-bold mb-8">Nuestros Aliados</h3>
            <p className="text-slate-400 mb-10 text-lg">
              Trabajamos con líderes de la industria, asegurando estándares de calidad internacional en cada centro de cultivo.
            </p>
            <div className="grid grid-cols-2 gap-8 items-center">
              {/* Placeholder for Salmones Camanchaca */}
              <div className="h-20 bg-white/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="text-slate-500 font-bold text-sm">CAMANCHACA</span>
              </div>
              <div className="h-20 bg-white/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="text-slate-500 font-bold text-sm">PROVEEDORES LTDA</span>
              </div>
              <div className="h-20 bg-white/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="text-slate-500 font-bold text-sm">ACUICOLA SUR</span>
              </div>
              <div className="h-20 bg-white/5 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="text-slate-500 font-bold text-sm">MARINA TECH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
