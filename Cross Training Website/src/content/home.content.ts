/**
 * home.content.ts — Home page content configuration
 *
 * Edit the values in `homeContent` to update the Home page copy,
 * hero text, mission statement, and the disciplines/sports listed.
 * No component code needs to change — the page reads directly from this file.
 *
 * See CONTENT_GUIDE.md for step-by-step update instructions.
 */

/**
 * A sport or training discipline offered (or coming soon) at Cross Training.
 */
export interface Discipline {
  /**
   * Display name of the discipline shown in the Highlights section.
   * Example: "Basketball"
   */
  name: string;

  /**
   * Availability status of this discipline.
   * - "active"      → currently offered; renders a normal tile
   * - "coming_soon" → not yet available; renders a "Coming Soon" badge
   */
  status: 'active' | 'coming_soon';
}

/**
 * All content displayed on the Home (/) page.
 */
export interface HomeContent {
  /**
   * Large bold headline in the hero section.
   * Keep it short, punchy, and athletic — 3–7 words works best.
   * Example: "Train Hard. Play Hard. Honor God."
   */
  heroHeadline: string;

  /**
   * Supporting tagline beneath the hero headline.
   * One sentence that captures the brand promise.
   * Example: "Elite youth athletic training rooted in faith."
   */
  heroTagline: string;

  /**
   * Label text for the primary call-to-action button in the hero section.
   * This links visitors to the Instagram DM booking flow.
   * Example: "Book Your Session"
   */
  heroCtaLabel: string;

  /**
   * Heading for the Mission / Overview section below the hero.
   * Example: "Our Mission"
   */
  missionTitle: string;

  /**
   * Body paragraph(s) for the Mission section.
   * Describes the faith-based athletic training philosophy.
   * Can include line breaks (\n) for multi-paragraph formatting.
   */
  missionBody: string;

  /**
   * Section heading displayed above the disciplines grid.
   * Example: "What We Train"
   */
  disciplinesTitle: string;

  /**
   * Array of sports/disciplines to display in the Highlights section.
   * Set `status: "active"` for live offerings and `"coming_soon"` for
   * future ones. Add, remove, or reorder entries freely.
   */
  disciplines: Discipline[];
}

export const homeContent: HomeContent = {
  /**
   * ⚠️  PLACEHOLDER — replace with final approved hero headline before launch.
   */
  heroHeadline: 'Train Hard. Play Hard. Honor God.',

  /**
   * ⚠️  PLACEHOLDER — replace with final approved tagline before launch.
   */
  heroTagline: 'Elite youth athletic training rooted in faith.',

  /** CTA button label in the hero section */
  heroCtaLabel: 'Book Your Session',

  /** Mission section heading */
  missionTitle: 'Our Mission',

  /**
   * ⚠️  PLACEHOLDER — replace with final approved mission copy before launch.
   */
  missionBody:
    'At Cross Training, we believe that athletic excellence and faith go hand in hand. ' +
    'Our name says it all — we train athletes across multiple disciplines while grounding ' +
    'every session in the values of hard work, humility, and honor.\n\n' +
    'We work with youth athletes to build not just stronger bodies, but stronger character. ' +
    'Whether your child is just starting out or competing at a high level, our coaches meet ' +
    'them where they are and push them to where they can be — on the court, on the field, ' +
    'and in life.',

  /** Disciplines section heading */
  disciplinesTitle: 'What We Train',

  disciplines: [
    {
      /** Basketball is the flagship active offering */
      name: 'Basketball',
      status: 'active',
    },
    {
      /** Soccer sessions are being developed — show Coming Soon badge */
      name: 'Soccer',
      status: 'coming_soon',
    },
    {
      /** Volleyball sessions are being developed — show Coming Soon badge */
      name: 'Volleyball',
      status: 'coming_soon',
    },
    {
      /** Weight Training program is being developed — show Coming Soon badge */
      name: 'Weight Training',
      status: 'coming_soon',
    },
    {
      /** Footwork & Agility program is being developed — show Coming Soon badge */
      name: 'Footwork',
      status: 'coming_soon',
    },
  ],
};
