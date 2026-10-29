"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Escritorio: la sección se alarga y su contenido se queda pegado arriba (sticky,
// lo hace el navegador) mientras los proyectos pasan en horizontal.
// Móvil y movimiento reducido: lista vertical normal (solo CSS).
export function HorizontalProjects({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const box = root.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        // El recorrido vertical es más corto que el horizontal: el carrusel avanza más rápido.
        const run = () => distance() * 0.65;
        // Alto de la sección: una pantalla + el recorrido + una pausa corta con el último proyecto.
        const size = () => {
          box.style.height = `${Math.round(window.innerHeight * 1.4 + run())}px`;
        };
        size();
        const trigger = {
          trigger: box,
          start: "top top",
          end: () => `+=${run()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: size,
        };
        const tween = gsap.to(el, { x: () => -distance(), ease: "none", scrollTrigger: trigger });
        // Parallax dentro de cada captura mientras el carrusel avanza.
        gsap.utils.toArray<HTMLElement>(".project", el).forEach((card) => {
          gsap.fromTo(
            card.querySelector("img"),
            { xPercent: -7, scale: 1.18 },
            {
              xPercent: 7,
              scale: 1.18,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            }
          );
        });
        gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: trigger });
        return () => {
          box.style.height = "";
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="hscroll">
      {/* Bloque pegado arriba; también es la capa que se aleja al llegar la sección siguiente. */}
      <div className="hscroll-inner">
        {header}
        <div ref={track} className="hscroll-track">
          {children}
        </div>
        <div className="hscroll-progress" aria-hidden="true">
          <div ref={bar} />
        </div>
      </div>
    </div>
  );
}
