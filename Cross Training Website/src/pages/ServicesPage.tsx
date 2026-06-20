/**
 * ServicesPage.tsx — Full Services page implementation
 *
 * Sections:
 *   1. Page Header — pageTitle (h1) + pageSubtitle
 *   2. Services Grid — one ServiceCard per service in servicesContent.services
 *
 * All copy is sourced from `servicesContent` — no hard-coded strings.
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.6
 */

import { servicesContent } from '../content/services.content';
import { ServiceCard } from '../components/ServiceCard';
import styles from './ServicesPage.module.css';

export function ServicesPage() {
  return (
    <main className={styles.page}>
      {/* ── 1. Page Header ─────────────────────────────────────────────── */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageHeaderTitle}>{servicesContent.pageTitle}</h1>
        <p className={styles.pageHeaderSubtitle}>{servicesContent.pageSubtitle}</p>
      </header>

      {/* ── 2. Services Grid ───────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="services-grid-title">
        <h2 id="services-grid-title" className={styles.sectionTitle}>
          Our Programs
        </h2>
        <div className={styles.grid}>
          {servicesContent.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
