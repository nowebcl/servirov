import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServiRov | Soluciones Submarinas y Robótica Avanzada",
  description: "Especialistas en operaciones con ROV y buceo profesional para la industria acuícola. Precisión, seguridad y eficiencia en cada inmersión.",
  icons: {
    icon: "/src/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
