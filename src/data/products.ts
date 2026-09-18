// ── Catálogo y Datos de La Lico ─────────────────────────────────────────────
// Puedes actualizar fácilmente los precios y productos cambiando los valores en este archivo.

export interface Product {
  id: string;
  nombre: string;
  precio: number;
  categoria: "Aguardiente" | "Rones" | "Cervezas" | "Licores" | "Snacks";
  imagen: string;
  descripcion?: string;
  volumen?: string;
  badge?: string;
  destacado?: boolean;
}

export const STORE_INFO = {
  nombre: "LA LICO",
  subtitulo: "Licores & Snacks · Itagüí",
  telefono: "+57 300 554 5711",
  whatsapp: "573005545711",
  instagram: "@lalico.virtual",
  instagramUrl: "https://instagram.com/lalico.virtual",
  direccion: "Cra 68 # 61-88 Calatrava, Itagüí",
  mapsUrl: "https://maps.google.com/?q=Cra+68+%23+61-88+Calatrava+Itagui",
  horarios: "Lunes a Jueves: 4:00 PM - 12:00 AM | Viernes a Domingo: 2:00 PM - 3:00 AM",
  cobertura: "Calatrava, Itagüí, San Pío, Ditaires, Pilsen y alrededores",
  metodosPago: [
    { id: "nequi", nombre: "Nequi", numero: "300 554 5711", tipo: "Transferencia rápida" },
    { id: "bancolombia", nombre: "Bancolombia", qr: "/qr_bancolombia.jpeg", tipo: "QR / Transferencia" },
    { id: "daviplata", nombre: "Daviplata", numero: "300 554 5711", tipo: "Transferencia" },
    { id: "efectivo", nombre: "Efectivo", tipo: "Contra entrega al repartidor" },
  ],
};

export const fmt = (n: number) => `$ ${n.toLocaleString("es-CO")}`;

