/**
 * AboutPage.test.tsx
 *
 * Covers:
 *   - Property 4: Config-Driven Trainer Rendering (Task 11.3 — Requirement 3.2)
 *   - Accessibility test for AboutPage (Task 11.4 — Requirement 7.7)
 *
 * // Feature: cross-training-website, Property 4: Config-Driven Trainer Rendering
 * // Validates: Requirements 3.2
 */

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AboutPage } from './AboutPage';
import { aboutContent, type Trainer } from '../content/about.content';

// Teach vitest+jest-axe to understand toHaveNoViolations
expect.extend(toHaveNoViolations);

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function renderAboutPage() {
  return render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Feature: cross-training-website, Property 4: Config-Driven Trainer Rendering
// Validates: Requirements 3.2
// ---------------------------------------------------------------------------

describe('Property 4: Config-Driven Trainer Rendering', () => {
  afterEach(() => {
    // Restore original trainers after each test run
    // (restoration is done inside fc.property via finally)
  });

  it('renders every trainer name and bio for any array of Trainer objects', () => {
    /**
     * Validates: Requirements 3.2
     *
     * Strategy: generate arbitrary arrays of Trainer objects, temporarily
     * override aboutContent.trainers with the generated array, render the
     * AboutPage, and assert:
     *   1. Every trainer's name appears in the rendered output.
     *   2. Every trainer's bio (first paragraph at minimum) appears in the output.
     *
     * numRuns: 100
     */

    // Generator for non-empty, trimmed strings
    const nonEmptyStringArb = fc
      .string({ minLength: 1, maxLength: 60 })
      .filter((s) => s.trim().length > 0)
      .map((s) => s.trim());

    const trainerArb: fc.Arbitrary<Trainer> = fc.record({
      name: nonEmptyStringArb,
      // Use empty photoUrl to keep tests simple (no img loading)
      photoUrl: fc.constant(''),
      // Single-paragraph bio (no \n\n) to keep matching straightforward
      bio: nonEmptyStringArb,
      qualifications: fc.array(nonEmptyStringArb, { minLength: 0, maxLength: 4 }),
    });

    // Ensure at least one trainer is always present
    const trainersArb = fc.array(trainerArb, { minLength: 1, maxLength: 6 });

    fc.assert(
      fc.property(trainersArb, (trainers) => {
        const originalTrainers = aboutContent.trainers;
        (aboutContent as { trainers: Trainer[] }).trainers = trainers;

        try {
          const { unmount } = renderAboutPage();

          // Helper: normalize whitespace the same way RTL does
          const normalizeWS = (s: string) => s.replace(/\s+/g, ' ').trim();

          // 1. Every trainer's name must appear in the rendered output
          for (const trainer of trainers) {
            const normalizedName = normalizeWS(trainer.name);
            const nameMatches = screen.getAllByText((content) =>
              normalizeWS(content).includes(normalizedName),
            );
            expect(nameMatches.length).toBeGreaterThan(0);
          }

          // 2. Every trainer's bio (or first paragraph) must appear in the output
          for (const trainer of trainers) {
            // Use the first paragraph in case of multi-paragraph bios
            const firstParagraph = normalizeWS(trainer.bio.split('\n\n')[0]);
            const bioMatches = screen.getAllByText((content) =>
              normalizeWS(content).includes(firstParagraph),
            );
            expect(bioMatches.length).toBeGreaterThan(0);
          }

          unmount();
        } finally {
          (aboutContent as { trainers: Trainer[] }).trainers = originalTrainers;
        }

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it('renders all trainer names from the real aboutContent config', () => {
    /**
     * Validates: Requirements 3.2
     * Concrete test against the actual aboutContent.trainers array.
     */
    renderAboutPage();

    for (const trainer of aboutContent.trainers) {
      const matches = screen.getAllByText((content) =>
        content.includes(trainer.name),
      );
      expect(matches.length).toBeGreaterThan(0);
    }
  });

  it('renders qualifications for each trainer from the real aboutContent config', () => {
    /**
     * Validates: Requirements 3.2, 3.3
     * Concrete test verifying qualifications appear.
     */
    renderAboutPage();

    for (const trainer of aboutContent.trainers) {
      for (const qual of trainer.qualifications) {
        expect(
          screen.getByText((content) => content.includes(qual)),
        ).toBeInTheDocument();
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Task 11.4 — Accessibility test for AboutPage
// Requirement: 7.7
// ---------------------------------------------------------------------------

describe('Accessibility: AboutPage', () => {
  it('has no axe accessibility violations', async () => {
    const { container } = renderAboutPage();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
