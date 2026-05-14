"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Briefcase, Users, LayoutGrid, MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Inicio", href: "#inicio", icon: Home },
  { name: "Servicios", href: "#servicios", icon: LayoutGrid },
  { name: "Nosotros", href: "#nosotros", icon: Users },
  { name: "Impacto", href: "#impacto", icon: Briefcase },
  { name: "Contacto", href: "#contacto", icon: MessageSquare },
];

export function FloatingNav() {
  const [active, setActive] = useState("Inicio");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-4">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-app rounded-full p-1.5 flex items-center gap-0.5 premium-shadow border border-white/40"
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setActive(item.name)}
            className={cn(
              "relative px-4 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300",
              active === item.name ? "text-white" : "text-slate-400 hover:text-navy-950"
            )}
          >
            {active === item.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-navy-950 rounded-full z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <item.icon size={16} className="relative z-10" />
            <span className={cn(
              "relative z-10 text-xs font-bold hidden sm:block tracking-wide",
              active === item.name ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}>
              {item.name}
            </span>
          </Link>
        ))}
        <div className="w-[1px] h-4 bg-slate-200 mx-2 hidden sm:block" />
        <Link 
          href="tel:+56996299010"
          className="hidden sm:flex items-center gap-2 bg-navy-950 text-white px-4 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-wider hover:scale-105 transition-all"
        >
          <Phone size={12} />
          <span>Llamar</span>
        </Link>
      </motion.nav>
    </div>
  );
}
