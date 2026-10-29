"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// El campo violeta se abre desde una tarjeta hasta ocupar todo el ancho.
export function CommunityField({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const clipPath = useTransform(scrollYProgress, (p) => {
    const i = (1 - p) * 8;
    const r = (1 - p) * 40;
    return `inset(0 ${i}% round ${r}px)`;
  });

  return (
    <motion.div ref={ref} className="community-field" style={reduce ? undefined : { clipPath }}>
      {children}
    </motion.div>
  );
}
