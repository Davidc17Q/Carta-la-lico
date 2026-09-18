import { useState, useEffect } from "react";
import { ShieldAlert, Check } from "lucide-react";
import logoImg from "@/imports/WhatsApp_Image_2026-08-03_at_1.23.25_PM.jpeg";

export function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const verified = localStorage.getItem("lalico_age_verified");
      if (!verified) {
        setIsOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleConfirm = () => {
    try {
      localStorage.setItem("lalico_age_verified", "true");
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const handleReject = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative max-w-sm w-full bg-card/95 border border-primary/40 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(61,220,104,0.25)]">
        <div className="relative mb-5 flex justify-center">
          <img
            src={logoImg}
            alt="LA LICO"
            className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/60 shadow-[0_0_25px_rgba(61,220,104,0.4)]"
          />
          <span className="absolute bottom-0 right-1/2 translate-x-8 bg-amber-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full border-2 border-background">
            +18
          </span>
        </div>

        <h3 className="font-display text-2xl text-foreground mb-2">
          ¿ERES MAYOR DE EDAD?
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          Para ver nuestra carta y realizar pedidos debes ser mayor de 18 años. El exceso de alcohol es perjudicial para la salud (Ley 124 de 1994).
        </p>

        <div className="space-y-2.5">
          <button
            onClick={handleConfirm}
            className="w-full flex items-center justify-center gap-2 bg-primary text-black font-bold py-3.5 px-6 rounded-2xl text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(61,220,104,0.4)]"
          >
            <Check size={16} strokeWidth={3} />
            <span>Sí, soy mayor de edad</span>
          </button>

          <button
            onClick={handleReject}
            className="w-full py-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Soy menor de 18 años (Salir)
          </button>
        </div>
      </div>
    </div>
  );
}
