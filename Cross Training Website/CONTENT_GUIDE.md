# Content Guide

This guide explains how to update the most common content on the Cross Training website **without touching any layout or logic code**. Every section below tells you exactly which file to open, which field to change, and what format to use.

After making any change, rebuild the site (`npm run build`) and the update will appear automatically.

---

## Table of Contents

1. [Update the Instagram handle](#1-update-the-instagram-handle)
2. [Add or update the contact email address](#2-add-or-update-the-contact-email-address)
3. [Update the trainer bio and name](#3-update-the-trainer-bio-and-name)
4. [Add a trainer photo](#4-add-a-trainer-photo)
5. [Update service pricing](#5-update-service-pricing)
6. [Change a service from "coming soon" to active](#6-change-a-service-from-coming-soon-to-active)
7. [Add a new service](#7-add-a-new-service)
8. [Update page copy (headlines, mission body, etc.)](#8-update-page-copy)
9. [Update the Bible verse list](#9-update-the-bible-verse-list)

---

## 1. Update the Instagram Handle

**File:** `src/content/site.config.ts`

There are two fields to keep in sync:

| Field | What it does |
|---|---|
| `instagramHandle` | The handle without the `@` symbol — used in on-page text |
| `instagramUrl` | The full profile URL — used as the link `href` everywhere |

**Example — before:**
```ts
instagramHandle: 'crosstrainingco',
instagramUrl: 'https://instagram.com/crosstrainingco',
```

**Example — after (replace with your real handle):**
```ts
instagramHandle: 'yourrealinsta',
instagramUrl: 'https://instagram.com/yourrealinsta',
```

Both fields must be updated together so the link and the displayed text stay in sync.

---

## 2. Add or Update the Contact Email Address

**File:** `src/content/site.config.ts`

Find the `contactEmail` field. Set it to your email address to make a `mailto:` link appear on the Contact page and in the footer. Leave it as `""` (empty string) to hide it entirely.

**Example — add an email:**
```ts
contactEmail: 'coach@crosstraining.com',
```

**Example — hide the email (default):**
```ts
contactEmail: '',
```

No other files need to change — the Contact page and Footer read this value automatically.

---

## 3. Update the Trainer Bio and Name

**File:** `src/content/about.content.ts`

Look for the `trainers` array inside `aboutContent`. Each trainer is an object with `name`, `photoUrl`, `bio`, and `qualifications` fields.

**To update the placeholder trainer:**

```ts
trainers: [
  {
    name: 'Coach Marcus Johnson',          // ← replace with the real name
    photoUrl: '',                          // ← see section 4 to add a photo
    bio:
      'Real bio here. Describe coaching philosophy, ' +
      'athletic background, and faith values.\n\n' +
      'Second paragraph goes here.',       // ← \n\n creates a paragraph break
    qualifications: [
      'Certified Youth Coach',
      'Former Collegiate Athlete',
      'Basketball Specialist',
    ],
  },
],
```

**To add a second trainer,** add another object to the `trainers` array:

```ts
trainers: [
  {
    name: 'Coach Marcus Johnson',
    photoUrl: '',
    bio: '...',
    qualifications: ['...'],
  },
  {
    name: 'Coach Sarah Williams',          // ← new trainer
    photoUrl: '',
    bio: '...',
    qualifications: ['...'],
  },
],
```

---

## 4. Add a Trainer Photo

**File:** `src/content/about.content.ts`

Find the trainer's object in the `trainers` array (see section 3) and update the `photoUrl` field.

**Option A — hosted image URL:**
```ts
photoUrl: 'https://example.com/path/to/coach-photo.jpg',
```

**Option B — local image file:**

1. Place the photo file in `src/assets/` (e.g., `src/assets/coach-marcus.jpg`).
2. Update `photoUrl` to the relative path from the `about.content.ts` file:
```ts
photoUrl: '/src/assets/coach-marcus.jpg',
```

> **Tip:** Leave `photoUrl` as `""` (empty string) while you don't have a real photo yet. The component displays a styled placeholder block instead of a broken image.

---

## 5. Update Service Pricing

**File:** `src/content/services.content.ts`

Find the service in the `services` array by its `name` or `id`, then update the `price` field.

**Example — update basketball pricing:**
```ts
{
  id: 'basketball-training',
  name: 'Basketball Training',
  // ...
  price: '$60 / session',    // ← change this value
  status: 'active',
},
```

Use a human-readable string like `"$50 / session"`, `"$200 / month"`, or `"Contact for pricing"`. Leave as `""` to hide the price field entirely on the card.

---

## 6. Change a Service from "Coming Soon" to Active

**File:** `src/content/services.content.ts`

Find the service in the `services` array and change its `status` from `"coming_soon"` to `"active"`. Also set a real `price` if you have one.

**Example — launching Soccer Training:**
```ts
{
  id: 'soccer-training',
  name: 'Soccer Training',
  description: 'Updated description of the live soccer program.',
  targetSkillLevel: 'Ages 8–18 · All skill levels',
  price: '$50 / session',    // ← set a real price
  status: 'active',          // ← change from 'coming_soon' to 'active'
},
```

Once `status` is `'active'`, the "Coming Soon" badge disappears and the "Book via Instagram" button becomes clickable.

---

## 7. Add a New Service

**File:** `src/content/services.content.ts`

Add a new object to the `services` array inside `servicesContent`. Copy the structure below and fill in each field:

```ts
{
  id: 'speed-training',              // unique, lowercase, hyphen-separated — do not change after launch
  name: 'Speed Training',            // display name shown on the card
  description:
    'One-to-two sentence description of the program. ' +
    'Keep it concise.',
  targetSkillLevel: 'Ages 10–18 · All skill levels',
  price: '$55 / session',            // use "" to hide price until set
  status: 'coming_soon',             // 'active' or 'coming_soon'
},
```

The new service card appears on the Services page automatically on the next build.

---

## 8. Update Page Copy

Page copy lives in the content files listed below. Each file is a single exported constant with inline comments explaining each field.

### Home Page — hero headline, tagline, mission body, disciplines

**File:** `src/content/home.content.ts`

| Field | What it controls |
|---|---|
| `heroHeadline` | Large bold headline in the hero section |
| `heroTagline` | One-line supporting tagline below the headline |
| `heroCtaLabel` | Text on the "Book Your Session" button |
| `missionTitle` | Heading of the mission/overview section |
| `missionBody` | Body paragraph(s) of the mission section |
| `disciplinesTitle` | Heading above the sports disciplines grid |
| `disciplines` | Array of sports — add, remove, or reorder freely |

### About Page — faith section, audience section, CTA label

**File:** `src/content/about.content.ts`

| Field | What it controls |
|---|---|
| `faithTitle` | Heading of the faith/brand-origin section |
| `faithBody` | Body paragraph(s) of the faith section |
| `trainersTitle` | Heading of the trainers section |
| `audienceTitle` | Heading of the "Who We Train" section |
| `audienceBody` | Body paragraph(s) of the audience section |
| `ctaLabel` | Text on the booking CTA button |

### Services Page — page title and subtitle

**File:** `src/content/services.content.ts`

| Field | What it controls |
|---|---|
| `pageTitle` | Main heading at the top of the Services page |
| `pageSubtitle` | Short subtitle beneath the heading |

### Contact Page — instructions and booking note

**File:** `src/content/contact.content.ts`

| Field | What it controls |
|---|---|
| `pageTitle` | Heading at the top of the Contact page |
| `primaryInstruction` | Main instruction directing visitors to Instagram DM |
| `instagramCtaLabel` | Text on the Instagram button |
| `bookingNote` | Note about upcoming booking software |

### Site-Wide — brand name and copyright

**File:** `src/content/site.config.ts`

| Field | What it controls |
|---|---|
| `brandName` | Business name shown in the navigation header and footer |
| `copyrightText` | Footer copyright line (year auto-updates) |

---

## 9. Update the Bible Verse List

**File:** `src/hooks/useDailyVerse.ts`

The site displays one verse per ISO week of the year. The list lives in the `VERSE_LIST` constant — an array of 52 `{ text, reference }` objects, one per week.

**To change a verse:**

Find the entry for the week you want to update (comments label each week) and replace the `text` and `reference` values:

```ts
// Week 1
{ text: 'Your new verse text here.', reference: 'Book Chapter:Verse' },
```

**To add a verse at the end** (for week 53 leap years):

Append an additional entry to the array:
```ts
{ text: 'Verse text.', reference: 'Book Chapter:Verse' },
```

**Format rules:**
- `text` — the verse text as a plain string, no quotation marks needed
- `reference` — the scripture citation in `"Book Chapter:Verse"` format, e.g. `"Philippians 4:13"`

The widget automatically selects the entry whose position matches the current ISO week number, so the list order matters — week 1 maps to index 0, week 2 to index 1, and so on.
