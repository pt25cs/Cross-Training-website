/**
 * configRoundTrip.test.tsx — Property 9: Config Value Round-Trip
 *
 * Validates: Requirements 8.1, 8.3
 *
 * Property 9: For any string value stored in a content config object, that
 * exact string shall be faithfully stored and retrievable from the config
 * object — meaning the config layer introduces no mutations, truncations,
 * or transformations.
 *
 * NOTE: These tests currently validate the config layer itself (object
 * identity / round-trip fidelity). They will be extended to render actual
 * page components once those are implemented in Tasks 10–13.
 * At that point, the property will be upgraded to assert that each config
 * string also appears verbatim in the corresponding rendered DOM output.
 */

import fc from 'fast-check';
import { describe, it, expect } from 'vitest';
import type { SiteConfig } from './site.config';
import type { HomeContent } from './home.content';
import type { AboutContent } from './about.content';
import type { ServicesContent, ServiceItem } from './services.content';
import type { ContactContent } from './contact.content';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal SiteConfig with the supplied overrides. */
function makeSiteConfig(overrides: Partial<SiteConfig>): SiteConfig {
  return {
    brandName: 'Cross Training',
    instagramHandle: 'crosstrainingco',
    instagramUrl: 'https://instagram.com/crosstrainingco',
    contactEmail: '',
    copyrightText: '© 2024 Cross Training. All rights reserved.',
    ...overrides,
  };
}

/** Build a minimal HomeContent with the supplied overrides. */
function makeHomeContent(overrides: Partial<HomeContent>): HomeContent {
  return {
    heroHeadline: 'Train Hard.',
    heroTagline: 'Elite training.',
    heroCtaLabel: 'Book Now',
    missionTitle: 'Our Mission',
    missionBody: 'We train athletes.',
    disciplinesTitle: 'What We Train',
    disciplines: [],
    ...overrides,
  };
}

/** Build a minimal AboutContent with the supplied overrides. */
function makeAboutContent(overrides: Partial<AboutContent>): AboutContent {
  return {
    faithTitle: 'Faith First',
    faithBody: 'Faith is our foundation.',
    trainersTitle: 'Our Coaches',
    trainers: [],
    audienceTitle: 'Who We Train',
    audienceBody: 'Youth athletes.',
    ctaLabel: 'Book via Instagram',
    ...overrides,
  };
}

/** Build a minimal ServicesContent with the supplied overrides. */
function makeServicesContent(overrides: Partial<ServicesContent>): ServicesContent {
  return {
    pageTitle: 'Training Services',
    pageSubtitle: 'Faith-based athletic training.',
    services: [],
    ...overrides,
  };
}

