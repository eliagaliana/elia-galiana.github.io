"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// La línea de la trayectoria se dibuja al ritmo del scroll.
export function TimelineLine({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="timeline">
      <div className="timeline-rail" aria-hidden="true">
        <div ref={line} className="timeline-line" />
      </div>
      {children}
    </div>
  );
}
