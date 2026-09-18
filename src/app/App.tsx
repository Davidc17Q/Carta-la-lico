import React from "react";
import { CartProvider } from "../context/CartContext";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { GranizadoSection } from "./components/GranizadoSection";
import { CatalogSection } from "./components/CatalogSection";
import { InfoSection } from "./components/InfoSection";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { AgeVerificationModal } from "./components/AgeVerificationModal";

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden relative selection:bg-primary selection:text-black">
        {/* Subtle Ambient Night Particles Canvas */}
        <ParticleCanvas />

        {/* Legal +18 Age Verification Modal */}
        <AgeVerificationModal />

        {/* Global Slide-over Cart Drawer */}
        <CartDrawer />

        {/* Floating Glassmorphism Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main id="top">
          {/* Night Bar Hero Banner with Translucent Vignette (Panorama Jets Inspired) */}
          <HeroBanner
            onArmarGranizado={() => scrollTo("configurador")}
            onVerCatalogo={() => scrollTo("catalogo")}
          />

          {/* Granizados Section: Los Más Pedidos & Step-by-Step Customizer */}
          <GranizadoSection />

          {/* Catalog Section: Aguardiente, Rones, Cervezas, Licores & Snacks */}
          <CatalogSection />

          {/* Info Section: Payments (Nequi/Bancolombia), Schedules, Coverage */}
          <InfoSection />
        </main>

        {/* Brand Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
} 
