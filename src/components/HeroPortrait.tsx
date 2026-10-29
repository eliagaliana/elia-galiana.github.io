"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import cutout from "@/assets/elia-recorte.webp";

// Retrato recortado que gira en 3D siguiendo al ratón, con el halo violeta
// moviéndose al revés para dar profundidad. En táctil y con movimiento
// reducido se queda quieto.
export function HeroPortrait() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 60, damping: 18, mass: 0.8 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], [9, -9]);
  const x = useTransform(sx, [-1, 1], [-20, 20]);
  const glowX = useTransform(sx, [-1, 1], [60, -60]);
  const glowY = useTransform(sy, [-1, 1], [40, -40]);

  useEffect(() => {
    if (reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      px.set((e.clientX / innerWidth) * 2 - 1);
      py.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, px, py]);

  return (
    <div className="hero-stage">
      <motion.div className="hero-glow" aria-hidden="true" style={{ x: glowX, y: glowY }} />
      <motion.figure
        className="hero-portrait"
        style={{ rotateX, rotateY, x, transformPerspective: 1100 }}
      >
        <Image
          src={cutout}
          alt="Retrato de Elia Galiana Sanabria"
          priority
          sizes="(min-width: 1024px) 60vw, 130vw"
        />
      </motion.figure>
    </div>
  );
}
