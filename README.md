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

Copy `.env.example` to the deployment environment and replace the placeholder contact values and final production domain. The same final domain must also be applied to `public/robots.txt` and `public/sitemap.xml` if it differs from the default.

## Content and SEO

- Responsive service, about, contact, privacy and 404 pages
- Route-specific titles, descriptions, canonical URLs and Open Graph metadata
- LocalBusiness structured data
- `robots.txt` and XML sitemap
- Keyboard navigation, semantic landmarks and reduced-motion support
- No analytics or non-essential cookies enabled by default
