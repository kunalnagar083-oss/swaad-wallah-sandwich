# Swaad Wallah Sandwich

## Current State
The app is a single-page scrolling site. Home page shows all sections (Hero, Menu, About, Gallery, Contact). Navbar has anchor links (#home, #menu, etc.) that scroll within the page. Orders is at `/orders`. Admin is at `/admin`.

## Requested Changes (Diff)

### Add
- `/menu` page: standalone page showing only MenuSection + Navbar + Footer
- `/about` page: standalone page showing only AboutSection + Navbar + Footer
- `/gallery` page: standalone page showing only GallerySection + Navbar + Footer
- `/order` page: standalone page showing CartDrawer-equivalent full-page order flow + Navbar (rename existing `/orders` to `/order` or keep both)
- `/profile` page: if not logged in shows login form; if logged in shows profile info + order history (merge current Orders page into this)
- Update Navbar to have route-based links for all pages: Home (`/`), Menu (`/menu`), About (`/about`), Gallery (`/gallery`), Order (`/order`), Profile (`/profile`)
- Navbar should work with both scroll (on home page) and route navigation (everywhere else)

### Modify
- `App.tsx`: add new routes for /menu, /about, /gallery, /order, /profile
- `Navbar.tsx`: replace anchor scroll links with route-based navigation links; keep all 6 pages in nav; highlight active route; keep Admin hidden at /admin
- Profile page replaces the separate `/orders` route (or keep /orders redirecting to /profile)

### Remove
- Old anchor-only navigation pattern from Navbar (replace with router links)

## Implementation Plan
1. Create `src/frontend/src/pages/MenuPage.tsx` — wraps MenuSection with Navbar+Footer
2. Create `src/frontend/src/pages/AboutPage.tsx` — wraps AboutSection with Navbar+Footer
3. Create `src/frontend/src/pages/GalleryPage.tsx` — wraps GallerySection with Navbar+Footer
4. Create `src/frontend/src/pages/OrderPage.tsx` — full page order view (cart + order placement) with Navbar+Footer
5. Create `src/frontend/src/pages/ProfilePage.tsx` — login form when logged out; profile + order history when logged in
6. Update `App.tsx` to register all new routes
7. Update `Navbar.tsx` to use router Link navigation with active state highlighting; add all 6 page links (Home, Menu, About, Gallery, Order, Profile); keep Admin button hidden; on home page `/` keep scroll behavior for in-page anchors optional