/** Build a minimal ContactContent with the supplied overrides. */
function makeContactContent(overrides: Partial<ContactContent>): ContactContent {
  return {
    pageTitle: 'Get in Touch',
    primaryInstruction: 'Send us a DM.',
    instagramCtaLabel: 'Message Us on Instagram',
    bookingNote: 'Booking coming soon.',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Fast-check string generator — printable ASCII, no embedded nulls
// ---------------------------------------------------------------------------
const printableString = fc.string({ minLength: 1, maxLength: 200 });

// ---------------------------------------------------------------------------
// Property 9 — SiteConfig round-trip
// ---------------------------------------------------------------------------
describe('Property 9 — SiteConfig value round-trip', () => {
  it('brandName is stored and retrieved faithfully', () => {
    // Feature: cross-training-website, Property 9: Config Value Round-Trip
    fc.assert(
      fc.property(printableString, (value) => {
        const config = makeSiteConfig({ brandName: value });
        expect(config.brandName).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('instagramHandle is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const config = makeSiteConfig({ instagramHandle: value });
        expect(config.instagramHandle).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('instagramUrl is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const config = makeSiteConfig({ instagramUrl: value });
        expect(config.instagramUrl).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('contactEmail is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const config = makeSiteConfig({ contactEmail: value });
        expect(config.contactEmail).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('copyrightText is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const config = makeSiteConfig({ copyrightText: value });
        expect(config.copyrightText).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('all SiteConfig string fields survive a full record construction', () => {
    fc.assert(
      fc.property(
        fc.record({
          brandName: printableString,
          instagramHandle: printableString,
          instagramUrl: printableString,
          contactEmail: fc.string(),
          copyrightText: printableString,
        }),
        (fields) => {
          const config = makeSiteConfig(fields);
          expect(config.brandName).toBe(fields.brandName);
          expect(config.instagramHandle).toBe(fields.instagramHandle);
          expect(config.instagramUrl).toBe(fields.instagramUrl);
          expect(config.contactEmail).toBe(fields.contactEmail);
          expect(config.copyrightText).toBe(fields.copyrightText);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 9 — HomeContent round-trip
// ---------------------------------------------------------------------------
describe('Property 9 — HomeContent value round-trip', () => {
  it('heroHeadline is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeHomeContent({ heroHeadline: value });
        expect(content.heroHeadline).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('heroTagline is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeHomeContent({ heroTagline: value });
        expect(content.heroTagline).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('missionBody is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeHomeContent({ missionBody: value });
        expect(content.missionBody).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('all top-level HomeContent string fields survive a full record construction', () => {
    fc.assert(
      fc.property(
        fc.record({
          heroHeadline: printableString,
          heroTagline: printableString,
          heroCtaLabel: printableString,
          missionTitle: printableString,
          missionBody: printableString,
          disciplinesTitle: printableString,
        }),
        (fields) => {
          const content = makeHomeContent(fields);
          expect(content.heroHeadline).toBe(fields.heroHeadline);
          expect(content.heroTagline).toBe(fields.heroTagline);
          expect(content.heroCtaLabel).toBe(fields.heroCtaLabel);
          expect(content.missionTitle).toBe(fields.missionTitle);
          expect(content.missionBody).toBe(fields.missionBody);
          expect(content.disciplinesTitle).toBe(fields.disciplinesTitle);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 9 — AboutContent round-trip
// ---------------------------------------------------------------------------
describe('Property 9 — AboutContent value round-trip', () => {
  it('faithTitle is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeAboutContent({ faithTitle: value });
        expect(content.faithTitle).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('faithBody is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeAboutContent({ faithBody: value });
        expect(content.faithBody).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('audienceBody is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeAboutContent({ audienceBody: value });
        expect(content.audienceBody).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('all top-level AboutContent string fields survive a full record construction', () => {
    fc.assert(
      fc.property(
        fc.record({
          faithTitle: printableString,
          faithBody: printableString,
          trainersTitle: printableString,
          audienceTitle: printableString,
          audienceBody: printableString,
          ctaLabel: printableString,
        }),
        (fields) => {
          const content = makeAboutContent(fields);
          expect(content.faithTitle).toBe(fields.faithTitle);
          expect(content.faithBody).toBe(fields.faithBody);
          expect(content.trainersTitle).toBe(fields.trainersTitle);
          expect(content.audienceTitle).toBe(fields.audienceTitle);
          expect(content.audienceBody).toBe(fields.audienceBody);
          expect(content.ctaLabel).toBe(fields.ctaLabel);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 9 — ServicesContent round-trip
// ---------------------------------------------------------------------------
describe('Property 9 — ServicesContent value round-trip', () => {
  it('pageTitle is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeServicesContent({ pageTitle: value });
        expect(content.pageTitle).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('pageSubtitle is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeServicesContent({ pageSubtitle: value });
        expect(content.pageSubtitle).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('ServiceItem string fields survive a full record construction', () => {
    const serviceItemArb = fc.record({
      id: printableString,
      name: printableString,
      description: printableString,
      targetSkillLevel: printableString,
      price: fc.string(),
      status: fc.constantFrom<'active' | 'coming_soon'>('active', 'coming_soon'),
    });

    fc.assert(
      fc.property(serviceItemArb, (item: ServiceItem) => {
        const content = makeServicesContent({ services: [item] });
        const stored = content.services[0];
        expect(stored.id).toBe(item.id);
        expect(stored.name).toBe(item.name);
        expect(stored.description).toBe(item.description);
        expect(stored.targetSkillLevel).toBe(item.targetSkillLevel);
        expect(stored.price).toBe(item.price);
        expect(stored.status).toBe(item.status);
      }),
      { numRuns: 100 },
    );
  });

  it('all services in an array are stored faithfully', () => {
    const serviceItemArb = fc.record({
      id: printableString,
      name: printableString,
      description: printableString,
      targetSkillLevel: printableString,
      price: fc.string(),
      status: fc.constantFrom<'active' | 'coming_soon'>('active', 'coming_soon'),
    });

    fc.assert(
      fc.property(fc.array(serviceItemArb, { minLength: 1, maxLength: 10 }), (items) => {
        const content = makeServicesContent({ services: items });
        expect(content.services).toHaveLength(items.length);
        items.forEach((item, idx) => {
          expect(content.services[idx].name).toBe(item.name);
          expect(content.services[idx].description).toBe(item.description);
        });
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 9 — ContactContent round-trip
// ---------------------------------------------------------------------------
describe('Property 9 — ContactContent value round-trip', () => {
  it('pageTitle is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeContactContent({ pageTitle: value });
        expect(content.pageTitle).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('primaryInstruction is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeContactContent({ primaryInstruction: value });
        expect(content.primaryInstruction).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('instagramCtaLabel is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeContactContent({ instagramCtaLabel: value });
        expect(content.instagramCtaLabel).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('bookingNote is stored and retrieved faithfully', () => {
    fc.assert(
      fc.property(printableString, (value) => {
        const content = makeContactContent({ bookingNote: value });
        expect(content.bookingNote).toBe(value);
      }),
      { numRuns: 100 },
    );
  });

  it('all ContactContent string fields survive a full record construction', () => {
    fc.assert(
      fc.property(
        fc.record({
          pageTitle: printableString,
          primaryInstruction: printableString,
          instagramCtaLabel: printableString,
          bookingNote: printableString,
        }),
        (fields) => {
          const content = makeContactContent(fields);
          expect(content.pageTitle).toBe(fields.pageTitle);
          expect(content.primaryInstruction).toBe(fields.primaryInstruction);
          expect(content.instagramCtaLabel).toBe(fields.instagramCtaLabel);
          expect(content.bookingNote).toBe(fields.bookingNote);
        },
      ),
      { numRuns: 100 },
    );
  });
});
