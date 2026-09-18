import { useRef } from "react";
import { QrCode, Download, Printer, Share2, Sparkles } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import logoImg from "@/imports/WhatsApp_Image_2026-08-03_at_1.23.25_PM.jpeg";
import { STORE_INFO } from "../../data/products";

export function QRSection() {
  const qrRef = useRef<HTMLDivElement>(null);

  // Use current window location if in browser, or fallback
  const siteURL =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://lalico.vercel.app";

  const downloadQR = () => {
    const canvas = document.getElementById("lalico-qr-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "QR-LaLico-CartaVirtual.png";
    link.click();
  };

  return (
    <section id="qr-code" className="relative z-10 py-16 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-border" />
        <h2 className="font-display text-2xl sm:text-4xl tracking-tight flex items-center gap-3 text-foreground whitespace-nowrap">
          <QrCode size={26} className="text-primary" />
          CÓDIGO QR DE LA CARTA
        </h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 bg-card/75 backdrop-blur-md border border-border/80 rounded-3xl p-6 sm:p-12 shadow-[0_0_50px_rgba(61,220,104,0.06)]">
        {/* QR Code Container with Frame */}
        <div className="flex-shrink-0 flex flex-col items-center gap-5">
          <div className="relative p-5 bg-white rounded-3xl shadow-[0_0_40px_rgba(61,220,104,0.35)]">
            {/* Corner styling accents */}
            {[
              "top-0 left-0 border-t-4 border-l-4 rounded-tl-2xl",
              "top-0 right-0 border-t-4 border-r-4 rounded-tr-2xl",
              "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-2xl",
              "bottom-0 right-0 border-b-4 border-r-4 rounded-br-2xl",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-6 h-6 border-emerald-500 ${cls}`}
              />
            ))}

            <QRCodeCanvas
              id="lalico-qr-canvas"
              value={siteURL}
              size={210}
              level="H"
              bgColor="#ffffff"
              fgColor="#0a0a0a"
              imageSettings={{
                src: logoImg,
                x: undefined,
                y: undefined,
                height: 46,
                width: 46,
                opacity: 1,
                excavate: true,
              }}
            />
          </div>

          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-black font-bold text-xs sm:text-sm hover:bg-primary/90 transition-all duration-200 shadow-[0_0_20px_rgba(61,220,104,0.4)]"
          >
            <Download size={15} />
            <span>Descargar Código QR (PNG)</span>
          </button>
        </div>

        {/* Informative explanation */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
            <Sparkles size={12} />
            <span>Siempre actualizado automáticamente</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-foreground">
            Lleva la carta de La Lico en el bolsillo
          </h3>

          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            Tus clientes solo deben escanear este código con la cámara de su celular y llegarán directamente a esta carta interactiva. Si cambias precios o productos, <strong className="text-foreground">no tienes que volver a imprimir el código</strong>; siempre abrirá la versión más reciente.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { icon: "🖨️", title: "Imprime en Stickers", desc: "Pégalo en cada mesa, barra o mostrador." },
              { icon: "📦", title: "En tus Empaques", desc: "En bolsas y vasos para que vuelvan a pedir." },
              { icon: "📲", title: "En Redes Sociales", desc: "Ponlo en tus historias de Instagram o WhatsApp." },
              { icon: "⚡", title: "Cero Descargas", desc: "El cliente no necesita instalar ninguna app." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-3 rounded-2xl bg-secondary/60 border border-border/70 flex items-start gap-3 text-left"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
