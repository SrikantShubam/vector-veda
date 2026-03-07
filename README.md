# Genesy Next Mirror

Generated from mirrored Framer output.

## Commands
- `npm install`
- `npm run dev`
- `npm run build:next`
- `npm run start`

## Runtime
- Use Node.js `20.x` (see `.nvmrc`).
- `npm run start` requires a successful build first (`npm run build:next`).

## Mirrored Routes
- `/` -> `mirror_html/index.html`
- `/legals/privacy-policy` -> `mirror_html/legals/privacy-policy/index.html`
- `/legals/terms-of-service` -> `mirror_html/legals/terms-of-service/index.html`

## Notes
- Assets are served from `public/assets`.
- Raw mirrored HTML is stored in `mirror_html`.
- Runtime script tags are replayed by `components/ScriptLoader.jsx`.
