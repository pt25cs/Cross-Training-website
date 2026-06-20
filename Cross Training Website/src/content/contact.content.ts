/**
 * contact.content.ts — Contact page content configuration
 *
 * Edit the values in `contactContent` to update the Contact page copy,
 * instructions, and booking notes.
 * No component code needs to change — the page reads directly from this file.
 *
 * NOTE: The Instagram handle and email address are configured in site.config.ts,
 * not here. Changes to those values automatically update the links on this page.
 *
 * See CONTENT_GUIDE.md for step-by-step update instructions.
 */

/**
 * All content displayed on the Contact (/contact) page.
 */
export interface ContactContent {
  /**
   * Main heading at the top of the Contact page.
   * Example: "Get in Touch"
   */
  pageTitle: string;

  /**
   * Primary instruction telling visitors how to reach out and book a session.
   * This should direct them to send a DM on Instagram since that is the
   * main booking channel while formal booking software is not yet live.
   * Example: "The best way to book a session or ask questions is to send us a DM on Instagram."
   */
  primaryInstruction: string;

  /**
   * Label for the Instagram call-to-action button.
   * This button links directly to the Instagram profile (configured in site.config.ts).
   * Example: "Message Us on Instagram"
   */
  instagramCtaLabel: string;

  /**
   * Short note letting visitors know that an integrated booking system is coming.
   * Mention the platforms (Wix Bookings, Booksy) so visitors know what to expect.
   * Example: "Online booking via Wix Bookings and Booksy is coming soon — stay tuned!"
   */
  bookingNote: string;
}

export const contactContent: ContactContent = {
  /** Contact page main heading */
  pageTitle: 'Get in Touch',

  /**
   * ⚠️  PLACEHOLDER — update with final approved copy before launch.
   * Direct visitors to the Instagram DM as the primary booking channel.
   */
  primaryInstruction:
    'Ready to start training? The easiest way to book a session or ask a question ' +
    'is to send us a direct message on Instagram. We typically respond within 24 hours.',

  /** Instagram DM call-to-action button label */
  instagramCtaLabel: 'Message Us on Instagram',

  /**
   * Note about upcoming integrated booking — reassures visitors that a
   * smoother booking experience is on the way.
   * Update or remove this once Wix Bookings / Booksy is live.
   */
  bookingNote:
    'Integrated online booking via Wix Bookings and Booksy is coming soon. ' +
    'Until then, Instagram DM is the fastest way to lock in your spot.',
};
