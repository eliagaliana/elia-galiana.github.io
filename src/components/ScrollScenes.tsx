"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

// Pantallas táctiles: el móvil tiene menos potencia y el scroll lo mueve el sistema.
const isTouch = () => matchMedia("(hover: none) and (pointer: coarse)").matches;
// iPhone y iPad (también el iPad que se anuncia como Mac).
const isIOS = () =>
  /iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// Capa de movimiento ligada al scroll: cada tramo de la página mueve algo.
// Todo es transform/opacity y se desactiva con "movimiento reducido".
// Los elementos que anima GSAP no llevan [data-reveal] (no se pisan con el CSS).
export function ScrollScenes() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    const touch = isTouch();
    const ios = isIOS();
    // Android: sin retraso de suavizado, la animación va pegada al dedo.
    // iPhone: Safari avisa del scroll a golpes de píxel; un suavizado muy corto
    // reparte cada golpe en varios fotogramas y con el dedo lento no se ve a tirones.
    // Ordenador: se mantiene el suavizado de siempre.
    const S = (v: number) => (ios ? 0.2 : touch ? true : v);
    if (ios) {
      // Safari en iPhone coloca en píxeles enteros lo que no va en capa propia: con
      // el scroll lento, textos y bloques avanzan a tirones. En 3D siempre van en capa
      // y se mueven en fracciones de píxel.
      gsap.config({ force3D: true });
    }
    if (touch) {
      // No se recoloca nada cuando aparece o se esconde la barra del navegador.
      ScrollTrigger.config({ ignoreMobileResize: true });
    }
    // Android: el scroll se gestiona en el mismo hilo que las animaciones, así van
    // sincronizados. En iPhone no: el scroll nativo de Safari es más suave a poca velocidad.
    const normalize = touch && !ios;
    if (normalize) ScrollTrigger.normalizeScroll(true);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Barra de progreso de lectura.
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: S(0.3) },
      });

      // El hero mide tres pantallas y su contenido se queda pegado (sticky, lo hace el
      // navegador): en la primera sube el nombre y aparece la descripción; en la
      // segunda la banda lo tapa (margen negativo en CSS). Aquí solo se anima.
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: S(0.6),
        },
      });
      heroTl
        .fromTo(".hero-title .line", { yPercent: 110, y: 0 }, { yPercent: 0, duration: 0.55, stagger: 0.12, ease: "power2.out" }, 0)
        .fromTo(".hero-lead", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.3)
        .fromTo(".hero-stage", { scale: 1, yPercent: 0 }, { scale: 0.94, yPercent: 3, duration: 0.8, ease: "none" }, 0)
        .to(".hero-sticky", { scale: 0.9, duration: 1, ease: "none" }, 1)
        .fromTo(".hero-shade", { opacity: 0 }, { opacity: 0.75, duration: 1, ease: "none" }, 1);

      // Banda del marquee: se inclina según avanza.
      gsap.fromTo(
        ".band",
        { rotate: 2, scale: 1.06 },
        {
          rotate: -2,
          ease: "none",
          scrollTrigger: { trigger: ".band", start: "top bottom", end: "bottom top", scrub: S(0.5) },
        }
      );

      // Titulares de sección: cruzan la pantalla en horizontal.
      q("[data-fx='slide']").forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 10 },
          {
            xPercent: -2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: S(0.6) },
          }
        );
        gsap.fromTo(
          el,
          { opacity: 0.35 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 85%", scrub: S(0.4) } }
        );
      });

      // Optotipo: las líneas entran alternando lado.
      q(".eyechart-rows > li").forEach((el, i) => {
        gsap.fromTo(
          el,
          { xPercent: i % 2 ? 10 : -10, opacity: 0.3 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "top 80%", scrub: S(0.4) },
          }
        );
      });

      // Marquees del stack: se cruzan con el scroll.
      q<HTMLElement>(".stack-marquees .marquee").forEach((el, i) => {
        gsap.fromTo(
          el,
          { xPercent: i ? -8 : 8 },
          {
            xPercent: i ? 8 : -8,
            ease: "none",
            scrollTrigger: { trigger: ".stack-marquees", start: "top bottom", end: "bottom top", scrub: S(0.5) },
          }
        );
      });

      // Experiencia: cada puesto se monta por partes.
      q(".job").forEach((job) => {
        const st = { trigger: job, start: "top bottom", end: "top 75%", scrub: S(0.4) };
        gsap.fromTo(job.querySelector(".job-logo"), { rotate: -90, scale: 0.4 }, { rotate: 0, scale: 1, ease: "none", scrollTrigger: st });
        gsap.fromTo(job.querySelector(".job-main"), { x: -80, opacity: 0 }, { x: 0, opacity: 1, ease: "none", scrollTrigger: st });
        gsap.fromTo(job.querySelector(".job-period"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: st });
        gsap.fromTo(job.querySelector(".job-summary"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: st });
      });

      // Bloque violeta: el relieve gira y el titular crece.
      gsap.fromTo(
        ".community-topo",
        { rotate: -8, scale: 1.2 },
        { rotate: 8, scale: 1, ease: "none", scrollTrigger: { trigger: ".community", start: "top bottom", end: "bottom top", scrub: S(0.5) } }
      );
      gsap.fromTo(
        ".community-title",
        { scale: 0.82, transformOrigin: "left bottom" },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".community", start: "top bottom", end: "top 20%", scrub: S(0.5) } }
      );

      // Correo y nombre del pie: las letras suben en ola.
      for (const sel of [".contact-email", ".footer-name"]) {
        const chars = q(`${sel} [data-char]`);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sel,
            start: "top bottom",
            end: sel === ".footer-name" ? "bottom bottom" : "top 55%",
            scrub: S(0.6),
          },
        });
        tl.fromTo(chars, { yPercent: 110 }, { yPercent: 0, ease: "none", stagger: 0.04 });
        // Margen al final: la ola termina antes de que acabe el recorrido.
        tl.to({}, { duration: 0.5 });
      }

      // Proyectos en móvil y tableta (sin carrusel): cada tarjeta entra girando.
      mm.add("(max-width: 1023px)", () => {
        q(".project").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 90, rotate: 3, opacity: 0.2 },
            { y: 0, rotate: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 60%", scrub: S(0.5) } }
          );
          gsap.fromTo(
            card.querySelector(".project-media img"),
            { yPercent: -10, scale: 1.2 },
            { yPercent: 10, scale: 1.2, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: ios ? 0.2 : true } }
          );
        });
      });

      // Cambio de sección: mientras la siguiente sube, la anterior se queda
      // atrás (va más lenta) y se oscurece. Sin fijar nada,
      // para que el scroll siga siempre al dedo y ningún texto quede cortado.
      const layers = [...q("main section"), ...q(".footer")];
      layers.forEach((el, i) => gsap.set(el, { zIndex: i + 1 }));
      const shades: HTMLElement[] = [];
      const recede = (sel: string, nextSel: string) => {
        const el = document.querySelector<HTMLElement>(sel);
        const next = document.querySelector<HTMLElement>(nextSel);
        if (!el || !next) return;
        const shade = document.createElement("div");
        shade.className = "cover-shade";
        el.append(shade);
        shades.push(shade);
        const st = {
          trigger: next,
          start: "top bottom",
          end: () => `top ${Math.max(0, window.innerHeight - el.offsetHeight)}px`,
          scrub: ios ? 0.2 : true,
          invalidateOnRefresh: true,
        };
        // En iPhone no se desplaza la sección entera (es enorme y Safari da tirones): solo se oscurece.
        if (!ios) {
          gsap.fromTo(
            el,
            { y: 0 },
            { y: () => Math.min(el.offsetHeight, window.innerHeight) * 0.45, ease: "none", force3D: true, scrollTrigger: st }
          );
        }
        gsap.fromTo(shade, { opacity: 0 }, { opacity: 0.6, ease: "none", scrollTrigger: st });
      };
      recede(".about", ".projects");
      // En proyectos se mueve el carrusel y no la sección: una transformación en
      // la sección rompería el carrusel mientras está fijado.
      recede(".hscroll-inner", ".stack");
      recede(".stack", ".experience");
      recede(".experience", ".community");
      recede(".community", ".contact");
      recede(".contact", ".footer");

      return () => {
        shades.forEach((s) => s.remove());
      };
    });

    // Las posiciones cambian cuando cargan la fuente y las imágenes: recalcular.
    const onLoad = () => {
      // Los pines se crean en varios componentes: ordenarlos por posición antes de medir.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") onLoad();
    document.fonts?.ready.then(onLoad);
    // Si algo cambia de alto más tarde (imágenes, fuentes), las posiciones dejarían de cuadrar.
    // Se mide el contenido y no la página: los espaciadores de los pines no cuentan.
    let lastH = 0;
    let timer = 0;
    const ro = new ResizeObserver(() => {
      const h = document.querySelector("main")?.scrollHeight ?? 0;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    });
    document.querySelectorAll("main section, .footer").forEach((el) => ro.observe(el));
    return () => {
      if (normalize) ScrollTrigger.normalizeScroll(false);
      window.removeEventListener("load", onLoad);
      ro.disconnect();
      clearTimeout(timer);
      mm.revert();
    };
  });

  return <div className="scroll-progress" aria-hidden="true" />;
}
