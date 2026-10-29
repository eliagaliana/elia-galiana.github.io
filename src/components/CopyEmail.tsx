"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className="btn btn-ghost" onClick={copy}>
      <span className="copy-label" aria-live="polite">
        {copied ? "Copiado" : "Copiar correo"}
      </span>
    </button>
  );
}
