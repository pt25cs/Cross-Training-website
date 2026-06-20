/**
 * ServiceCard.tsx — Individual service display card
 *
 * Renders a service's name, description, targetSkillLevel, and price.
 * When status is 'coming_soon':
 *   - Shows a "Coming Soon" badge
 *   - Does NOT render BookingCTA (service is not bookable)
 * When status is 'active':
 *   - Renders BookingCTA so visitors can book the service
 *
 * Requirements: 4.1, 4.3
 */

import type { ServiceItem } from '../content/services.content';
import { BookingCTA } from './BookingCTA';
import styles from './ServiceCard.module.css';

export interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const isComingSoon = service.status === 'coming_soon';

  return (
    <article
      className={`${styles.card} ${isComingSoon ? styles.comingSoon : ''}`}
      aria-label={service.name}
    >
      {/* Header: name + optional "Coming Soon" badge */}
      <header className={styles.header}>
        <h3 className={styles.name}>{service.name}</h3>
        {isComingSoon && (
          <span className={styles.badge} aria-label="Coming Soon">
            Coming Soon
          </span>
        )}
      </header>

      {/* Description */}
      <p className={styles.description}>{service.description}</p>

      {/* Skill level */}
      <p className={styles.skillLevel}>{service.targetSkillLevel}</p>

      {/* Price — hidden when empty string */}
      {service.price !== '' && (
        <p className={styles.price}>{service.price}</p>
      )}

      {/* BookingCTA — only shown for active services */}
      {!isComingSoon && (
        <div className={styles.cta}>
          <BookingCTA />
        </div>
      )}
    </article>
  );
}

export default ServiceCard;
