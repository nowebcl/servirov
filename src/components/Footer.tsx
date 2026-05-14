"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Users, Camera, Share2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-slate-100">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Social */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img 
                src="/src/logo.png" 
                alt="Logo" 
                className="h-8 w-auto opacity-90"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Robótica submarina de alta precisión para la industria acuícola.
            </p>
            <div className="flex gap-3">
              {[Briefcase, Users, Camera].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-300 hover:text-cyan-neon transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Minimal Links */}
          <div className="md:text-center">
            <h4 className="text-navy-950 font-bold text-xs uppercase tracking-widest mb-6">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#inicio" className="text-slate-400 hover:text-navy-950 transition-colors">Inicio</Link></li>
              <li><Link href="#servicios" className="text-slate-400 hover:text-navy-950 transition-colors">Servicios</Link></li>
              <li><Link href="#nosotros" className="text-slate-400 hover:text-navy-950 transition-colors">Nosotros</Link></li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div className="md:text-right">
            <h4 className="text-navy-950 font-bold text-xs uppercase tracking-widest mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-400">Hornopirén, Chile</li>
              <li><a href="mailto:contacto@servirov.cl" className="text-slate-400 hover:text-navy-950 transition-colors">contacto@servirov.cl</a></li>
              <li><a href="tel:+56996299010" className="text-slate-400 hover:text-navy-950 transition-colors">+56 9 9629 9010</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 font-medium">
          <p>© {currentYear} ServiRov SPA.</p>
          <p className="mt-4 md:mt-0">
            desarrollado por <a href="https://www.noweb.cl" target="_blank" rel="noopener noreferrer" className="text-navy-950 font-bold hover:text-cyan-neon transition-colors">noweb labs</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
