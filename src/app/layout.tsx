import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Desarrolladora fullstack en Sevilla. Diseño y programo webs y aplicaciones para empresas y autónomos. Presencial en Sevilla y en remoto en toda España.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Nombre de la pestaña del navegador.
  title: "Elia · Fullstack",
  description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "profile",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Desarrolladora fullstack`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#110A16",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Sevilla", addressCountry: "ES" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["React", "React Native", "TypeScript", "Supabase", "Python", "FastAPI", "Shopify", "n8n", "Figma"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca que hay JavaScript: sin él, el contenido se muestra sin animaciones. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
