import { Phone, Instagram, MapPin, MessageCircle } from "lucide-react";
import logoImg from "@/imports/WhatsApp_Image_2026-08-03_at_1.23.25_PM.jpeg";
import { STORE_INFO } from "../../data/products";

export function Footer() {
  return (
    <footer
      id="contacto"
      className="relative z-10 bg-card/70 backdrop-blur-md border-t border-border/80 pt-16 pb-12 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Col 1: Brand & Logo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="LA LICO"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/40 shadow-[0_0_20px_rgba(61,220,104,0.3)]"
              />
              <div>
                <span className="font-display text-2xl tracking-wider text-foreground">
                  LA LICO
                </span>
                <p className="text-muted-foreground text-xs tracking-widest uppercase">
                  Licores & Snacks · Itagüí
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-left max-w-xs leading-relaxed">
              Granizados refrescantes, cervezas bajo cero y botellas 100% legales. Atendemos en nuestro punto físico y a domicilio.
            </p>
          </div>

          {/* Col 2: Direct Contact Channels */}
          <div className="flex flex-col gap-3.5 text-xs sm:text-sm">
            <h4 className="font-display text-base text-muted-foreground tracking-widest uppercase mb-1">
              Atención Directa
            </h4>

            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                "¡Hola LA LICO! 👋 Quiero hacer un pedido a domicilio."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Phone size={14} />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {STORE_INFO.telefono}
                </p>
                <span className="text-[11px] text-primary/70">
                  Línea de domicilios y reservas
                </span>
              </div>
            </a>

            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors flex-shrink-0">
                <Instagram size={14} />
              </div>
              <span>{STORE_INFO.instagram}</span>
            </a>

            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                <MapPin size={14} />
              </div>
              <span className="truncate">{STORE_INFO.direccion}</span>
            </div>
          </div>

          {/* Col 3: WhatsApp CTA Card */}
          <div className="flex flex-col items-center md:items-end gap-3.5">
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/70 text-center md:text-right w-full sm:w-auto">
              <p className="text-xs text-foreground font-semibold mb-1">
                ¿Listo para empezar la noche?
              </p>
              <p className="text-[11px] text-muted-foreground mb-3">
                Escríbenos y te atendemos al instante por WhatsApp.
              </p>
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(
                  "¡Hola LA LICO! 👋 Quiero pedir a domicilio."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-black font-bold px-6 py-2.5 rounded-full text-xs hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(61,220,104,0.4)]"
              >
                <MessageCircle size={15} />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 pt-6 border-t border-border/60 text-center space-y-2">
          <p className="text-[11px] text-muted-foreground">
            El exceso de alcohol es perjudicial para la salud. Ley 30 de 1986. Prohíbase el expendio de bebidas embriagantes a menores de edad. Ley 124 de 1994.
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            © {new Date().getFullYear()} LA LICO · Todos los derechos reservados · Itagüí, Colombia.
          </p>
        </div>
      </div>
    </footer>
  );
}
