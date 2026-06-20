/**
 * Footer.test.tsx — Unit tests for Footer component
 *
 * Tests:
 * - Copyright text renders from siteConfig.copyrightText
 * - Instagram link renders with correct href and target="_blank"
 * - Email link renders when contactEmail is non-empty
 * - Email link is absent when contactEmail is ""
 *
 * Validates: Requirements 2.5, 5.2
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import * as siteConfigModule from '../content/site.config';

// ---------------------------------------------------------------------------
// Unit tests
// Validates: Requirements 2.5, 5.2
// ---------------------------------------------------------------------------

describe('Footer — unit tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the copyright text from siteConfig.copyrightText', () => {
    render(<Footer />);
    expect(
      screen.getByText(siteConfigModule.siteConfig.copyrightText),
    ).toBeInTheDocument();
  });

  it('renders the Instagram link with the correct href', () => {
    render(<Footer />);
    const instagramLink = screen.getByRole('link', {
      name: new RegExp(`@${siteConfigModule.siteConfig.instagramHandle}`, 'i'),
    });
    expect(instagramLink).toHaveAttribute(
      'href',
      siteConfigModule.siteConfig.instagramUrl,
    );
  });

  it('renders the Instagram link with target="_blank"', () => {
    render(<Footer />);
    const instagramLink = screen.getByRole('link', {
      name: new RegExp(`@${siteConfigModule.siteConfig.instagramHandle}`, 'i'),
    });
    expect(instagramLink).toHaveAttribute('target', '_blank');
  });

  it('renders the Instagram link with rel="noopener noreferrer"', () => {
    render(<Footer />);
    const instagramLink = screen.getByRole('link', {
      name: new RegExp(`@${siteConfigModule.siteConfig.instagramHandle}`, 'i'),
    });
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders email link when contactEmail is non-empty', () => {
    vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
      ...siteConfigModule.siteConfig,
      contactEmail: 'coach@crosstraining.com',
    });

    render(<Footer />);

    const emailLink = screen.getByRole('link', { name: 'coach@crosstraining.com' });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:coach@crosstraining.com');
  });

  it('does NOT render an email link when contactEmail is ""', () => {
    vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
      ...siteConfigModule.siteConfig,
      contactEmail: '',
    });

    render(<Footer />);

    // No mailto: links should exist
    const links = screen.getAllByRole('link');
    const emailLinks = links.filter((link) =>
      (link.getAttribute('href') ?? '').startsWith('mailto:'),
    );
    expect(emailLinks).toHaveLength(0);
  });

  it('renders @instagramHandle text in the Instagram link', () => {
    render(<Footer />);
    expect(
      screen.getByText(`@${siteConfigModule.siteConfig.instagramHandle}`),
    ).toBeInTheDocument();
  });

  it('renders the "Follow Us" social section label', () => {
    render(<Footer />);
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  it('renders with a custom copyright text when config is overridden', () => {
    const customCopyright = '© 2099 Acme Fitness. All rights reserved.';
    vi.spyOn(siteConfigModule, 'siteConfig', 'get').mockReturnValue({
      ...siteConfigModule.siteConfig,
      copyrightText: customCopyright,
    });

    render(<Footer />);
    expect(screen.getByText(customCopyright)).toBeInTheDocument();
  });
});
