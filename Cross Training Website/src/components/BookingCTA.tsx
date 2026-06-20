/**
 * BookingCTA.tsx — Reusable CTA link component pointing to Instagram DM
 *
 * Always renders as an <a> element (not a <button>) so keyboard and
 * screen-reader users receive the correct "link" semantics.
 * The href is sourced from siteConfig.instagramUrl so updating the
 * Instagram handle in site.config.ts automatically propagates everywhere
 * this component is used.
 *
 * Requirements: 2.6, 4.4, 5.2
 */

import { siteConfig } from '../content/site.config';
import styles from './BookingCTA.module.css';

export interface BookingCTAProps {
  /** Text displayed inside the button. Defaults to "Book via Instagram DM". */
  label?: string;
  /** Visual variant. Defaults to 'primary'. */
  variant?: 'primary' | 'secondary';
}

export function BookingCTA({
  label = 'Book via Instagram DM',
  variant = 'primary',
}: BookingCTAProps) {
  const variantClass = variant === 'secondary' ? styles.secondary : styles.primary;

  return (
    <a
      href={siteConfig.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.cta} ${variantClass}`}
    >
      {label}
    </a>
  );
}

export default BookingCTA;
