import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, GranizadoSize, STORE_INFO, fmt } from "../data/products";

export interface StandardCartItem {
  id: string;
  type: "product";
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface GranizadoCartItem {
  id: string;
  type: "granizado";
  title: string;
  size: GranizadoSize;
  hasLicor: boolean;
  flavors: string[];
  licor?: string;
  jeringas?: string;
  bolas: string[];
  quantity: number;
  unitPrice: number;
}

export type CartItem = StandardCartItem | GranizadoCartItem;

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addProduct: (product: Product, quantity?: number) => void;
  addGranizado: (granizado: Omit<GranizadoCartItem, "id" | "type" | "quantity">) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  sendWhatsAppOrder: (details: {
    customerName: string;
    address: string;
    paymentMethod: string;
    notes?: string;
  }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "lalico_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("No se pudo guardar el carrito:", e);
    }
  }, [items]);

  const addProduct = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.type === "product" && item.id === product.id) as
        | StandardCartItem
        | undefined;
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem: StandardCartItem = {
        id: product.id,
        type: "product",
        product,
        quantity,
        unitPrice: product.precio,
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const addGranizado = (granizadoData: Omit<GranizadoCartItem, "id" | "type" | "quantity">) => {
    const newItem: GranizadoCartItem = {
      ...granizadoData,
      id: `granizado_${Date.now()}`,
      type: "granizado",
      quantity: 1,
    };
    setItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const sendWhatsAppOrder = ({
    customerName,
    address,
    paymentMethod,
    notes,
  }: {
    customerName: string;
    address: string;
    paymentMethod: string;
    notes?: string;
  }) => {
    let msg = `🥃 *¡Hola ${STORE_INFO.nombre}! Quiero hacer un pedido:*\n\n`;

    if (customerName.trim()) {
      msg += `👤 *Cliente:* ${customerName.trim()}\n`;
    }

    msg += `📦 *DETALLE DEL PEDIDO:*\n`;
    msg += `─────────────────────────\n`;

    items.forEach((item, index) => {
      if (item.type === "product") {
        msg += `${index + 1}. *${item.product.nombre}*\n`;
        msg += `   Cantidad: ${item.quantity} | ${fmt(item.unitPrice * item.quantity)}\n`;
      } else {
        msg += `${index + 1}. *${item.title} (${item.size.label} - ${item.size.oz})*\n`;
        msg += `   • Tipo: ${item.hasLicor ? "Con Licor" : "Sin Licor"}\n`;
        msg += `   • Sabores: ${item.flavors.join(" + ")}\n`;
        if (item.hasLicor && item.licor) {
          msg += `   • Licor: ${item.licor}\n`;
        }
        if (item.jeringas) {
          msg += `   • Jeringa: ${item.jeringas}\n`;
        }
        if (item.bolas && item.bolas.length > 0) {
          msg += `   • Bolas Explosivas: ${item.bolas.join(", ")}\n`;
        }
        msg += `   Cantidad: ${item.quantity} | ${fmt(item.unitPrice * item.quantity)}\n`;
      }
      msg += `\n`;
    });

    msg += `─────────────────────────\n`;
    msg += `💰 *TOTAL:* ${fmt(totalPrice)}\n`;
    msg += `💳 *Método de Pago:* ${paymentMethod}\n`;

    if (address.trim()) {
      msg += `📍 *Dirección de Entrega:* ${address.trim()}\n`;
    } else {
      msg += `📍 *Ubicación:* En el local / Para recoger\n`;
    }

    if (notes && notes.trim()) {
      msg += `📝 *Observaciones:* ${notes.trim()}\n`;
    }

    msg += `\n_Enviado desde la carta virtual de ${STORE_INFO.nombre}_ ⚡`;

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${STORE_INFO.whatsapp}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addProduct,
        addGranizado,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        totalPrice,
        sendWhatsAppOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
