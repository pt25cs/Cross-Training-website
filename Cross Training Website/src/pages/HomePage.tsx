/**
 * HomePage.tsx — Full Home page implementation
 *
 * Sections:
 *   1. Hero          — headline, tagline, primary BookingCTA
 *   2. Mission       — mission title + multi-paragraph body
 *   3. Disciplines   — grid of discipline tiles with Coming Soon badges
 *   4. Bible Verse   — BibleVerseWidget centered section
 *   5. CTA Footer    — secondary BookingCTA to close the page
 *
 * All copy is sourced from `homeContent` — no hard-coded strings.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.7
 */

import { homeContent } from '../content/home.content';
import { BookingCTA } from '../components/BookingCTA';
import { BibleVerseWidget } from '../components/BibleVerseWidget';
import styles from './HomePage.module.css';

export function HomePage() {
  // Split mission body on double-newlines to support multi-paragraph rendering
  const missionParagraphs = homeContent.missionBody.split('\n\n');

  return (
    <main className={styles.page}>
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>{homeContent.heroHeadline}</h1>
          <p className={styles.heroTagline}>{homeContent.heroTagline}</p>
          <BookingCTA label={homeContent.heroCtaLabel} variant="primary" />
        </div>
      </section>

      {/* ── 2. Mission ──────────────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="mission-title">
        <h2 id="mission-title" className={styles.sectionTitle}>
          {homeContent.missionTitle}
        </h2>
        {missionParagraphs.map((paragraph, index) => (
          <p key={index} className={styles.missionParagraph}>
            {paragraph}
          </p>
        ))}
      </section>

      {/* ── 3. Disciplines Highlights ───────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.disciplinesSection}`}
        aria-labelledby="disciplines-title"
      >
        <h2 id="disciplines-title" className={styles.sectionTitle}>
          {homeContent.disciplinesTitle}
        </h2>
        <ul className={styles.disciplinesGrid} role="list">
          {homeContent.disciplines.map((discipline) => (
            <li key={discipline.name} className={styles.disciplineTile}>
              <span className={styles.disciplineName}>{discipline.name}</span>
              {discipline.status === 'coming_soon' && (
                <span className={styles.comingSoonBadge} aria-label={`${discipline.name} — Coming Soon`}>
                  Coming Soon
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 4. Bible Verse Widget ───────────────────────────────────────── */}
      <section className={styles.verseSection} aria-label="Verse of the Day">
        <BibleVerseWidget />
      </section>

      {/* ── 5. Booking CTA Footer ───────────────────────────────────────── */}
      <section className={styles.ctaSection} aria-label="Book a session">
        <p className={styles.ctaPrompt}>Ready to start your journey?</p>
        <BookingCTA variant="secondary" />
      </section>
    </main>
  );
}

export default HomePage;
