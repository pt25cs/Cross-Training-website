/**
 * about.content.ts — About page content configuration
 *
 * Edit the values in `aboutContent` to update the About page copy,
 * trainer profiles, faith section, and audience description.
 * No component code needs to change — the page reads directly from this file.
 *
 * See CONTENT_GUIDE.md for step-by-step update instructions.
 */

/**
 * A single trainer / coach profile displayed on the About page.
 */
export interface Trainer {
  /**
   * The trainer's full display name.
   * Example: "Coach Marcus Johnson"
   */
  name: string;

  /**
   * URL or local asset path to the trainer's headshot photo.
   * Leave as "" (empty string) to display a CSS-styled placeholder block
   * instead of a broken image — safe to ship before real photos are ready.
   * Example: "https://example.com/coach-photo.jpg"
   * Example (placeholder): ""
   */
  photoUrl: string;

  /**
   * Multi-sentence biography describing the trainer's coaching philosophy,
   * athletic background, and approach to faith-based training.
   * Can include line breaks (\n) for multi-paragraph display.
   */
  bio: string;

  /**
   * List of credentials, certifications, or notable qualifications.
   * Each entry renders as a badge or bullet on the trainer card.
   * Example: ["Certified Youth Coach", "Former Collegiate Athlete"]
   */
  qualifications: string[];
}

/**
 * All content displayed on the About (/about) page.
 */
export interface AboutContent {
  /**
   * Heading for the faith / brand-origin section at the top of the page.
   * Example: "Faith at the Foundation"
   */
  faithTitle: string;

  /**
   * Body text explaining the Christian foundation and the dual meaning
   * of the "Cross Training" brand name.
   * Can include line breaks (\n) for multi-paragraph formatting.
   */
  faithBody: string;

  /**
   * Heading for the trainers / coaches section.
   * Example: "Meet the Coaches"
   */
  trainersTitle: string;

  /**
   * Array of trainer profiles to display.
   * Add one object per coach. Remove placeholder entries and replace
   * with real coach data before launch.
   */
  trainers: Trainer[];

  /**
   * Heading for the audience / who-we-serve section.
   * Example: "Who We Train"
   */
  audienceTitle: string;

  /**
   * Body text describing the target audience: youth athletes, age groups,
   * skill levels, and what families can expect from the program.
   */
  audienceBody: string;

  /**
   * Label for the booking call-to-action button on the About page.
   * Example: "Ready to Train? Book via Instagram"
   */
  ctaLabel: string;
}

export const aboutContent: AboutContent = {
  /** Faith section heading */
  faithTitle: 'Faith at the Foundation',

  /**
   * ⚠️  PLACEHOLDER — replace with final approved faith section copy before launch.
   * This should explain the dual meaning of the brand name and the Christian values
   * that shape every session.
   */
  faithBody:
    '"Cross Training" means two things to us, and that\'s intentional.\n\n' +
    'In athletics, cross-training means developing multiple skills across multiple ' +
    'disciplines to build a more complete, resilient athlete. We do that — our coaches ' +
    'work with young athletes across basketball, soccer, volleyball, weight training, ' +
    'and footwork.\n\n' +
    'But the name runs deeper. The Cross is the foundation of our faith, and that faith ' +
    'shapes everything we do. We coach with integrity. We lead with humility. We celebrate ' +
    'wins and learn from losses — the same values the gospel calls us to live every day.\n\n' +
    'We\'re not just building athletes. We\'re building people.',

  /** Trainers section heading */
  trainersTitle: 'Meet the Coaches',

  trainers: [
    {
      /**
       * ⚠️  PLACEHOLDER — replace with the real coach's name before launch.
       */
      name: 'Coach Placeholder',

      /**
       * Leave as "" until a real headshot is available.
       * The component will display a styled CSS placeholder block instead.
       */
      photoUrl: '',

      /**
       * ⚠️  PLACEHOLDER bio — replace with the real coach's story before launch.
       */
      bio:
        'Coach Placeholder brings a deep love for the game and an even deeper commitment ' +
        'to developing the whole athlete. With years of experience training youth players at ' +
        'every skill level, the approach here is simple: build fundamentals, build confidence, ' +
        'and build character.\n\n' +
        'Every drill has a purpose. Every session is an opportunity to grow — not just as a ' +
        'player, but as a person. Faith guides the coaching philosophy: work hard, stay humble, ' +
        'honor God in everything you do.',

      qualifications: [
        'Certified Youth Coach',
        'Former Collegiate Athlete',
        'Basketball Specialist',
      ],
    },
  ],

  /** Audience section heading */
  audienceTitle: 'Who We Train',

  /**
   * ⚠️  PLACEHOLDER — replace with final approved audience copy before launch.
   */
  audienceBody:
    'Cross Training is built for youth athletes who are serious about getting better. ' +
    'We work with players from ages 8 to 18 across multiple sports, meeting each athlete ' +
    'where they are — whether they\'re just picking up a ball for the first time or preparing ' +
    'for a varsity tryout.\n\n' +
    'Our sessions are welcoming, faith-friendly, and focused on real improvement. Parents can ' +
    'expect honest feedback, measurable progress, and a training environment that reflects the ' +
    'values they\'re raising their kids with.',

  /** Booking CTA button label on the About page */
  ctaLabel: 'Ready to Train? Book via Instagram',
};
