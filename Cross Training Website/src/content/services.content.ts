/**
 * services.content.ts — Services page content configuration
 *
 * Edit the values in `servicesContent` to update the Services page title,
 * subtitle, and the list of training offerings with their pricing and status.
 * No component code needs to change — the page reads directly from this file.
 *
 * See CONTENT_GUIDE.md for step-by-step update instructions.
 */

/**
 * A single training service / offering displayed on the Services page.
 */
export interface ServiceItem {
  /**
   * Unique identifier for this service.
   * Used as a React key — must be lowercase, hyphen-separated, and stable.
   * Do not change this after launch unless you know why.
   * Example: "basketball-training"
   */
  id: string;

  /**
   * Display name of the service shown as the card heading.
   * Example: "Basketball Training"
   */
  name: string;

  /**
   * One-to-two sentence description of what this service covers.
   * Keep it concise — this appears on the service card.
   */
  description: string;

  /**
   * Target skill level or age group for this service.
   * Renders as a sub-label on the service card.
   * Example: "Ages 8–18 · All skill levels"
   */
  targetSkillLevel: string;

  /**
   * Human-readable price string displayed on the card.
   * Use "" (empty string) if pricing is not yet set — the component
   * will hide the price field entirely rather than showing blank.
   * Example: "$50 / session"
   * Example (TBD): ""
   */
  price: string;

  /**
   * Availability status of this service.
   * - "active"      → currently bookable; renders a full card with BookingCTA
   * - "coming_soon" → not yet available; renders a "Coming Soon" badge and
   *                   disables (or hides) the BookingCTA button
   */
  status: 'active' | 'coming_soon';
}

/**
 * All content displayed on the Services (/services) page.
 */
export interface ServicesContent {
  /**
   * Main heading at the top of the Services page.
   * Example: "Training Services"
   */
  pageTitle: string;

  /**
   * Short subtitle beneath the page title.
   * One sentence that sets expectations for what visitors will find.
   * Example: "Faith-based athletic training for youth athletes."
   */
  pageSubtitle: string;

  /**
   * Array of service offerings to display.
   * Add, remove, or reorder entries to change what appears on the page.
   * Update `status` from "coming_soon" to "active" when a service launches.
   */
  services: ServiceItem[];
}

export const servicesContent: ServicesContent = {
  /** Services page main heading */
  pageTitle: 'Training Services',

  /** Services page subtitle */
  pageSubtitle:
    'Faith-based athletic training for youth athletes — building skills, character, and confidence.',

  services: [
    {
      id: 'basketball-training',
      name: 'Basketball Training',

      /**
       * ⚠️  PLACEHOLDER description — update with finalized session details before launch.
       */
      description:
        'Individual and small-group basketball sessions focused on fundamentals, ball-handling, ' +
        'shooting mechanics, footwork, and game IQ. Sessions are tailored to each athlete\'s ' +
        'current level and goals.',

      targetSkillLevel: 'Ages 8–18 · All skill levels',

      /**
       * ⚠️  PLACEHOLDER price — update with final pricing before launch.
       * Current placeholder: $50 per session.
       */
      price: '$50 / session',

      /** Basketball is the active, flagship offering */
      status: 'active',
    },
    {
      id: 'soccer-training',
      name: 'Soccer Training',

      /**
       * ⚠️  PLACEHOLDER — update description when this program launches.
       */
      description:
        'Technical soccer training covering dribbling, passing, shooting, and positional awareness. ' +
        'Program details and scheduling coming soon.',

      targetSkillLevel: 'Ages 8–18 · All skill levels',

      /**
       * Price not yet set — leave as "" until the program launches.
       * The component will hide the price field when this is empty.
       */
      price: '',

      status: 'coming_soon',
    },
    {
      id: 'volleyball-training',
      name: 'Volleyball Training',

      /**
       * ⚠️  PLACEHOLDER — update description when this program launches.
       */
      description:
        'Volleyball skills development including serving, passing, setting, and court positioning. ' +
        'Program details and scheduling coming soon.',

      targetSkillLevel: 'Ages 8–18 · All skill levels',

      /**
       * Price not yet set — leave as "" until the program launches.
       */
      price: '',

      status: 'coming_soon',
    },
    {
      id: 'weight-training',
      name: 'Weight Training',

      /**
       * ⚠️  PLACEHOLDER — update description when this program launches.
       */
      description:
        'Youth-appropriate strength and conditioning program designed to build athletic ' +
        'foundations safely. Focuses on form, functional movement, and sport-specific strength. ' +
        'Program details coming soon.',

      targetSkillLevel: 'Ages 12–18 · Beginner to intermediate',

      /**
       * Price not yet set — leave as "" until the program launches.
       */
      price: '',

      status: 'coming_soon',
    },
    {
      id: 'footwork-agility',
      name: 'Footwork & Agility',

      /**
       * ⚠️  PLACEHOLDER — update description when this program launches.
       */
      description:
        'Speed, agility, and quickness (SAQ) training to improve an athlete\'s first step, ' +
        'change of direction, and overall athleticism across all sports. Program details coming soon.',

      targetSkillLevel: 'Ages 8–18 · All skill levels',

      /**
       * Price not yet set — leave as "" until the program launches.
       */
      price: '',

      status: 'coming_soon',
    },
  ],
};
