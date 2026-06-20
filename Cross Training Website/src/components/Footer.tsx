/**
 * Footer.tsx — Site footer with copyright, social link, and optional email
 *
 * Copyright text and social links are sourced from siteConfig so they
 * automatically stay in sync with brand-level config changes.
 * The email link is only rendered when siteConfig.contactEmail is non-empty.
 *
 * Requirements: 2.5
 */

import { siteConfig } from '../content/site.config';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand / copyright column */}
          <div className={styles.brandColumn}>
            <p className={styles.copyright}>{siteConfig.copyrightText}</p>
          </div>

          {/* Social media column */}
          <div className={styles.socialColumn}>
            <p className={styles.socialLabel}>Follow Us</p>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={`Follow us on Instagram: @${siteConfig.instagramHandle}`}
            >
              @{siteConfig.instagramHandle}
            </a>
          </div>

          {/* Contact email column — conditionally rendered */}
          {siteConfig.contactEmail !== '' && (
            <div className={styles.contactColumn}>
              <p className={styles.socialLabel}>Contact</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className={styles.socialLink}
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
