import React from "react";
import { ShoppingBag, Phone } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logoImg from "@/imports/WhatsApp_Image_2026-08-03_at_1.23.25_PM.jpeg";
import { STORE_INFO } from "../../data/products";

export function Navbar() {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logoImg}
              alt="Logo LA LICO"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300 shadow-[0_0_15px_rgba(61,220,104,0.3)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          <div className="leading-tight">
            <span className="font-display text-lg sm:text-xl text-foreground tracking-wider group-hover:text-primary transition-colors">
              LA LICO
            </span>
            <p className="text-muted-foreground text-[10px] sm:text-xs tracking-widest uppercase">
              Licores & Snacks
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a
            href="#top-pedidos"
            className="hover:text-primary transition-colors duration-150"
          >
            Los Más Pedidos
          </a>
          <a
            href="#configurador"
            className="hover:text-primary transition-colors duration-150"
          >
            Granizados
          </a>
          <a
            href="#catalogo"
            className="hover:text-primary transition-colors duration-150"
          >
            Carta de Licores
          </a>
          <a
            href="#info"
            className="hover:text-primary transition-colors duration-150"
          >
            Pagos & Zonas
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-card hover:bg-card/80 border border-border hover:border-primary/50 text-foreground px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(61,220,104,0.2)]"
            aria-label="Abrir Carrito"
          >
            <ShoppingBag size={18} className={totalCount > 0 ? "text-primary" : "text-muted-foreground"} />
            <span className="hidden sm:inline">Mi Pedido</span>
            {totalCount > 0 && (
              <span className="bg-primary text-black font-bold text-xs px-2 py-0.5 rounded-full animate-scale-in">
                {totalCount}
              </span>
            )}
          </button>

          {/* Quick WhatsApp Order Button */}
          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
              "¡Hola LA LICO! 👋 Quiero hacer una consulta sobre la carta."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-primary text-black text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-[0_0_18px_rgba(61,220,104,0.35)] hover:shadow-[0_0_24px_rgba(61,220,104,0.5)]"
          >
            <Phone size={14} />
            <span>Pedir ya</span>
          </a>
        </div>
      </div>
    </header>
  );
}
