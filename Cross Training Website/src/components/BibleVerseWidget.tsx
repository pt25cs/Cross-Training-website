/**
 * BibleVerseWidget.tsx — Daily Bible verse displayed as an iPhone lock-screen widget
 *
 * Consumes the `useDailyVerse` hook and renders in three states:
 *   - 'loading'  → skeleton shimmer placeholder (no layout shift)
 *   - 'loaded'   → live verse text + reference from bible-api.com
 *   - 'fallback' → hardcoded FALLBACK_VERSE text + reference
 *
 * The widget never renders empty or broken content.
 *
 * Requirements: 6.1, 6.5, 6.6, 6.7
 */

import { useDailyVerse } from '../hooks/useDailyVerse';
import styles from './BibleVerseWidget.module.css';

export function BibleVerseWidget() {
  const { verse, status } = useDailyVerse();

  return (
    <article className={styles.widget} aria-label="Verse of the Day">
      {/* Header label — always visible */}
      <div className={styles.header} aria-hidden="true">
        <span className={styles.icon}>📖</span>
        <span className={styles.label}>Verse of the Day</span>
      </div>

      {/* Content area — skeleton while loading, verse when ready */}
      {status === 'loading' ? (
        <div className={styles.skeleton} aria-label="Loading verse…" role="status">
          <div className={styles.skeletonLine} style={{ width: '92%' }} />
          <div className={styles.skeletonLine} style={{ width: '85%' }} />
          <div className={styles.skeletonLine} style={{ width: '70%' }} />
          <div className={`${styles.skeletonLine} ${styles.skeletonReference}`} style={{ width: '40%' }} />
        </div>
      ) : (
        <>
          <blockquote className={styles.verseText}>
            &ldquo;{verse.text}&rdquo;
          </blockquote>
          <p className={styles.reference}>{verse.reference}</p>
        </>
      )}
    </article>
  );
}

export default BibleVerseWidget;