// ── PRODUCTOS DE LA LICORERA ────────────────────────────────────────────────
export const PRODUCTOS: Product[] = [
  // ── Aguardientes
  {
    id: "ag-verde-media",
    nombre: "Aguardiente Antioqueño Verde (Media)",
    precio: 30000,
    categoria: "Aguardiente",
    volumen: "375 ml",
    imagen: "/productos/aguardiente/AG_verde_350ml.png",
    descripcion: "Tapa verde sin azúcar, ideal para empezar.",
    badge: "Más Vendido",
    destacado: true,
  },
  {
    id: "ag-verde-tetra",
    nombre: "Aguardiente Antioqueño Verde (Tetra)",
    precio: 65000,
    categoria: "Aguardiente",
    volumen: "1000 ml",
    imagen: "/productos/aguardiente/AG_verde_tetra_1000ml.png",
    descripcion: "Litro en caja práctico y económico.",
  },
  {
    id: "ag-verde-litro",
    nombre: "Aguardiente Antioqueño Verde (Litro Vidrio)",
    precio: 75000,
    categoria: "Aguardiente",
    volumen: "1000 ml",
    imagen: "/productos/aguardiente/AG_verde_botella_100ml.png",
    descripcion: "Presentación clásica de 1 Litro en botella de vidrio.",
    destacado: true,
  },
  {
    id: "ag-verde-garrafa",
    nombre: "Aguardiente Antioqueño Verde (Garrafa)",
    precio: 110000,
    categoria: "Aguardiente",
    volumen: "1750 ml",
    imagen: "/productos/aguardiente/AG_verde_1750ml.png",
    descripcion: "Para compartir con toda la mesa o el grupo.",
    badge: "Fiesta",
  },

  // ── Rones
  {
    id: "ron-rvc-media",
    nombre: "Ron Viejo de Caldas Esencial (Media)",
    precio: 30000,
    categoria: "Rones",
    volumen: "375 ml",
    imagen: "/productos/rones/RVC_esencial_350ml.png",
    descripcion: "Sabor tradicional añejado en roble blanco.",
  },
  {
    id: "ron-rvc-botella",
    nombre: "Ron Viejo de Caldas Esencial (Botella)",
    precio: 55000,
    categoria: "Rones",
    volumen: "750 ml",
    imagen: "/productos/rones/RVC_esencial_750ml.png",
    descripcion: "Botella estándar 750ml, el clásico de siempre.",
    badge: "Favorito",
    destacado: true,
  },
  {
    id: "ron-rvc-litro",
    nombre: "Ron Viejo de Caldas Esencial (Litro)",
    precio: 75000,
    categoria: "Rones",
    volumen: "1000 ml",
    imagen: "/productos/rones/RVC_esencial_10000ml.png",
    descripcion: "1 Litro de ron tradicional colombiano.",
  },
  {
    id: "ron-rvc-garrafa",
    nombre: "Ron Viejo de Caldas Esencial (Garrafa)",
    precio: 110000,
    categoria: "Rones",
    volumen: "1750 ml",
    imagen: "/productos/rones/RVC_esencial_1750ml.png",
    descripcion: "Garrafa grande para toda la rumba.",
  },

  // ── Cervezas
  {
    id: "cerveza-aguila-laton",
    nombre: "Águila Original (Latón)",
    precio: 7000,
    categoria: "Cervezas",
    volumen: "473 ml",
    imagen: "/productos/cervezas latones/Screenshot 2026-03-22 204434.png",
    descripcion: "Cerveza rubia bien fría.",
    badge: "Helada",
    destacado: true,
  },
  {
    id: "cerveza-pilsen-laton",
    nombre: "Pilsen (Latón)",
    precio: 7000,
    categoria: "Cervezas",
    volumen: "473 ml",
    imagen: "/productos/cervezas latones/Screenshot 2026-03-22 204514.png",
    descripcion: "La tradicional de Antioquia, servida helada.",
    badge: "Paisa",
    destacado: true,
  },
  {
    id: "cerveza-poker-laton",
    nombre: "Poker (Latón)",
    precio: 7000,
    categoria: "Cervezas",
    volumen: "473 ml",
    imagen: "/productos/cervezas latones/Screenshot 2026-03-22 204457.png",
    descripcion: "El amigo que une a los amigos.",
    badge: "Helada",
  },
  {
    id: "cerveza-andina-laton",
    nombre: "Andina (Latón)",
    precio: 7000,
    categoria: "Cervezas",
    volumen: "473 ml",
    imagen: "/productos/cervezas latones/Screenshot 2026-03-22 204422.png",
    descripcion: "Suave y refrescante.",
  },
  {
    id: "cerveza-heineken-laton",
    nombre: "Heineken Premium (Latón)",
    precio: 9000,
    categoria: "Cervezas",
    volumen: "473 ml",
    imagen: "/productos/cervezas latones/Screenshot 2026-03-22 204152.png",
    descripcion: "Cerveza premium tipo lager holandesa.",
    badge: "Premium",
    destacado: true,
  },

  // ── Licores Importados / Premium
  {
    id: "tequila-jose-cuervo",
    nombre: "Tequila José Cuervo Especial",
    precio: 100000,
    categoria: "Licores",
    volumen: "750 ml",
    imagen: "/productos/licores/jcuervo_750ml.jpg",
    descripcion: "Tequila reposado mexicano de gran tradición.",
    badge: "Shots",
    destacado: true,
  },
  {
    id: "whisky-jack-daniels",
    nombre: "Whiskey Jack Daniel's Old No. 7",
    precio: 130000,
    categoria: "Licores",
    volumen: "750 ml",
    imagen: "/productos/licores/jdaniels_750ml.png",
    descripcion: "Tennessee whiskey filtrado gota a gota en carbón de arce.",
    badge: "Top Bar",
    destacado: true,
  },
  {
    id: "whisky-black-white",
    nombre: "Whisky Black & White",
    precio: 80000,
    categoria: "Licores",
    volumen: "750 ml",
    imagen: "/productos/licores/b&w_750ml.jpg",
    descripcion: "Blended scotch whisky suave y accesible.",
  },

  // ── Snacks
  {
    id: "snack-detodito-natural",
    nombre: "DeTodito Natural",
    precio: 10000,
    categoria: "Snacks",
    volumen: "185 g",
    imagen: "/productos/snacks/DetoditoN_165g.jpg",
    descripcion: "Platanitos, papas y chicharrón con sal.",
  },
  {
    id: "snack-detodito-bbq",
    nombre: "DeTodito BBQ",
    precio: 10000,
    categoria: "Snacks",
    volumen: "185 g",
    imagen: "/productos/snacks/DetoditoBBQ_165g.jpg",
    descripcion: "Mezcla crocante con sabor ahumado BBQ.",
  },
  {
    id: "snack-detodito-limon",
    nombre: "DeTodito Limón",
    precio: 10000,
    categoria: "Snacks",
    volumen: "185 g",
    imagen: "/productos/snacks/DetoditoL_165g.png",
    descripcion: "El toque ácido y salado ideal para acompañar cerveza.",
  },
  {
    id: "snack-doritos",
    nombre: "Doritos Mega Queso",
    precio: 10000,
    categoria: "Snacks",
    volumen: "185 g",
    imagen: "/productos/snacks/doritosN_185g.jpg",
    descripcion: "Triángulos de maíz con sabor intenso a queso.",
  },
  {
    id: "snack-choclitos",
    nombre: "Choclitos Limón",
    precio: 10000,
    categoria: "Snacks",
    volumen: "185 g",
    imagen: "/productos/snacks/choclitos_210g.png",
    descripcion: "Snack crocante de maíz con limón.",
  },
];

