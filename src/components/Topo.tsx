// Líneas topográficas generadas en el build (sin JavaScript en el cliente).
// Cada "monte" es una familia de curvas cerradas deformadas con senos.

function contour(cx: number, cy: number, r: number, seed: number, k: number) {
  const pts: string[] = [];
  const steps = 96;
  for (let s = 0; s <= steps; s++) {
    const t = (s / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.16 * Math.sin(3 * t + seed + k * 0.22) +
      0.09 * Math.sin(5 * t - seed * 1.7 + k * 0.15) +
      0.05 * Math.sin(9 * t + seed * 0.6);
    const x = cx + Math.cos(t) * r * wobble * 1.35;
    const y = cy + Math.sin(t) * r * wobble;
    pts.push(`${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join("") + "Z";
}

const hills = [
  { cx: 1180, cy: 260, seed: 1.3, rings: 14 },
  { cx: 180, cy: 760, seed: 4.1, rings: 12 },
  { cx: 820, cy: 980, seed: 2.6, rings: 9 },
];

const paths = hills.flatMap((h) =>
  Array.from({ length: h.rings }, (_, k) => contour(h.cx, h.cy, 26 + k * 34, h.seed, k))
);

export function Topo({ className }: { className?: string }) {
  return (
    <svg
      className={`topo ${className ?? ""}`}
      viewBox="0 0 1440 1100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
