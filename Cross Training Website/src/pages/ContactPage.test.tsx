/**
 * ContactPage.test.tsx
 *
 * Covers:
 *   - Property 11: Contact Email Conditional Rendering (Task 13.3 — Requirement 5.3)
 *   - Unit tests for ContactPage (Task 13.4 — Requirements 5.2, 5.3)
 *   - Accessibility test for ContactPage (Task 13.5 — Requirement 7.7)
 *
 * // Feature: cross-training-website, Property 11: Contact Email Conditional Rendering
 * // Validates: Requirements 5.3
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContactPage } from './ContactPage';
import * as siteConfigModule from '../content/site.config';

// Teach vitest+jest-axe to understand toHaveNoViolations
expect.extend(toHaveNoViolations);

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function renderContactPage() {
  return render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Feature: cross-training-website, Property 11: Contact Email Conditional Rendering
// Validates: Requirements 5.3
// ---------------------------------------------------------------------------

describe('Property 11: Contact Email Conditional Rendering', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders a mailto anchor for any non-empty contactEmail', () => {
    /**
     * Validates: Requirements 5.3
     *
     * Strategy: generate arbitrary non-empty email-like strings, temporarily
     * override siteConfig.contactEmail with the generated value, render the
     * ContactPage, and assert that an <a> element with
     * href="mailto:{contactEmail}" is present in the rendered output.
     *
     * numRuns: 100
     */

    // Feature: cross-training-website, Property 11: Contact Email Conditional Rendering
    fc.assert(
      fc.property(
        // Generate non-empty strings that are valid enough to be used as email addresses
        fc
          .string({ minLength: 1, maxLength: 60 })
          .filter((s) => s.trim().length > 0)
          .map((s) => s.trim()),
        (email) => {
          vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
            brandName: 'Cross Training',
            instagramHandle: 'crosstrainingco',
            instagramUrl: 'https://instagram.com/crosstrainingco',
            contactEmail: email,
            copyrightText: '© 2024 Cross Training. All rights reserved.',
          });

          const { unmount } = renderContactPage();

          // Assert: a mailto anchor with the exact email must be in the DOM
          const mailtoLink = document.querySelector(
            `a[href="mailto:${CSS.escape(email)}"]`,
          );

          // Use getAllByRole as a fallback for links without CSS-escapable chars
          const allLinks = screen.getAllByRole('link');
          const hasMailtoLink = allLinks.some(
            (link) => link.getAttribute('href') === `mailto:${email}`,
          );

          expect(hasMailtoLink).toBe(true);

          unmount();
          // Silence unused variable lint warning
          void mailtoLink;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Task 13.4 — Unit tests for ContactPage
// Requirements: 5.2, 5.3
// ---------------------------------------------------------------------------

describe('ContactPage — unit tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does NOT render an email link when contactEmail is ""', () => {
    /**
     * Validates: Requirements 5.3
     * When contactEmail is empty, no mailto: link should be in the DOM.
     */
    vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
      brandName: 'Cross Training',
      instagramHandle: 'crosstrainingco',
      instagramUrl: 'https://instagram.com/crosstrainingco',
      contactEmail: '',
      copyrightText: '© 2024 Cross Training. All rights reserved.',
    });

    renderContactPage();

    const links = screen.queryAllByRole('link');
    const mailtoLinks = links.filter((link) =>
      link.getAttribute('href')?.startsWith('mailto:'),
    );

    expect(mailtoLinks).toHaveLength(0);
  });

  it('renders a mailto: link with correct href when contactEmail is non-empty', () => {
    /**
     * Validates: Requirements 5.3
     * When contactEmail is set, an anchor with href="mailto:{email}" must appear.
     */
    const testEmail = 'coach@crosstraining.com';

    vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
      brandName: 'Cross Training',
      instagramHandle: 'crosstrainingco',
      instagramUrl: 'https://instagram.com/crosstrainingco',
      contactEmail: testEmail,
      copyrightText: '© 2024 Cross Training. All rights reserved.',
    });

    renderContactPage();

    const mailtoLink = screen.getByRole('link', { name: testEmail });
    expect(mailtoLink).toBeInTheDocument();
    expect(mailtoLink).toHaveAttribute('href', `mailto:${testEmail}`);
  });

  it('renders the Instagram CTA button', () => {
    /**
     * Validates: Requirements 5.2
     * The BookingCTA (Instagram link) must always be present on the Contact page.
     */
    renderContactPage();

    // The Instagram CTA renders as a link — find by the label from contactContent
    const links = screen.getAllByRole('link');
    const instagramLink = links.find((link) =>
      link.getAttribute('href')?.includes('instagram.com'),
    );

    expect(instagramLink).toBeDefined();
    expect(instagramLink).toBeInTheDocument();
  });

  it('renders the page heading', () => {
    /**
     * Validates: Requirements 5.1
     * The page must contain an h1 heading.
     */
    renderContactPage();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Task 13.5 — Accessibility test for ContactPage
// Requirement: 7.7
// ---------------------------------------------------------------------------

describe('Accessibility: ContactPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('has no axe accessibility violations (email hidden)', async () => {
    vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
      brandName: 'Cross Training',
      instagramHandle: 'crosstrainingco',
      instagramUrl: 'https://instagram.com/crosstrainingco',
      contactEmail: '',
      copyrightText: '© 2024 Cross Training. All rights reserved.',
    });

    const { container } = renderContactPage();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe accessibility violations (email shown)', async () => {
    vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
      brandName: 'Cross Training',
      instagramHandle: 'crosstrainingco',
      instagramUrl: 'https://instagram.com/crosstrainingco',
      contactEmail: 'coach@crosstraining.com',
      copyrightText: '© 2024 Cross Training. All rights reserved.',
    });

    const { container } = renderContactPage();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
