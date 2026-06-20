/**
 * BookingCTA.test.tsx — Unit tests and Property 10 for BookingCTA
 *
 * Property 10: Booking CTA Instagram URL
 * For any Instagram handle set in siteConfig, every rendered BookingCTA
 * href shall contain that handle and target="_blank".
 *
 * Validates: Requirements 2.6, 4.4, 5.2
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { BookingCTA } from './BookingCTA';
import * as siteConfigModule from '../content/site.config';

// ---------------------------------------------------------------------------
// Unit tests — concrete examples
// ---------------------------------------------------------------------------

describe('BookingCTA — unit tests', () => {
  it('renders default label "Book via Instagram DM"', () => {
    render(<BookingCTA />);
    expect(screen.getByText('Book via Instagram DM')).toBeInTheDocument();
  });

  it('renders a custom label when provided', () => {
    render(<BookingCTA label="Get Started Today" />);
    expect(screen.getByText('Get Started Today')).toBeInTheDocument();
  });

  it('renders an <a> element (not a button)', () => {
    render(<BookingCTA />);
    const link = screen.getByRole('link');
    expect(link.tagName).toBe('A');
  });

  it('has target="_blank"', () => {
    render(<BookingCTA />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('has rel="noopener noreferrer"', () => {
    render(<BookingCTA />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('href contains the instagramHandle from siteConfig', () => {
    render(<BookingCTA />);
    const link = screen.getByRole('link');
    const href = link.getAttribute('href') ?? '';
    expect(href).toContain(siteConfigModule.siteConfig.instagramHandle);
  });

  it('href equals siteConfig.instagramUrl', () => {
    render(<BookingCTA />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', siteConfigModule.siteConfig.instagramUrl);
  });

  it('applies a CSS class for the primary variant by default', () => {
    const { container } = render(<BookingCTA />);
    const link = container.querySelector('a');
    // Class name contains "primary" (CSS modules transform to hashed names in production,
    // but in Vite/jsdom test environment the class names are readable)
    expect(link?.className).toMatch(/primary/i);
  });

  it('applies a CSS class for the secondary variant when specified', () => {
    const { container } = render(<BookingCTA variant="secondary" />);
    const link = container.querySelector('a');
    expect(link?.className).toMatch(/secondary/i);
  });
});

// ---------------------------------------------------------------------------
// Feature: cross-training-website, Property 10: Booking CTA Instagram URL
// Validates: Requirements 2.6, 4.4, 5.2
// ---------------------------------------------------------------------------

describe('Property 10: Booking CTA Instagram URL', () => {
  // We spy on siteConfig so we can inject arbitrary handles/URLs per iteration.
  // We restore the original after each test.
  let configSpy: ReturnType<typeof vi.spyOn> | undefined;

  afterEach(() => {
    configSpy?.mockRestore();
    vi.restoreAllMocks();
  });

  it('href contains the Instagram handle and target is _blank for any handle/URL combo', () => {
    // Feature: cross-training-website, Property 10: Booking CTA Instagram URL
    fc.assert(
      fc.property(
        // Generate arbitrary Instagram handles (lowercase alphanumeric + underscore, 1–30 chars)
        fc.stringMatching(/^[a-z0-9_]{1,30}$/),
        fc.constantFrom<'primary' | 'secondary'>('primary', 'secondary'),
        fc.option(fc.string({ minLength: 1, maxLength: 80 }), { nil: undefined }),
        (handle, variant, label) => {
          const instagramUrl = `https://instagram.com/${handle}`;

          // Override siteConfig for this iteration
          vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
            brandName: 'Cross Training',
            instagramHandle: handle,
            instagramUrl,
            contactEmail: '',
            copyrightText: '© 2024 Cross Training. All rights reserved.',
          });

          const { unmount } = render(
            <BookingCTA variant={variant} label={label ?? 'Book via Instagram DM'} />,
          );

          const link = screen.getByRole('link');

          // Property assertion 1: href contains the handle
          const href = link.getAttribute('href') ?? '';
          expect(href).toContain(handle);

          // Property assertion 2: target is _blank
          expect(link).toHaveAttribute('target', '_blank');

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('href contains the handle for the default siteConfig values', () => {
    render(<BookingCTA />);
    const link = screen.getByRole('link');
    const href = link.getAttribute('href') ?? '';
    expect(href).toContain(siteConfigModule.siteConfig.instagramHandle);
    expect(link).toHaveAttribute('target', '_blank');
  });
});
