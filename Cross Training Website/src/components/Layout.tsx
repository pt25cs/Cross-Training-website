/**
 * Layout.tsx — Shared layout wrapper for all pages
 *
 * Renders the Navigation, a skip-nav link for accessibility, the page
 * content via React Router's <Outlet>, and the Footer. The .sr-only class
 * used on the skip-nav link is defined in src/index.css.
 *
 * Requirements: 1.1
 */

import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function Layout() {
  return (
    <>
      {/* Skip navigation link for accessibility */}
      <a href="#main-content" className="sr-only">Skip to main content</a>
      <Navigation />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