// ── CONFIGURADOR DE GRANIZADOS ──────────────────────────────────────────────
export interface GranizadoSize {
  id: string;
  label: string;
  oz: string;
  withLicor: number;
  withoutLicor: number;
  maxFlavors: number;
  icon: string;
}

export const GRANIZADO_SIZES: GranizadoSize[] = [
  { id: "pequeno", label: "Pequeño", oz: "12oz", withLicor: 10000, withoutLicor: 8000, maxFlavors: 1, icon: "🥤" },
  { id: "mediano", label: "Mediano", oz: "16oz", withLicor: 14000, withoutLicor: 12000, maxFlavors: 2, icon: "🧃" },
  { id: "grande", label: "Grande", oz: "24oz", withLicor: 18000, withoutLicor: 16000, maxFlavors: 3, icon: "🪣" },
];

// Con licor: cada sabor ya incluye su licor
export const SABORES_CON = [
  { id: "mojito", label: "Mojito", emoji: "🍃" },
  { id: "jamaica_tropical", label: "Jamaica Tropical", emoji: "🌺" },
  { id: "tequila_sunrise", label: "Tequila Sunrise", emoji: "🌅" },
  { id: "mora_azul", label: "Mora Azul", emoji: "🫐" },
  { id: "bombombum", label: "Bombombum", emoji: "💥" },
  { id: "maracuya_tequila", label: "Maracuyá Tequila", emoji: "🏵️" },
  { id: "smirnoff_vodka", label: "Smirnoff Vodka", emoji: "🍸" },
  { id: "redbull_jaeger", label: "Redbull Jäger", emoji: "⚡" },
  { id: "baileys", label: "Baileys", emoji: "🥛", tag: "Cremoso" },
  { id: "pina_colada", label: "Piña Colada", emoji: "🍍", tag: "Cremoso" },
  { id: "crema_maracuya", label: "Crema de Maracuyá", emoji: "🏵️", tag: "Cremoso" },
];

// Sin licor: único sabor disponible
export const SABORES_SIN = [
  { id: "sandia", label: "Sandía", emoji: "🍉" },
];

export const BEST_SELLERS = [
  {
    name: "Mojito Clásico",
    emoji: "🍃",
    stars: 5,
    tagline: "Refrescante y cítrico",
    desc: "Limón + Hierbabuena + Ron Blanco",
    precio: 12000,
  },
  {
    name: "Piña Colada",
    emoji: "🍍",
    stars: 5,
    tagline: "Cremoso y tropical",
    desc: "Piña + Coco + Ron",
    tag: "Cremoso",
    precio: 12000,
  },
  {
    name: "Redbull Jäger",
    emoji: "⚡",
    stars: 5,
    tagline: "Ideal para fiestas",
    desc: "Energy Drink + Jägermeister",
    tag: "Energía",
    precio: 14000,
  },
  {
    name: "Mora Azul Whisky",
    emoji: "🫐",
    stars: 5,
    tagline: "Intenso y afrutado",
    desc: "Mora Azul + Whisky",
    precio: 12000,
  },
];