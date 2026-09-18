import React, { useState } from "react";
import {
  Flame,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import {
  GRANIZADO_SIZES,
  SABORES_CON,
  SABORES_SIN,
  BEST_SELLERS,
  GranizadoSize,
  fmt,
} from "../../data/products";
import { useCart } from "../../context/CartContext";

type StepId = "tamano" | "tipo" | "sabores" | "resumen";

interface ConfigState {
  sizeId: string;
  hasLicor: boolean | null;
  flavors: string[];
}

const INIT_CONFIG: ConfigState = {
  sizeId: "",
  hasLicor: null,
  flavors: [],
};

const ALL_STEPS: { id: StepId; label: string }[] = [
  { id: "tamano", label: "Tamaño" },
  { id: "tipo", label: "Tipo" },
  { id: "sabores", label: "Sabores" },
  { id: "resumen", label: "Resumen" },
];

export function GranizadoSection() {
  const [config, setConfig] = useState<ConfigState>(INIT_CONFIG);
  const [stepId, setStepId] = useState<StepId>("tamano");
  const [justAddedAlert, setJustAddedAlert] = useState(false);
  const { addGranizado, setIsCartOpen } = useCart();

  const activeSteps = ALL_STEPS;
  const currentIdx = activeSteps.findIndex((s) => s.id === stepId);

  const selectedSize: GranizadoSize | undefined = GRANIZADO_SIZES.find(
    (s) => s.id === config.sizeId
  );

  const basePrice = selectedSize
    ? config.hasLicor
      ? selectedSize.withLicor
      : selectedSize.withoutLicor
    : 0;

  const total = basePrice;
  const maxFlavors = selectedSize?.maxFlavors ?? 1;

  const canNext = (() => {
    if (stepId === "tamano") return !!config.sizeId;
    if (stepId === "tipo") return config.hasLicor !== null;
    if (stepId === "sabores") return config.flavors.length > 0;
    return true;
  })();

  const next = () => {
    if (canNext && currentIdx < activeSteps.length - 1) {
      setStepId(activeSteps[currentIdx + 1].id);
    }
  };

  const back = () => {
    if (currentIdx > 0) {
      setStepId(activeSteps[currentIdx - 1].id);
    }
  };

  const toggleFlavor = (label: string) => {
    setConfig((c) => {
      if (c.flavors.includes(label)) {
        return { ...c, flavors: c.flavors.filter((f) => f !== label) };
      }
      if (c.flavors.length < maxFlavors) {
        return { ...c, flavors: [...c.flavors, label] };
      }
      return c;
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addGranizado({
      title: "Granizado Artesanal",
      size: selectedSize,
      hasLicor: !!config.hasLicor,
      flavors: config.flavors,
      bolas: [],
      unitPrice: total,
    });

    setJustAddedAlert(true);
    setTimeout(() => {
      setJustAddedAlert(false);
      setConfig(INIT_CONFIG);
      setStepId("tamano");
    }, 1500);
  };

  // Quick preset adder
  const handleAddPreset = (preset: (typeof BEST_SELLERS)[0]) => {
    const mediano = GRANIZADO_SIZES[1];
    addGranizado({
      title: `Granizado ${preset.name}`,
      size: mediano,
      hasLicor: true,
      flavors: [preset.desc],
      bolas: [],
      unitPrice: preset.precio,
    });
    setIsCartOpen(true);
  };

  const renderStep = () => {
    switch (stepId) {
      // 1. TAMAÑO
      case "tamano":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GRANIZADO_SIZES.map((s) => {
              const sel = config.sizeId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setConfig((c) => ({
                      ...c,
                      sizeId: s.id,
                      flavors: c.flavors.slice(0, s.maxFlavors),
                    }));
                  }}
                  className={[
                    "relative flex flex-col items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 text-center group",
                    sel
                      ? "border-primary bg-primary/10 shadow-[0_0_24px_rgba(61,220,104,0.3)] scale-[1.02]"
                      : "border-border bg-card/70 hover:border-primary/50 hover:bg-card",
                  ].join(" ")}
                >
                  {sel && (
                    <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center text-xs font-bold shadow-md">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </span>
                  <div>
                    <h4 className="font-display text-xl text-foreground">
                      {s.label}
                    </h4>
                    <span className="text-xs text-muted-foreground font-medium block">
                      {s.oz} · Hasta {s.maxFlavors} sabor{s.maxFlavors > 1 ? "es" : ""}
                    </span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/60 w-full flex flex-col gap-0.5 text-xs">
                    <span className="text-muted-foreground">
                      Sin licor: <strong className="text-foreground">{fmt(s.withoutLicor)}</strong>
                    </span>
                    <span className="text-primary font-semibold">
                      Con licor: {fmt(s.withLicor)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        );

      // 2. TIPO
      case "tipo":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                val: false,
                title: "Sin Licor",
                sub: "Refrescante y frutal, para toda la familia.",
                price: selectedSize?.withoutLicor ?? 8000,
                icon: "🧊",
              },
              {
                val: true,
                title: "Con Licor",
                sub: "Cada sabor ya trae su licor mezclado.",
                price: selectedSize?.withLicor ?? 10000,
                icon: "🍹",
                badge: "El Más Pedido",
              },
            ].map((opt) => {
              const sel = config.hasLicor === opt.val;
              return (
                <button
                  key={String(opt.val)}
                  onClick={() =>
                    setConfig((c) => ({
                      ...c,
                      hasLicor: opt.val,
                      flavors: [],
                    }))
                  }
                  className={[
                    "relative flex flex-col p-6 rounded-2xl border-2 text-left transition-all duration-300",
                    sel
                      ? "border-primary bg-primary/10 shadow-[0_0_24px_rgba(61,220,104,0.3)]"
                      : "border-border bg-card/70 hover:border-primary/50",
                  ].join(" ")}
                >
                  {opt.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
                      {opt.badge}
                    </span>
                  )}
                  <span className="text-3xl mb-3">{opt.icon}</span>
                  <h4 className="font-display text-2xl text-foreground">
                    {opt.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed mt-1 flex-1">
                    {opt.sub}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/60">
                    <span className="text-xs text-muted-foreground">Precio base: </span>
                    <span className="font-display text-lg text-primary">
                      {fmt(opt.price)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        );

      // 3. SABORES
      case "sabores": {
        const list = config.hasLicor ? SABORES_CON : SABORES_SIN;
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">
                Seleccionados: {config.flavors.length} / {maxFlavors}
              </span>
              {config.flavors.length === maxFlavors && (
                <span className="text-xs text-primary font-semibold">
                  ¡Máximo alcanzado!
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {list.map((f) => {
                const sel = config.flavors.includes(f.label);
                const disabled = !sel && config.flavors.length >= maxFlavors;
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFlavor(f.label)}
                    disabled={disabled}
                    className={[
                      "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-200",
                      sel
                        ? "border-primary bg-primary/15 text-foreground font-semibold shadow-[0_0_12px_rgba(61,220,104,0.25)]"
                        : disabled
                          ? "border-border/40 bg-card/30 text-muted-foreground opacity-40 cursor-not-allowed"
                          : "border-border bg-card/60 hover:border-primary/40 text-foreground",
                    ].join(" ")}
                  >
                    <span className="text-xl flex-shrink-0">{f.emoji}</span>
                    <span className="text-xs sm:text-sm truncate">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      }

      // 4. RESUMEN
      case "resumen": {
        return (
          <div>
            <div className="rounded-2xl border border-primary/30 bg-card/90 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(61,220,104,0.12)] mb-6">
              {/* Ticket Top Header */}
              <div className="bg-primary/15 border-b border-primary/20 px-6 py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-xl tracking-wide text-foreground">
                    Granizado Personalizado
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Preparado al momento · LA LICO
                  </p>
                </div>
                <span className="text-3xl">
                  {config.hasLicor ? "🍹" : "🧊"}
                </span>
              </div>

              {/* Rows */}
              <div className="p-6 space-y-2.5 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Tamaño:</span>
                  <span className="font-medium text-foreground">
                    {selectedSize?.label} ({selectedSize?.oz})
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium text-foreground">
                    {config.hasLicor ? "Con Licor" : "Sin Licor"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Sabores:</span>
                  <span className="font-bold text-primary">
                    {config.flavors.join(" + ")}
                  </span>
                </div>

                <div className="flex justify-between pt-3 text-base">
                  <span className="font-display tracking-wider text-muted-foreground">
                    SUBTOTAL GRANIZADO:
                  </span>
                  <span className="font-display text-2xl text-primary font-bold">
                    {fmt(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2.5 bg-primary text-black font-bold py-4 px-6 rounded-2xl text-base sm:text-lg transition-all duration-200 shadow-[0_0_30px_rgba(61,220,104,0.5)] hover:shadow-[0_0_45px_rgba(61,220,104,0.7)] hover:-translate-y-0.5"
              >
                <ShoppingBag size={20} />
                <span>
                  {justAddedAlert ? "¡Agregado al Pedido! ✓" : "Agregar Granizado a Mi Pedido"}
                </span>
              </button>

              <button
                onClick={() => {
                  setConfig(INIT_CONFIG);
                  setStepId("tamano");
                }}
                className="w-full py-2 text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Empezar de nuevo
              </button>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <section id="configurador" className="relative z-10 py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* ── SECTION: LOS MÁS PEDIDOS (HIGHLIGHTS) ── */}
      <div id="top-pedidos" className="mb-20 rounded-3xl border border-primary/25 bg-card/60 backdrop-blur-md p-6 sm:p-8 shadow-[0_0_50px_rgba(61,220,104,0.06)]">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Flame size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-foreground">
                LOS MÁS PEDIDOS
              </h3>
              <p className="text-xs text-muted-foreground">
                Recetas exclusivas recomendadas de la casa
              </p>
            </div>
          </div>
          <span className="text-xs text-primary font-semibold flex items-center gap-1">
            <Sparkles size={14} /> 1-Clic para pedir
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {BEST_SELLERS.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-2xl border border-border bg-card/80 p-4 flex flex-col justify-between transition-all duration-300 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(61,220,104,0.2)]"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                  {item.tag && (
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {item.tag}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-snug mb-3">
                  {item.desc}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-2 border-t border-border/60 mb-2">
                  <span className="text-xs font-display text-primary">
                    {fmt(item.precio)}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className="text-primary fill-primary"
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAddPreset(item)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-secondary hover:bg-primary hover:text-black border border-border hover:border-primary text-xs font-semibold transition-all duration-200 shadow-sm"
                >
                  <Plus size={13} strokeWidth={2.5} />
                  <span>Pedir Receta</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION: ARMA TU GRANIZADO (CONFIGURATOR) ── */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-primary/40" />
            <span className="text-primary text-xs tracking-widest uppercase font-semibold">
              Paso a Paso
            </span>
            <div className="w-8 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-foreground">
            ARMA TU GRANIZADO
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Elige tamaño, tipo y combinación de sabores a tu gusto.
          </p>
        </div>

        {/* Steps Progress Bar */}
        <div className="relative flex items-center justify-between mb-8 px-2">
          <div className="absolute top-4 inset-x-6 h-0.5 bg-border -z-0" />
          <div
            className="absolute top-4 h-0.5 bg-primary transition-all duration-500 -z-0"
            style={{
              left: "1.5rem",
              width: `calc(${(currentIdx / (activeSteps.length - 1)) * 100}% - 3rem)`,
            }}
          />

          {activeSteps.map((s, i) => {
            const done = i < currentIdx;
            const active = i === currentIdx;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1.5 z-10">
                <div
                  className={[
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300",
                    done
                      ? "border-primary bg-primary text-black"
                      : active
                        ? "border-primary bg-background text-primary shadow-[0_0_15px_rgba(61,220,104,0.6)]"
                        : "border-border bg-background text-muted-foreground",
                  ].join(" ")}
                >
                  {done ? <Check size={13} strokeWidth={3} /> : i + 1}
                </div>
                <span
                  className={[
                    "text-[10px] hidden sm:block font-medium",
                    active ? "text-primary" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Container */}
        <div className="mb-6">{renderStep()}</div>

        {/* Step Navigation */}
        {stepId !== "resumen" && (
          <div className="flex gap-3">
            {currentIdx > 0 && (
              <button
                onClick={back}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all duration-200"
              >
                <ChevronLeft size={16} /> Atrás
              </button>
            )}
            <button
              onClick={next}
              disabled={!canNext}
              className={[
                "flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold transition-all duration-200",
                canNext
                  ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(61,220,104,0.4)]"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              ].join(" ")}
            >
              <span>Siguiente</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
