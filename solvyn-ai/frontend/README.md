# SeaGuard AI — Frontend Prototype

Smarter Breakwater Management with AI. A frontend-only React prototype recreating the SeaGuard AI dashboard suite from the provided UI reference screenshots.

## Tech Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Lucide React icons
- Recharts (wave charts, lifespan distribution)

No backend, database, or real APIs — all data is static/mock, defined in `src/data/`.

## Pages / Routes
| Route | Page |
|---|---|
| `/` | Dashboard (hero, zone selector, stats, services, stone database preview, about) |
| `/service` | Service catalogue grid |
| `/wave-analysis` | Wave Analysis (import, direction/period chart, wave height trend, AI structural impact) |
| `/pre-post-analysis` | Pre & Post Image Analysis (upload, comparison result, progress, sensor views) |
| `/3d-reconstruction` | 3D Reconstruction viewer (orbit/pan/zoom toolbar, settings, model info) |
| `/database` | Stone Database (zone 3D view, paginated table, add-stone panel with AI extraction) |
| `/risk-lifespan` | Risk & Lifespan Prediction (lifespan distribution chart, risk table) |
| `/maintenance` | Maintenance Recommendation (recommended actions, intervention analysis, work order) |
| `/reports` | Report Generation (section toggles, live preview, format/export) |
| `/about` | About & Features |

## Components
`Sidebar`, `Navbar`, `Logo`, `PageHeader`, `StatCard` (+ many page-local subcomponents such as upload cards, legends, mini stats, badges).

## Interactions implemented
- Sidebar navigation with active states + mobile drawer
- Zone selectors (dashboard, database, maintenance, risk pages) filter mock data
- Notification & profile dropdowns in the navbar
- Image "upload" cards with drag/drop styling and remove (X) button
- 3D viewer tabs (3D View / Point Cloud / Mesh / Textured) + toggle switches
- Stone Database search, pagination controls, add-stone form with animated "AI extraction" progress
- Report Generation section toggles, format switch (PDF/PPT/DOCX), tabbed report preview
- Wave Analysis charts (Recharts) with tooltips
- Responsive layouts down to mobile (drawer sidebar, stacked grids, scrollable tables)

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Sidebar, Navbar, Logo, PageHeader, StatCard
├── layouts/        # MainLayout (sidebar + navbar shell)
├── pages/           # One file per route
├── data/            # Mock data: stones, wave data, maintenance, nav config
├── App.jsx
├── main.jsx
└── index.css
```

## Notes
- Images use Unsplash placeholder photography styled to match the reference (breakwater/coastal imagery). Swap `src/data` and image URLs with real assets for production.
- This is a frontend-only prototype: forms, uploads, and "AI analysis" actions render mock states — no data is persisted or sent anywhere.
