# Elia Galiana Sanabria · Portfolio

Web personal de Elia Galiana, desarrolladora fullstack en Sevilla.
Publicada en https://eliagaliana.github.io/elia-galiana.github.io/

Hecha con Next.js (exportación estática), GSAP y Motion.

## Editar contenido

Todos los textos, proyectos, stack y experiencia están en `src/content/site.ts`.
Las imágenes están en `src/assets`.

## Trabajar en local

```bash
npm install
npm run dev
```

## Publicar

Cada push a `main` construye la web y la publica en GitHub Pages
(`.github/workflows/deploy.yml`). En el repositorio, Settings → Pages → Source
tiene que estar en "GitHub Actions".
