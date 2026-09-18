import { ChevronRight, Sparkles, Flame, ShieldCheck, MapPin, Phone } from "lucide-react";
import { STORE_INFO } from "../../data/products";

export function HeroBanner({
  onArmarGranizado,
  onVerCatalogo,
}: {
  onArmarGranizado: () => void;
  onVerCatalogo: () => void;
}) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* ── Background Image with Panorama-Jets inspired transparency & gradients ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero_night_bar.jpg"
          alt="Ambiente La Lico Bar y Granizados"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered vignette and transparency overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 11, 14, 0.82) 0%, rgba(8, 11, 14, 0.45) 30%, rgba(8, 11, 14, 0.6) 65%, rgba(8, 11, 14, 0.95) 90%, #080b0e 100%)",
          }}
        />

        {/* Ambient colored glowing orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-20 left-10 w-[250px] h-[250px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* ── Content Container ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-primary/40 shadow-[0_0_24px_rgba(61,220,104,0.25)] mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Abierto Hoy · Domicilios en Itagüí
          </span>
          <Sparkles size={14} className="text-primary" />
        </div>

        {/* Subtitle / Script font */}
        <span
          className="text-primary text-2xl sm:text-3xl font-medium tracking-wide mb-2 drop-shadow-[0_0_12px_rgba(61,220,104,0.6)]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Bienvenido a la experiencia
        </span>

        {/* Main Headline */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl tracking-tight leading-none mb-6 text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          LA <span className="text-primary text-glow">LICO</span>
        </h1>

        {/* Tagline / Value proposition */}
        <p className="text-gray-200 sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-md font-normal">
          Los mejores <span className="text-primary font-semibold">granizados refrescantes</span> con y sin licor, cervezas bajo cero y botellas 100% legales. Domicilios rápidos hasta tu puerta.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-12">
          <button
            onClick={onArmarGranizado}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary text-black font-bold px-8 py-4 rounded-full text-base hover:bg-primary/90 transition-all duration-200 shadow-[0_0_30px_rgba(61,220,104,0.5)] hover:shadow-[0_0_45px_rgba(61,220,104,0.7)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Armar Mi Granizado</span>
            <ChevronRight size={18} />
          </button>

          <button
            onClick={onVerCatalogo}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-card/60 hover:bg-card/90 text-white font-semibold px-7 py-4 rounded-full text-base border border-white/20 backdrop-blur-md transition-all duration-200 hover:border-primary/50 shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Ver Carta de Licores</span>
          </button>

          <a
            href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
              "¡Hola La Lico! 👋 Quiero consultar la disponibilidad de un pedido."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto sm:hidden flex items-center justify-center gap-2 bg-emerald-700/80 text-white font-semibold px-6 py-3.5 rounded-full text-sm border border-emerald-500/30 backdrop-blur-md"
          >
            <Phone size={16} />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>

        {/* Value Highlights Cards (Pills with glassmorphism) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-200">
            <Flame size={16} className="text-primary flex-shrink-0" />
            <span className="font-medium">Granizados Únicos</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-200">
            <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
            <span className="font-medium">Licores 100% Legales</span>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-200">
            <MapPin size={16} className="text-amber-400 flex-shrink-0" />
            <span className="font-medium">Itagüí · Calatrava</span>
          </div>
        </div>
      </div>

      {/* Smooth bottom transition fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
