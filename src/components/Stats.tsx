"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Años de Experiencia", value: "+5" },
  { label: "Días de fallas operacionales", value: "0" },
  { label: "Proyectos Completados", value: "11+" },
  { label: "Clientes Satisfechos", value: "100%" }
];

export function Stats() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-6xl font-bold text-navy-950 mb-2 tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-cyan-neon font-bold text-sm uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
