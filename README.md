# Appscrip Task — Product Listing Page

A production-ready **Next.js 14** Product Listing Page (PLP) built with Server-Side Rendering (SSR), responsive design, full SEO optimisation, and live product data from the [FakeStore API](https://fakestoreapi.com/).

---

## 🚀 Live Demo

> Deploy to Netlify and replace this URL.

**GitHub Repo:** `https://github.com/<your-username>/Appscrip-task-<your-name>`

---

## ✨ Features

| Feature | Detail |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Rendering** | SSR (`force-dynamic`) + ISR for API routes |
| **API** | FakeStore API — products & categories |
| **Responsive** | Mobile (320px) · Tablet (640px) · Desktop (1440px) |
| **SEO** | H1/H2 tags, meta title/description, JSON-LD schema, sitemap.xml, robots.txt, canonical URLs, OG tags |
| **Accessibility** | ARIA roles, labels, live regions, keyboard navigation |
| **Performance** | next/image with lazy loading, CSS Modules (no CSS-in-JS), zero external UI packages |
| **Filtering** | Sidebar filters: category, occasion, fabric, price range, rating |
| **Sorting** | Recommended / Newest / Popular / Price asc/desc |
| **Pagination** | Client-side pagination (12 products per page) |
| **Wishlist** | Per-card toggle with ARIA pressed state |
| **View Modes** | Grid (4/3/2 cols) and List view |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout — metadata, fonts
│   ├── page.js            # SSR page — data fetching server-side
│   ├── PLPClient.js       # Client component — interactivity
│   ├── page.module.css    # Page-level styles
│   ├── error.js           # Error boundary
│   └── loading.js         # Loading skeleton
├── components/
│   ├── Header/            # Sticky header with nav & icons
│   ├── Footer/            # Footer with newsletter & links
│   ├── ProductCard/       # Individual product card
│   ├── ProductGrid/       # Grid + pagination + sort bar
│   ├── FilterSidebar/     # Desktop & mobile filter panel
│   └── SortBar/           # Sort dropdown + view toggle
├── lib/
│   └── api.js             # FakeStore API helpers + schema builder
└── styles/
    └── globals.css        # CSS variables + resets
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Clone or extract this project
git clone https://github.com/<your-username>/Appscrip-task-<your-name>.git
cd Appscrip-task-<your-name>

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment (Netlify)

1. Push the repo to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Add the `@netlify/plugin-nextjs` plugin (already in `netlify.toml`)
5. Deploy!

---

## 🔍 SEO Implementation

- **Page title:** `<title>` set via Next.js `metadata` export
- **Meta description:** Configured in `layout.js`
- **H1:** "Discover Our Products" — prominent page heading
- **H2:** "About Our Collection" — content section heading
- **JSON-LD Schema:** `CollectionPage` + `ItemList` + `Product` with `AggregateRating` and `Offer`
- **Image alt text:** Descriptive, product-title-based alt attributes
- **Canonical URL:** Set via `metadata.alternates.canonical`
- **OG / Twitter cards:** Full Open Graph metadata
- **sitemap.xml:** All category URLs
- **robots.txt:** Crawl permissions + sitemap reference

---

## 📱 Responsive Breakpoints

| Breakpoint | Columns | Notes |
|---|---|---|
| `< 375px` | 1 col | Very small mobile |
| `375px – 640px` | 2 cols | Standard mobile |
| `640px – 1024px` | 2–3 cols | Tablet (sidebar hidden) |
| `1024px – 1280px` | 3 cols | Small desktop |
| `> 1280px` | 4 cols | Full desktop |

---

## 📦 Dependencies

Only **essential** packages used — no heavy UI libraries:

```json
{
  "next": "14.2.3",
  "react": "^18",
  "react-dom": "^18"
}
```

All icons are hand-coded inline SVGs. All styles use CSS Modules.

---

## 🏗️ SSR Details

The root `page.js` is a **React Server Component** that:
1. Fetches products and categories in parallel (`Promise.all`) on the server
2. Passes pre-rendered data to client components as props
3. Generates JSON-LD schema server-side for SEO bots
4. Sets `export const dynamic = 'force-dynamic'` to ensure fresh data on every request

Category switching uses a client-side fetch (no full page reload) with URL state via `history.replaceState`.

---

*Built with ❤️ for Appscrip's frontend engineering assessment.*
