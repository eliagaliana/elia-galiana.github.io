// Parte un texto en letras para animarlas una a una con el scroll.
// Los lectores de pantalla leen el texto entero (aria-label en el padre).
export function SplitChars({ text }: { text: string }) {
  return (
    <span className="split" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="split-char" data-char>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
