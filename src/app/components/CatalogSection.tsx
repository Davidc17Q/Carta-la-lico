import React, { useState, useMemo } from "react";
import { Search, Plus, Check, Beer, Wine, Sparkles, Cookie } from "lucide-react";
import { PRODUCTOS, Product, fmt } from "../../data/products";
import { useCart } from "../../context/CartContext";

type CategoryFilter = "Todos" | "Aguardiente" | "Rones" | "Cervezas" | "Licores" | "Snacks";

const CATEGORIES: { id: CategoryFilter; label: string; icon: React.ReactNode }[] = [
  { id: "Todos", label: "Todo", icon: <Sparkles size={14} /> },
  { id: "Aguardiente", label: "Aguardiente", icon: <Wine size={14} /> },
  { id: "Rones", label: "Rones", icon: <Wine size={14} /> },
  { id: "Cervezas", label: "Cervezas", icon: <Beer size={14} /> },
  { id: "Licores", label: "Whisky & Tequila", icon: <Wine size={14} /> },
  { id: "Snacks", label: "Snacks", icon: <Cookie size={14} /> },
];

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const { addProduct, items } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTOS.filter((product) => {
      const matchesCategory =
        activeCategory === "Todos" || product.categoria === activeCategory;
      const matchesSearch =
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.descripcion &&
          product.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAdd = (product: Product) => {
    addProduct(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const getItemCount = (productId: string) => {
    const found = items.find((item) => item.type === "product" && item.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="catalogo" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-primary/40" />
          <span className="text-primary text-xs tracking-widest uppercase font-semibold">
            Carta Digital de Licores
          </span>
          <div className="w-8 h-px bg-primary/40" />
        </div>
        <h2 className="font-display text-3xl sm:text-5xl tracking-wide text-foreground">
          NUESTROS LICORES & CERVEZAS
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg mt-2">
          Botellas originales 100% legales, cervezas heladas y snacks para acompañar tu noche.
        </p>
      </div>

      {/* Controls Bar: Categories & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={[
                  "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                  isActive
                    ? "bg-primary text-black font-semibold shadow-[0_0_15px_rgba(61,220,104,0.4)]"
                    : "bg-card/70 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
                ].join(" ")}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px] md:w-72">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cerveza, ron, aguardiente..."
            className="w-full pl-10 pr-4 py-2 bg-card/60 border border-border rounded-full text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all backdrop-blur-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-3xl p-8 bg-card/30">
          <p className="text-lg text-muted-foreground mb-2">
            No encontramos productos con tu búsqueda "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("Todos");
            }}
            className="text-primary text-sm font-semibold hover:underline"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => {
            const inCartCount = getItemCount(product.id);
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(61,220,104,0.15)]"
              >
                {/* Image Container with smooth dark background */}
                <div className="relative aspect-square w-full bg-gradient-to-b from-secondary/40 to-background/90 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image path has special chars or is missing
                      (e.target as HTMLImageElement).src = "/logo_lalico.jpeg";
                    }}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300 ease-out"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Volume / Size badge */}
                  {product.volumen && (
                    <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {product.volumen}
                    </span>
                  )}
                </div>

                {/* Info & Price */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {product.nombre}
                    </h3>
                    {product.descripcion && (
                      <p className="text-muted-foreground text-[11px] line-clamp-2 mt-1">
                        {product.descripcion}
                      </p>
                    )}
                  </div>

                  {/* Price & Add Action */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/60">
                    <div className="leading-tight">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide block">
                        Precio
                      </span>
                      <span className="font-display text-base sm:text-lg text-primary">
                        {fmt(product.precio)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={[
                        "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200",
                        isJustAdded
                          ? "bg-emerald-400 text-black scale-105"
                          : inCartCount > 0
                          ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_12px_rgba(61,220,104,0.35)]"
                          : "bg-secondary text-foreground hover:bg-primary hover:text-black border border-border hover:border-primary",
                      ].join(" ")}
                      aria-label={`Agregar ${product.nombre} al pedido`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check size={14} strokeWidth={3} />
                          <span className="hidden sm:inline">Listo</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} strokeWidth={2.5} />
                          <span>
                            {inCartCount > 0 ? `${inCartCount}` : "Pedir"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
