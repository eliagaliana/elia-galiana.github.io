"use client";

import { useEffect, useState } from "react";
import { contactMailto } from "@/content/site";

const links = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled || undefined}>
      <a href="#inicio" className="wordmark" aria-label="Elia Galiana, inicio">
        <span aria-hidden="true">
          <span className="wordmark-br">&lt;</span>EGS<span className="wordmark-br">&gt;</span>
        </span>
      </a>
      <nav aria-label="Secciones">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a href={contactMailto} className="btn btn-primary btn-sm">
        Escríbeme
      </a>
    </header>
  );
}
