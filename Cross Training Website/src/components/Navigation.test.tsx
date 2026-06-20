/**
 * Navigation.test.tsx — Property test (Property 1) + unit tests for Navigation
 *
 * Property 1: Responsive Navigation Breakpoint
 * Validates: Requirements 1.3, 7.3, 7.4
 *
 * Unit tests validate:
 * - All 4 link labels render
 * - Hamburger click toggles mobile menu open state
 * - Brand name renders
 * Validates: Requirements 1.1, 1.4, 1.5
 */

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import { Navigation } from './Navigation';

// ---------------------------------------------------------------------------
// Helper: render Navigation inside MemoryRouter
// ---------------------------------------------------------------------------
function renderNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navigation />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Feature: cross-training-website, Property 1: Responsive Navigation Breakpoint
// Validates: Requirements 1.3, 7.3, 7.4
//
// Note: jsdom does not apply CSS media queries, so we cannot test CSS
// visibility. Instead we test the DOM structure and ARIA attributes that
// control the responsive behavior:
//   - The hamburger button is always present in the DOM (mobile structure)
//   - When closed, the nav-links element does NOT have the open CSS class
//   - When open (after clicking hamburger), the nav-links element DOES have
//     the open CSS class
//   - aria-expanded reflects the open/closed state correctly
// ---------------------------------------------------------------------------

describe('Property 1: Responsive Navigation Breakpoint', () => {
  it('hamburger is in the DOM for any mobile viewport width (< 768)', () => {
    // Feature: cross-training-website, Property 1: Responsive Navigation Breakpoint
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 767 }),
        (_width) => {
          const { container, unmount } = renderNav();
          const scope = within(container);

          // Hamburger button must always be in the DOM (CSS hides it at ≥768px,
          // but the DOM element must exist for the component's toggling logic)
          const hamburger = scope.getByRole('button', { name: /toggle navigation menu/i });
          expect(hamburger).toBeInTheDocument();

          // Before toggling: aria-expanded should be false
          expect(hamburger).toHaveAttribute('aria-expanded', 'false');

          // nav-links container should not carry the open class
          const navList = container.querySelector('#nav-links');
          expect(navList?.className).not.toMatch(/navLinksOpen/);

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('nav links container gains the open class for any mobile width after clicking hamburger', async () => {
    // Feature: cross-training-website, Property 1: Responsive Navigation Breakpoint
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 320, max: 767 }),
        async (_width) => {
          const user = userEvent.setup();
          const { container, unmount } = renderNav();
          const scope = within(container);

          const hamburger = scope.getByRole('button', { name: /toggle navigation menu/i });
          await user.click(hamburger);

          // After click: aria-expanded should be true
          expect(hamburger).toHaveAttribute('aria-expanded', 'true');

          // nav-links container should now carry the open class
          const navList = container.querySelector('#nav-links');
          expect(navList?.className).toMatch(/navLinksOpen/);

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  }, 30000);

  it('nav links container loses the open class after toggling twice', async () => {
    // Feature: cross-training-website, Property 1: Responsive Navigation Breakpoint
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 768, max: 1920 }),
        async (_width) => {
          const user = userEvent.setup();
          const { container, unmount } = renderNav();
          const scope = within(container);

          const hamburger = scope.getByRole('button', { name: /toggle navigation menu/i });

          // Open
          await user.click(hamburger);
          expect(hamburger).toHaveAttribute('aria-expanded', 'true');

          // Close
          await user.click(hamburger);
          expect(hamburger).toHaveAttribute('aria-expanded', 'false');
          const navList = container.querySelector('#nav-links');
          expect(navList?.className).not.toMatch(/navLinksOpen/);

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  }, 30000);
});

// ---------------------------------------------------------------------------
// Unit tests
// Validates: Requirements 1.1, 1.4, 1.5
// ---------------------------------------------------------------------------

describe('Navigation — unit tests', () => {
  it('renders all 4 nav link labels', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact Us' })).toBeInTheDocument();
  });

  it('renders the brand name', () => {
    renderNav();
    expect(screen.getByText('Cross Training')).toBeInTheDocument();
  });

  it('hamburger button click opens the mobile menu', async () => {
    const user = userEvent.setup();
    renderNav();

    const hamburger = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('hamburger button click again closes the mobile menu', async () => {
    const user = userEvent.setup();
    renderNav();

    const hamburger = screen.getByRole('button', { name: /toggle navigation menu/i });

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking a nav link closes the mobile menu', async () => {
    const user = userEvent.setup();
    renderNav();

    const hamburger = screen.getByRole('button', { name: /toggle navigation menu/i });
    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    await user.click(aboutLink);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('nav has aria-label="Main navigation"', () => {
    renderNav();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('Home link has href="/"', () => {
    renderNav();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('About Us link has href="/about"', () => {
    renderNav();
    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('Services link has href="/services"', () => {
    renderNav();
    const servicesLink = screen.getByRole('link', { name: 'Services' });
    expect(servicesLink).toHaveAttribute('href', '/services');
  });

  it('Contact Us link has href="/contact"', () => {
    renderNav();
    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('applies activeLink class to the current route link', () => {
    renderNav('/about');
    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    expect(aboutLink.className).toMatch(/activeLink/);
  });
});
