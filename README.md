# Paisa Clarity 🇮🇳

> Know where your Paisa goes — UPI spending clarity for every Indian.

## Tech Stack
- React 18 + Vite
- CSS Modules (no Tailwind, no UI libraries — pure custom)
- Plus Jakarta Sans + Inter fonts
- Dark / Light theme with system preference detection
- EN / HI language toggle

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your GitHub repo
3. Vercel auto-detects Vite — just click Deploy
4. Done! Live URL in ~60 seconds ✅

## Email Capture

The site posts to `POST /api/subscribe` (Vercel Function) to send a confirmation email via Resend.

Required env vars on Vercel:
- `RESEND_API_KEY`

Notes:
- If your Resend account is in sandbox mode, Resend may reject sending to unverified recipients; the API will return an error message you can see in the UI toast.

## SEO
- Meta tags in `index.html`
- Add `sitemap.xml` and `robots.txt` in `/public` before going live

## Folder Structure

```
src/
  components/     # All UI components with CSS Modules
  hooks/          # useTheme, useLang
  App.jsx         # Root — wires everything
  index.css       # Global CSS variables (light + dark theme)
  main.jsx        # Entry point
```
