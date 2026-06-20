/**
 * AboutPage.tsx — Full About page implementation
 *
 * Sections:
 *   1. Page Header   — brand name + "About Us" heading
 *   2. Faith         — faithTitle (h2) + faithBody (multi-paragraph)
 *   3. Trainers      — trainersTitle (h2) + one card per trainer
 *   4. Audience      — audienceTitle (h2) + audienceBody (multi-paragraph)
 *   5. Booking CTA   — BookingCTA at the bottom
 *
 * All copy is sourced from `aboutContent` — no hard-coded strings.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import { aboutContent } from '../content/about.content';
import { siteConfig } from '../content/site.config';
import { BookingCTA } from '../components/BookingCTA';
import styles from './AboutPage.module.css';

/** SVG placeholder used as the fallback src when a trainer photo fails to load */
const PHOTO_FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23111318'/%3E%3C/svg%3E";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.src = PHOTO_FALLBACK_SRC;
}

export function AboutPage() {
  const faithParagraphs = aboutContent.faithBody.split('\n\n');
  const audienceParagraphs = aboutContent.audienceBody.split('\n\n');

  return (
    <main className={styles.page}>
      {/* ── 1. Page Header ─────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <p className={styles.pageHeaderBrand}>{siteConfig.brandName}</p>
        <h1 className={styles.pageHeaderTitle}>About Us</h1>
      </header>

      {/* ── 2. Faith Section ───────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="faith-title">
        <h2 id="faith-title" className={styles.sectionTitle}>
          {aboutContent.faithTitle}
        </h2>
        <div className={styles.faithBody}>
          {faithParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* ── 3. Trainers Section ────────────────────────────────────────── */}
      <section
        className={`${styles.section} ${styles.trainersSection}`}
        aria-labelledby="trainers-title"
      >
        <h2 id="trainers-title" className={styles.sectionTitle}>
          {aboutContent.trainersTitle}
        </h2>
        <div className={styles.trainersGrid}>
          {aboutContent.trainers.map((trainer) => {
            const bioParagraphs = trainer.bio.split('\n\n');
            return (
              <article key={trainer.name} className={styles.trainerCard}>
                {/* Photo or placeholder */}
                {trainer.photoUrl ? (
                  <img
                    src={trainer.photoUrl}
                    alt={trainer.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className={styles.trainerPhoto}
                    onError={handleImgError}
                  />
                ) : (
                  <div
                    className={`${styles.trainerPhoto} ${styles.trainerPhotoPlaceholder}`}
                    aria-hidden="true"
                  />
                )}

                {/* Trainer info */}
                <div className={styles.trainerInfo}>
                  <h3 className={styles.trainerName}>{trainer.name}</h3>

                  <div className={styles.trainerBio}>
                    {bioParagraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {trainer.qualifications.length > 0 && (
                    <ul className={styles.qualificationsList}>
                      {trainer.qualifications.map((qual) => (
                        <li key={qual}>{qual}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── 4. Audience Section ────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="audience-title">
        <h2 id="audience-title" className={styles.sectionTitle}>
          {aboutContent.audienceTitle}
        </h2>
        <div className={styles.audienceBody}>
          {audienceParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* ── 5. Booking CTA ─────────────────────────────────────────────── */}
      <section className={styles.ctaSection} aria-label="Book a session">
        <BookingCTA label={aboutContent.ctaLabel} />
      </section>
    </main>
  );
}

export default AboutPage;
