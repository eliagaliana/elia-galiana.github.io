"use client";

import { useEffect, useRef, useState } from "react";

type Row = { acuity: string; area: string; items: string[] };

// Optotipo del stack: al enfocar una línea (ratón, teclado o toque),
// el resto se desenfoca, como en una revisión de la vista.
// En pantallas táctiles se enfoca sola la línea que pasa por el centro de la pantalla.
export function EyeChart({ rows }: { rows: Row[] }) {
  const [focus, setFocus] = useState<number | null>(null);
  const current = focus === null ? null : rows[focus];
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: none)").matches || !list.current) return;
    const items = [...list.current.querySelectorAll<HTMLElement>(".eyechart-row")];
    // Mientras el optotipo está a la vista, queda nítida la línea más cercana al centro.
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = list.current!.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) return;
      const mid = innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) [best, bestDist] = [i, dist];
      });
      setFocus(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="eyechart" data-focusing={focus !== null || undefined}>
      <ul ref={list} className="eyechart-rows" onPointerLeave={(e) => e.pointerType === "mouse" && setFocus(null)}>
        {rows.map((row, i) => (
          <li key={row.acuity}>
            <button
              type="button"
              className="eyechart-row"
              data-row={i}
              data-sharp={focus === i || undefined}
              aria-pressed={focus === i}
              onPointerEnter={(e) => e.pointerType === "mouse" && setFocus(i)}
              onFocus={() => setFocus(i)}
              onClick={() => setFocus(focus === i ? null : i)}
            >
              <span className="eyechart-acuity">{row.acuity}</span>
              <span className="eyechart-letters">{row.items.join(" · ")}</span>
              <span className="eyechart-area">{row.area}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="eyechart-readout" aria-live="polite">
        {current ? (
          <>
            <span className="serif">{current.area}:</span> {current.items.join(", ")}.
          </>
        ) : (
          <>Pasa el ratón o toca una línea para enfocarla.</>
        )}
      </p>
    </div>
  );
}
