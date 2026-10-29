"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

// Fila que se desplaza en bucle y acelera con la velocidad del scroll.
export function VelocityMarquee({
  children,
  speed = 3,
  repeat = 1,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  // Veces que se repite el contenido en cada mitad: con textos cortos hace
  // falta repetirlo para que la fila cubra pantallas anchas sin huecos.
  repeat?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const transform = useTransform(base, (v) => `translate3d(${wrap(-50, 0, v)}%,0,0)`);
  const dir = useRef(speed < 0 ? -1 : 1);
  const items = Array.from({ length: repeat }, (_, i) => <Fragment key={i}>{children}</Fragment>);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * Math.abs(speed) * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = speed < 0 ? 1 : -1;
    else if (f > 0) dir.current = speed < 0 ? -1 : 1;
    move += dir.current * Math.abs(move) * Math.abs(f);
    base.set(base.get() + move);
  });

  return (
    <div className={`marquee ${className ?? ""}`}>
      <motion.div className="marquee-track" style={{ transform }}>
        <div className="marquee-group">{items}</div>
        <div className="marquee-group" aria-hidden="true">
          {items}
        </div>
      </motion.div>
    </div>
  );
}
