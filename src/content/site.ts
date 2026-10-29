// Todo el contenido editable de la web está aquí.
// Lo marcado con [PENDIENTE] o "propuesta" hay que confirmarlo con Elia antes de publicar.
import type { StaticImageData } from "next/image";

import weliab from "@/assets/projects/weliab.webp";
import buildflow from "@/assets/projects/buildflow.webp";
import n8nOptica from "@/assets/projects/n8n-optica.webp";
import coliving from "@/assets/projects/coliving.webp";
import football from "@/assets/projects/football-manager.webp";
import portfolioFigma from "@/assets/projects/portfolio-figma.webp";
import appleStore from "@/assets/projects/apple-store.webp";
import yamifood from "@/assets/projects/yamifood.webp";
import rovers from "@/assets/projects/rovers.webp";

import bim from "@/assets/logos/consultora-bim.webp";
import lico from "@/assets/logos/lico.webp";
import torres from "@/assets/logos/torres.webp";
import afflelou from "@/assets/logos/afflelou.webp";
import pizzeria from "@/assets/logos/pizzeria-carlos.webp";

export const site = {
  name: "Elia Galiana Sanabria",
  shortName: "Elia Galiana",
  role: "Desarrolladora fullstack",
  city: "Sevilla",
  email: "eliagaliana@gmail.com",
  url: "https://eliagaliana.github.io/elia-galiana.github.io/",
  github: "https://github.com/eliagaliana",
  linkedin: "https://www.linkedin.com/in/elia-galiana-sanabria-74992431a/",
};

export const mailto = (subject: string, body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export const contactMailto = mailto(
  "Proyecto nuevo",
  "Hola, Elia:\n\nTe escribo porque necesito…\n\nPlazo aproximado:\nPresupuesto orientativo:\n\nGracias."
);


export type Project = {
  title: string;
  kind: string;
  summary: string;
  tags: string[];
  image: StaticImageData;
  href?: string;
  // Texto del enlace; por defecto "Ver código".
  linkLabel?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    title: "Weliab",
    kind: "Proyecto propio",
    summary:
      "Webs profesionales a medida y pensadas para móvil para negocios locales, además de hacer SEO local y vender soportes NFC, alta tecnología para negocios físicos.",
    tags: ["Diseño web", "WordPress", "SEO local"],
    image: weliab,
    href: "https://weliab.com/",
    linkLabel: "Ver web",
  },
  {
    title: "BuildFlow",
    kind: "Aplicación fullstack",
    summary:
      "Gestión interna para una constructora: obras en curso, equipo de trabajo y seguimiento diario de avances desde el terreno.",
    tags: ["Angular", "TypeScript", "FastAPI", "Python", "MySQL"],
    image: buildflow,
    href: "https://github.com/eliagaliana/BuildFlow/tree/main",
  },
  {
    title: "Mensajes que fidelizan",
    kind: "Automatización",
    summary:
      "Flujo que envía mensajes automáticos a los clientes de una óptica para que vuelvan, sin que nadie tenga que acordarse.",
    tags: ["n8n"],
    image: n8nOptica,
    status: "En desarrollo",
  },
  {
    title: "Co-living App",
    kind: "Diseño de producto",
    summary:
      "Más de 60 pantallas conectadas que cubren todo el alquiler compartido, sobre un sistema de diseño atómico pensado para crecer.",
    tags: ["Figma", "UX/UI"],
    image: coliving,
  },
  {
    title: "Football Career Manager",
    kind: "Diseño de producto",
    summary:
      "Exploración visual para un videojuego deportivo: microinteracciones fluidas y capas con profundidad.",
    tags: ["Figma", "UX/UI"],
    image: football,
  },
  {
    title: "Portfolio modular",
    kind: "Diseño web y móvil",
    summary: "Interfaz modular y escalable para un portfolio profesional, en web y móvil.",
    tags: ["Figma"],
    image: portfolioFigma,
  },
  {
    title: "Tienda Apple",
    kind: "Frontend",
    summary:
      "Tienda con favoritos y búsqueda al instante, sin recargar la página, resuelta en JavaScript puro.",
    tags: ["JavaScript", "HTML", "CSS"],
    image: appleStore,
    href: "https://github.com/eliagaliana/Proyecto-Tienda-Productos-apple",
  },
  {
    title: "Yamifood",
    kind: "Maquetación",
    summary: "Web de restaurante con estructura semántica que se adapta a cualquier pantalla.",
    tags: ["HTML", "CSS"],
    image: yamifood,
    href: "https://github.com/eliagaliana/Proyecto-Yamifood",
  },
  {
    title: "Rovers",
    kind: "Maquetación",
    summary: "Página principal de una hamburguesería, responsive de principio a fin.",
    tags: ["HTML", "CSS"],
    image: rovers,
    href: "https://github.com/eliagaliana/Proyecto-Web-Hamburgueser-a-Rovers-",
  },
];

