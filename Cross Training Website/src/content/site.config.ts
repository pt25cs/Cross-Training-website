/**
 * site.config.ts — Brand-level site configuration
 *
 * Edit the values in `siteConfig` to update brand-wide settings.
 * Changes here automatically propagate to the Navigation, Footer,
 * BookingCTA, and Contact page — no component code needs to change.
 *
 * See CONTENT_GUIDE.md for step-by-step update instructions.
 */

export interface SiteConfig {
  /**
   * The business name displayed in the navigation header and footer.
   * Update this if the business rebrands.
   * Example: "Cross Training"
   */
  brandName: string;

  /**
   * Instagram handle WITHOUT the leading @ symbol.
   * This is used to construct `instagramUrl` and appears in copy
   * wherever the handle is referenced.
   * ⚠️  REPLACE "crosstrainingco" with the real handle before launch.
   * Example: "crosstrainingco"
   */
  instagramHandle: string;

  /**
   * Full Instagram profile URL.
   * Must stay in sync with `instagramHandle`.
   * Used as the `href` for every BookingCTA link on the site.
   * ⚠️  REPLACE with the real profile URL before launch.
   * Example: "https://instagram.com/crosstrainingco"
   */
  instagramUrl: string;

  /**
   * Business contact email address.
   * Set to a non-empty string to display a mailto: link on the Contact page
   * and in the Footer. Leave as "" (empty string) to hide it entirely —
   * nothing will render if this is empty.
   * Example: "coach@crosstraining.com"
   */
  contactEmail: string;

  /**
   * Footer copyright line.
   * Uses a dynamic year so it never needs manual updating.
   * Update the holder name ("Cross Training") if the business rebrands.
   * Example: "© 2024 Cross Training. All rights reserved."
   */
  copyrightText: string;
}

export const siteConfig: SiteConfig = {
  /** Business name shown in nav header and footer */
  brandName: 'Cross Training',

  /**
   * ⚠️  REPLACE before launch — use the real Instagram handle (no @).
   */
  instagramHandle: 'crosstrainingco',

  /**
   * ⚠️  REPLACE before launch — keep in sync with instagramHandle above.
   */
  instagramUrl: 'https://instagram.com/crosstrainingco',

  /**
   * ADD the real email address when available.
   * Leave as "" to hide the email link everywhere on the site.
   */
  contactEmail: '',

  /** Auto-updates year on each new build — no manual edits needed. */
  copyrightText: `© ${new Date().getFullYear()} Cross Training. All rights reserved.`,
};
