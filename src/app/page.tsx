import { FloatingNav } from "@/components/FloatingNav";
import { AppHero } from "@/components/AppHero";
import { BentoServices } from "@/components/BentoServices";
import { AppAbout } from "@/components/AppAbout";
import { Impact } from "@/components/Impact";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F5F5F7] text-navy-950 pb-32">
      <FloatingNav />
      <AppHero />
      <BentoServices />
      <AppAbout />
      <Impact />
      <Contact />
      <Footer />
    </main>
  );
}
