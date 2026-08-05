# Safeguard Group website

Production-ready marketing website for Safeguard Group Health & Safety Consultancy, based on the supplied Figma Make project.

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

## Deployment

The site is a Vite static build. Deploy the `dist` directory after running `npm run build`.

- Vercel: import the repository; framework preset `Vite`; build command `npm run build`; output directory `dist`.
- Netlify: import the repository; build command `npm run build`; publish directory `dist`.

SPA rewrites are included for both Vercel (`vercel.json`) and Netlify (`public/_redirects`).

Confirm the production email address and domain before launch. If the final domain differs from the default, update `index.html`, `public/robots.txt` and `public/sitemap.xml`.

## Content and SEO

- Responsive home, scaffold inspection and scaffolding project support pages
- Route-specific titles, descriptions, canonical URLs and Open Graph metadata
- `robots.txt` and XML sitemap
- Keyboard navigation and semantic landmarks
- No analytics or non-essential cookies enabled by default