// La carta de stack imita un optotipo: de lo que más uso (arriba, grande) a lo complementario.
// La notación de agudeza es un guiño a la etapa de Elia en óptica.
export const stackChart: { acuity: string; area: string; items: string[] }[] = [
  { acuity: "20/200", area: "Lo que hago", items: ["Fullstack"] },
  { acuity: "20/100", area: "Frontend", items: ["React", "React Native", "TypeScript"] },
  { acuity: "20/70", area: "Backend", items: ["Python", "FastAPI", "Supabase"] },
  { acuity: "20/50", area: "Web", items: ["JavaScript", "HTML", "CSS", "Liquid (Shopify)"] },
  { acuity: "20/40", area: "Datos", items: ["SQL", "MySQL", "MongoDB"] },
  { acuity: "20/30", area: "Herramientas", items: ["n8n", "Git", "Figma", "Shopify", "Bootstrap"] },
];

export const stackMarquee = [
  "React",
  "React Native",
  "TypeScript",
  "Supabase",
  "Python",
  "FastAPI",
  "JavaScript",
  "Shopify",
  "Liquid",
  "MySQL",
  "MongoDB",
  "n8n",
  "Git",
  "Figma",
];

export type Job = {
  role: string;
  company: string;
  period: string;
  summary: string;
  logo: StaticImageData;
  current?: boolean;
};

export const experience: Job[] = [
  {
    role: "Desarrolladora fullstack",
    company: "Consultora BIM",
    period: "Nov. 2026 – actualidad",
    summary:
      "Desarrollo proyectos muy distintos entre sí con React, React Native y Supabase.",
    logo: bim,
    current: true,
  },
  {
    role: "Desarrolladora frontend y UX/UI",
    company: "LICO Cosmetics",
    period: "Marzo – sept. 2026",
    summary:
      "Desarrollo funcionalidades, secciones y componentes a medida en Shopify (HTML, CSS, JavaScript y Liquid) y diseño en Figma interfaces mobile-first.",
    logo: lico,
  },
  {
    role: "Óptica",
    company: "Óptica Torres",
    period: "Sept. – oct. 2024",
    summary:
      "Gestión del gabinete de forma autónoma: exámenes visuales, atención personalizada, stock, pedidos y punto de venta.",
    logo: torres,
  },
  {
    role: "Óptica en prácticas",
    company: "Alain Afflelou",
    period: "Mar. – jun. 2023",
    summary:
      "Pruebas optométricas supervisadas, asesoramiento y ajuste de monturas y gestión de pedidos.",
    logo: afflelou,
  },
  {
    role: "Reparto a domicilio",
    company: "Pizzería Carlos",
    period: "Feb. 2023 – jun. 2024",
    summary:
      "Rutas y tiempos en horas punta, cobros y coordinación constante con el equipo. Aquí aprendí a trabajar con prisa sin perder la calma.",
    logo: pizzeria,
  },
];
