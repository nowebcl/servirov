"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contacto" className="app-container py-12 sm:py-24">
      <div className="premium-card p-6 sm:p-16 bg-white overflow-hidden relative">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 relative z-10">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl sm:text-6xl font-bold text-navy-950 mb-4 sm:mb-6 tracking-tighter">Inicie su <br /><span className="text-cyan-neon">Proyecto</span></h2>
            <p className="text-slate-500 mb-8 sm:mb-10 text-base sm:text-lg">Nuestro equipo técnico responderá en tiempo récord.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Nombre"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-cyan-neon outline-none transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Empresa"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-cyan-neon outline-none transition-all"
                />
              </div>

              <input 
                type="email" 
                placeholder="Email"
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-cyan-neon outline-none transition-all"
              />

              <textarea 
                rows={4}
                placeholder="Mensaje"
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-navy-950 focus:ring-2 focus:ring-cyan-neon outline-none transition-all resize-none"
              />

              <button className="w-full bg-navy-950 text-white py-5 rounded-2xl font-bold text-lg hover:bg-cyan-neon transition-all flex items-center justify-center group">
                Enviar Solicitud
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-cyan-neon/10 rounded-2xl flex items-center justify-center text-cyan-neon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-navy-950 font-bold text-xl">Hornopirén</h4>
                  <p className="text-slate-500">El Tepual N°8, Hualaihué.</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-cyan-neon/10 rounded-2xl flex items-center justify-center text-cyan-neon">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-navy-950 font-bold text-xl">Teléfono</h4>
                  <p className="text-slate-500">+56 9 9629 9010</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-cyan-neon/10 rounded-2xl flex items-center justify-center text-cyan-neon">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-navy-950 font-bold text-xl">Email</h4>
                  <p className="text-slate-500">contacto@servirov.cl</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
