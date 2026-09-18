import React, { useState } from "react";
import {
  CreditCard,
  Clock,
  MapPin,
  ShieldCheck,
  Copy,
  Check,
  QrCode,
  ExternalLink,
} from "lucide-react";
import { STORE_INFO } from "../../data/products";

export function InfoSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <section id="info" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-primary/40" />
          <span className="text-primary text-xs tracking-widest uppercase font-semibold">
            Información del Negocio
          </span>
          <div className="w-8 h-px bg-primary/40" />
        </div>
        <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-foreground">
          PAGOS, HORARIOS & COBERTURA
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg mt-2">
          Todo lo que necesitas saber para tus pedidos en LA LICO.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── CARD 1: MÉTODOS DE PAGO ── */}
        <div className="rounded-3xl border border-border bg-card/70 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
              <CreditCard size={20} />
            </div>
            <h3 className="font-display text-xl text-foreground mb-1">
              MÉTODOS DE PAGO
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Aceptamos pagos digitales y efectivo contra entrega.
            </p>

            <div className="space-y-3">
              {/* Nequi */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/80 border border-border">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#330066]" />
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      Nequi
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      300 554 5711
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard("3005545711", "nequi")}
                  className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 p-1.5 rounded-lg bg-primary/10 border border-primary/20"
                  aria-label="Copiar número de Nequi"
                >
                  {copiedKey === "nequi" ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>

              {/* Bancolombia */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/80 border border-border">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FDDA24]" />
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      Bancolombia
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      QR Disponible / A la mano
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  QR en chat
                </span>
              </div>

              {/* Daviplata */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/80 border border-border">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ED1C24]" />
                  <div>
                    <span className="text-xs font-bold text-foreground block">
                      Daviplata
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      300 554 5711
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard("3005545711", "daviplata")}
                  className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 p-1.5 rounded-lg bg-primary/10 border border-primary/20"
                  aria-label="Copiar número de Daviplata"
                >
                  {copiedKey === "daviplata" ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Transfiere y envía el comprobante por WhatsApp.</span>
          </div>
        </div>

        {/* ── CARD 2: HORARIOS DE ATENCIÓN ── */}
        <div className="rounded-3xl border border-border bg-card/70 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
              <Clock size={20} />
            </div>
            <h3 className="font-display text-xl text-foreground mb-1">
              HORARIOS DE ATENCIÓN
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Servicio para consumo en el local y domicilios nocturnos.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-background/80 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground">
                    Lunes a Jueves
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                    Tardes y Noche
                  </span>
                </div>
                <span className="text-sm font-semibold text-primary block">
                  4:00 PM – 12:00 AM (Medianoche)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-background/80 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-foreground">
                    Viernes, Sábado y Domingo
                  </span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-semibold">
                    Rumba Completa
                  </span>
                </div>
                <span className="text-sm font-semibold text-amber-400 block">
                  2:00 PM – 3:00 AM
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/60 text-xs text-muted-foreground">
            Los fines de semana recomendamos pedir con tiempo para asegurar tus granizados favoritos.
          </div>
        </div>

        {/* ── CARD 3: UBICACIÓN & COBERTURA ── */}
        <div className="rounded-3xl border border-border bg-card/70 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-4">
              <MapPin size={20} />
            </div>
            <h3 className="font-display text-xl text-foreground mb-1">
              UBICACIÓN & DOMICILIOS
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Punto físico y cobertura en el sur del Valle de Aburrá.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-background/80 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                  Punto de Venta Físico:
                </span>
                <p className="text-xs font-semibold text-foreground">
                  {STORE_INFO.direccion}
                </p>
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs text-primary flex items-center gap-1 hover:underline"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-background/80 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                  Zonas de Domicilio:
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {STORE_INFO.cobertura}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>Repartidores locales de confianza.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
