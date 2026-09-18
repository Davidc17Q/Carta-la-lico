import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  MapPin,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { STORE_INFO, fmt } from "../../data/products";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
    sendWhatsAppOrder,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Nequi");
  const [notes, setNotes] = useState("");

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    sendWhatsAppOrder({
      customerName,
      address,
      paymentMethod,
      notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card/95 backdrop-blur-xl border-l border-border/70 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-border/70 flex items-center justify-between bg-background/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">
                  TU PEDIDO
                </h3>
                <span className="text-xs text-muted-foreground">
                  {totalCount} {totalCount === 1 ? "artículo" : "artículos"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-red-400 px-2 py-1 transition-colors"
                >
                  Vaciar
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar pedido"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body: Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-display text-xl text-foreground mb-1">
                  Tu pedido está vacío
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto mb-6">
                  Arma un granizado refrescante o agrega una cerveza o licor de nuestra carta virtual.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-primary text-black font-bold px-6 py-2.5 rounded-full text-xs hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(61,220,104,0.3)]"
                >
                  Explorar la Carta
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border bg-background/60 p-3.5 flex gap-3 items-center justify-between"
                >
                  {/* Left: Visual / Thumbnail */}
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden border border-border">
                    {item.type === "product" ? (
                      <img
                        src={item.product.imagen}
                        alt={item.product.nombre}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/logo_lalico.jpeg";
                        }}
                      />
                    ) : (
                      <span className="text-2xl">
                        {item.hasLicor ? "🍹" : "🧊"}
                      </span>
                    )}
                  </div>

                  {/* Center: Details */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                      {item.type === "product" ? item.product.nombre : item.title}
                    </h5>

                    {/* Granizado specifications */}
                    {item.type === "granizado" && (
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.size.label} · {item.flavors.join(", ")}
                        {item.licor ? ` + ${item.licor}` : ""}
                        {item.jeringas ? " + Jeringa" : ""}
                        {item.bolas.length > 0 ? " + Bolas" : ""}
                      </p>
                    )}

                    <span className="font-display text-xs text-primary font-medium">
                      {fmt(item.unitPrice * item.quantity)}
                    </span>
                  </div>

                  {/* Right: Quantity Controls */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Disminuir"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Aumentar"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-lg text-muted-foreground hover:text-red-400 flex items-center justify-center transition-colors ml-1"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Order Form & WhatsApp CTA */}
          {items.length > 0 && (
            <form
              onSubmit={handleCheckout}
              className="p-5 border-t border-border/80 bg-background/80 space-y-3.5"
            >
              {/* Fields */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Tu Nombre (ej. Mateo)"
                  className="w-full px-3.5 py-2 bg-card/80 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />

                <div className="relative">
                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Dirección (ej. Cra 68 # 61 o 'En el local')"
                    className="w-full pl-8 pr-3.5 py-2 bg-card/80 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Payment Method Pills */}
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1.5 font-semibold">
                    Método de Pago:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {["Nequi", "Bancolombia", "Daviplata", "Efectivo"].map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={[
                          "py-1.5 px-1 rounded-lg text-[11px] font-medium border text-center transition-all truncate",
                          paymentMethod === method
                            ? "bg-primary/20 border-primary text-primary font-bold shadow-sm"
                            : "bg-card/50 border-border text-muted-foreground hover:border-primary/40",
                        ].join(" ")}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notas (ej. Cervezas bien frías, cambio de 50mil)"
                  className="w-full px-3.5 py-2 bg-card/80 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* Total Row */}
              <div className="pt-2 border-t border-dashed border-border/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground block">Total a Pagar</span>
                  <span className="font-display text-2xl text-primary font-bold">
                    {fmt(totalPrice)}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                  Domicilio a acordar
                </span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-primary text-black font-bold py-3.5 px-4 rounded-xl text-sm sm:text-base hover:bg-primary/90 transition-all shadow-[0_0_24px_rgba(61,220,104,0.4)] hover:shadow-[0_0_35px_rgba(61,220,104,0.6)]"
              >
                <MessageCircle size={18} />
                <span>Pedir por WhatsApp</span>
              </button>

              <p className="text-center text-[10px] text-muted-foreground">
                Se abrirá WhatsApp con el resumen de tu pedido para confirmar.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
