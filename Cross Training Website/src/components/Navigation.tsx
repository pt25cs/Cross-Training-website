/**
 * Navigation.tsx — Site header with logo, nav links, and mobile hamburger
 *
 * Uses React Router's <NavLink> for active-link highlighting.
 * Mobile menu is toggled via isMobileMenuOpen state.
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { siteConfig } from '../content/site.config';
import styles from './Navigation.module.css';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact Us', to: '/contact' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.container}>
        {/* Brand wordmark */}
        <NavLink to="/" className={styles.brand} onClick={closeMobileMenu}>
          {siteConfig.brandName}
        </NavLink>

        {/* Hamburger button — visible on mobile, hidden at 768px+ */}
        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
          aria-controls="nav-links"
        >
          <span aria-hidden="true">&#9776;</span>
        </button>

        {/* Nav link list */}
        <ul
          id="nav-links"
          className={
            isMobileMenuOpen
              ? `${styles.navLinks} ${styles.navLinksOpen}`
              : styles.navLinks
          }
        >
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                }
                onClick={closeMobileMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
