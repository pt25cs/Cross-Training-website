# Cross Training Website — Masterplan

## Project Overview

Build a public-facing marketing website for **Cross Training**, a faith-based youth athletic training business. The site serves as the brand's online presence — communicating who they are, what they offer, and directing prospective clients to book sessions via Instagram DM until a formal booking system is in place.

---

## Business Context

**Business name:** Cross Training  
**Brand identity:** The name carries a dual meaning — cross-training across multiple sports disciplines, and the Christian cross as the foundation of the coaching philosophy.  
**Primary audience:** Youth athletes ages 8–18 and their parents  
**Booking channel:** Instagram DM (Wix Bookings / Booksy integration planned for the future)  
**Social presence:** Instagram (handle to be confirmed before launch)

---

## Goals

1. Establish a professional online presence for the business before launch
2. Clearly communicate the faith-based, multi-sport training mission
3. Present available and upcoming training services with pricing
4. Direct visitors to book sessions via Instagram DM
5. Showcase trainer profiles and build trust with families
6. Reflect the Christian values of the brand in the design and copy
7. Make all content easily updatable by non-developers (no code changes needed for copy updates)

---

## Pages

### Home (`/`)
The primary landing page. Designed to hook visitors quickly and push them toward booking.

- **Hero section** — bold headline, tagline, and primary booking CTA
- **Mission section** — multi-paragraph overview of the Cross Training philosophy
- **Disciplines grid** — visual list of all sports offered, with "Coming Soon" badges for programs not yet live
- **Bible Verse of the Day widget** — rotating weekly verse, fetched from an API with a local fallback
- **Bottom booking CTA** — second opportunity to convert at the end of the page

### About (`/about`)
Builds trust by introducing the people and values behind the brand.

- **Faith section** — explains the dual meaning of "Cross Training" and the Christian foundation
- **Trainer profiles** — photo, bio, and qualifications for each coach (placeholder until real photos/bios are ready)
- **Who We Train section** — describes the target audience, age ranges, and what families can expect
- **Booking CTA** — closes the page with a prompt to reach out

### Services (`/services`)
Presents all training offerings in a scannable card layout.

- **Page header** — title and subtitle
- **Services grid** — one card per service showing name, description, skill level, price, and booking CTA
- Active services show a "Book via Instagram DM" button; coming-soon services show a badge instead

### Contact (`/contact`)
Simple, friction-free contact page that funnels visitors to Instagram.

- **Primary instruction** — tells visitors to DM on Instagram
- **Instagram CTA button** — links directly to the Instagram profile
- **Optional email link** — shown only when a contact email is configured
- **Booking note** — mentions that integrated online booking (Wix Bookings / Booksy) is coming soon

---

## Key Features

### Bible Verse of the Day Widget
A visually distinct widget displayed on the Home page, styled like an iPhone lock-screen widget.

- Fetches live verse text from `bible-api.com` based on the current ISO week
- 52 curated verses selected for themes of strength, perseverance, faith, and courage — well-suited to an athletic training brand
- Falls back to a hardcoded verse (`Philippians 4:13`) if the API is unavailable
- Shows a skeleton shimmer loading state to prevent layout shift

### Content-First Architecture
All page copy lives in dedicated content files (`src/content/`) — no strings are hardcoded in components. This means:

- Copy can be updated without touching any layout or logic code
- A non-developer can follow the `CONTENT_GUIDE.md` to make any common update
- Brand-level config (name, Instagram handle, email, copyright) is centralized in `site.config.ts` and propagates everywhere automatically

### Instagram-Driven Booking
Because a formal booking system isn't live yet, every CTA on the site points to the Instagram profile. The URL is configured once in `site.config.ts` — updating it propagates to every button and link on the site.

### Coming Soon States
Services and disciplines not yet live render with a "Coming Soon" badge instead of a booking button. Flipping a service to active requires changing one field (`status: 'coming_soon'` → `status: 'active'`) in the content file.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 19 + TypeScript | Component-based, type-safe |
| Build tool | Vite 8 | Fast dev server and optimized production builds |
| Routing | React Router v7 (HashRouter) | Hash-based routing works on static hosts with no server config |
| Styling | CSS Modules | Scoped styles, no runtime overhead |
| Testing | Vitest + Testing Library + jest-axe | Unit, integration, and accessibility testing |
| Hosting target | Vercel (primary) + GitHub | Static deployment, easy CI/CD via git push |

---

## Routing Strategy

Uses `HashRouter` (`/#/about`, `/#/services`, etc.) so the site works on any static host — including GitHub Pages, Vercel, and Netlify — without requiring server-side URL rewriting. Unknown routes redirect to home to prevent blank-screen 404s.

---

## Content Update Model

Content is split into two layers:

**Brand-level (`site.config.ts`)** — changes here affect the entire site:
- Business name
- Instagram handle and URL
- Contact email
- Copyright text

**Page-level (`src/content/*.content.ts`)** — changes here affect one page:
- `home.content.ts` — hero copy, mission, disciplines list
- `about.content.ts` — faith section, trainer profiles, audience copy
- `services.content.ts` — service cards, pricing, active/coming-soon status
- `contact.content.ts` — instructions and booking note

Full step-by-step instructions for all common updates are in `CONTENT_GUIDE.md`.

---

## Pre-Launch Checklist

These items are placeholders in the current build and need to be updated before going live:

- [ ] Replace Instagram handle and URL in `site.config.ts`
- [ ] Add contact email in `site.config.ts` (or leave blank to hide it)
- [ ] Replace coach name, bio, and qualifications in `about.content.ts`
- [ ] Add real trainer photo (or leave blank for CSS placeholder)
- [ ] Finalize hero headline and tagline in `home.content.ts`
- [ ] Confirm basketball session pricing in `services.content.ts`
- [ ] Update remaining copy marked with `⚠️ PLACEHOLDER` comments
- [ ] Update `<title>` in `index.html` (done — now reads "Cross Training")
- [ ] Add a real `favicon.svg` that reflects the brand

---

## Future Enhancements

- Integrate Wix Bookings or Booksy for online session scheduling
- Add individual athlete progress tracking or portal
- Expand trainer roster as the team grows
- Launch additional sport programs (Soccer, Volleyball, Weight Training, Footwork & Agility) and flip their status to `active`
- Add an image gallery or video highlights section
