/**
 * ContactPage.tsx — Full Contact page implementation
 *
 * Sections:
 *   1. Page Header   — "Contact Us" heading
 *   2. Contact Card  — instruction text, Instagram CTA, optional email, booking note
 *
 * All copy is sourced from `contactContent` and `siteConfig` — no hard-coded strings.
 *
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 */

import { contactContent } from '../content/contact.content';
import { siteConfig } from '../content/site.config';
import { BookingCTA } from '../components/BookingCTA';
import styles from './ContactPage.module.css';

export function ContactPage() {
  return (
    <main className={styles.page}>
      {/* ── 1. Page Header ──────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageHeaderTitle}>{contactContent.pageTitle}</h1>
      </header>

      {/* ── 2. Contact Card Section ─────────────────────────────────── */}
      <section className={styles.section} aria-label="Contact information">
        <div className={styles.card}>
          {/* Primary instruction */}
          <p className={styles.instruction}>{contactContent.primaryInstruction}</p>

          {/* Instagram CTA */}
          <div className={styles.ctaWrapper}>
            <BookingCTA label={contactContent.instagramCtaLabel} variant="primary" />
          </div>

          {/* Conditional email link — only rendered when email is configured */}
          {siteConfig.contactEmail !== '' && (
            <div className={styles.emailSection}>
              <span className={styles.emailLabel}>Or email us:</span>{' '}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className={styles.emailLink}
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          )}

          {/* Booking note */}
          <p className={styles.bookingNote}>{contactContent.bookingNote}</p>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
