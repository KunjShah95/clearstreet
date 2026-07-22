# Clear Street — Project Guide

## Stack
- **Framework**: TanStack Start (React 19, Vite, Nitro SSR)
- **Styling**: Tailwind CSS v4 + tw-animate-css
- **Icons**: lucide-react
- **Animations**: CSS-only (custom `@keyframes` + IntersectionObserver)
- **Logos**: Custom SVG (ClearStreetLogo component)

## Conventions
- Use `@` path alias for absolute imports (`@/components/...`)
- Route files in `src/routes/` follow TanStack file-based routing
- Custom CSS utilities prefixed with `cs-` (e.g. `cs-h1`, `cs-btn`, `cs-glass`)
- Keep animations CSS-only where possible (no framer-motion)
- Image optimization: always include `loading="lazy"`, `decoding="async"`, width/height
