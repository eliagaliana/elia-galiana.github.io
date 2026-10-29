"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Anillo que sigue al ratón y crece sobre enlaces y botones.
// El CSS lo oculta en pantallas táctiles y con movimiento reducido.
export function Cursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(!!(e.target as Element).closest?.("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div className="cursor" aria-hidden="true" style={{ x: sx, y: sy }}>
      <div className="cursor-ring" data-active={active || undefined} />
    </motion.div>
  );
}
