/**
 * HomePage.test.tsx
 *
 * Covers:
 *   - Property 2: Config-Driven Disciplines Rendering (Task 10.3 — Requirements 2.3, 4.3)
 *   - Accessibility test for HomePage (Task 10.4 — Requirement 7.7)
 *
 * Feature: cross-training-website, Property 2: Config-Driven Disciplines Rendering
 * Validates: Requirements 2.3, 4.3
 */

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HomePage } from './HomePage';
import { homeContent, type Discipline } from '../content/home.content';
import * as useDailyVerseModule from '../hooks/useDailyVerse';
import { FALLBACK_VERSE } from '../hooks/useDailyVerse';

// Teach vitest+jest-axe to understand toHaveNoViolations
expect.extend(toHaveNoViolations);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Render HomePage inside a MemoryRouter with useDailyVerse mocked to avoid fetch */
function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

function mockDailyVerse() {
  vi.spyOn(useDailyVerseModule, 'useDailyVerse').mockReturnValue({
    verse: FALLBACK_VERSE,
    status: 'fallback',
  });
}

// ---------------------------------------------------------------------------
// Feature: cross-training-website, Property 2: Config-Driven Disciplines Rendering
// Validates: Requirements 2.3, 4.3
// ---------------------------------------------------------------------------

describe('Property 2: Config-Driven Disciplines Rendering', () => {
  beforeEach(() => {
    mockDailyVerse();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all discipline names from homeContent and Coming Soon badges for coming_soon items', () => {
    /**
     * Validates: Requirements 2.3, 4.3
     *
     * Strategy: generate arbitrary arrays of Discipline objects (name + status),
     * temporarily override homeContent.disciplines with the generated array,
     * render the HomePage, and assert:
     *   1. Every discipline name appears in the rendered output.
     *   2. Every discipline with status === 'coming_soon' shows a "Coming Soon" indicator.
     *
     * Also verify the same properties hold for the real homeContent.disciplines
     * array by including it as a fixed scenario alongside the property run.
     */

    // Discipline name generator: at least 1 char, no leading/trailing whitespace
    const disciplineNameArb = fc
      .string({ minLength: 1, maxLength: 40 })
      .filter((s) => s.trim().length > 0)
      .map((s) => s.trim());

    const disciplineArb: fc.Arbitrary<Discipline> = fc.record({
      name: disciplineNameArb,
      status: fc.constantFrom<'active' | 'coming_soon'>('active', 'coming_soon'),
    });

    // Ensure at least one discipline is always present
    const disciplinesArb = fc.array(disciplineArb, { minLength: 1, maxLength: 10 });

    fc.assert(
      fc.property(disciplinesArb, (disciplines) => {
        // Temporarily override the disciplines in homeContent
        const originalDisciplines = homeContent.disciplines;
        (homeContent as { disciplines: Discipline[] }).disciplines = disciplines;

        try {
          const { unmount } = renderHomePage();

          // Helper: normalize whitespace the same way RTL does
          const normalizeWS = (s: string) => s.replace(/\s+/g, ' ').trim();

          // 1. Every discipline name must appear somewhere in the rendered output
          for (const discipline of disciplines) {
            const normalizedName = normalizeWS(discipline.name);
            const nameElements = screen.getAllByText((content) =>
              normalizeWS(content).includes(normalizedName),
            );
            expect(nameElements.length).toBeGreaterThan(0);
          }

          // 2. Every coming_soon discipline must show a "Coming Soon" indicator
          const comingSoonDisciplines = disciplines.filter(
            (d) => d.status === 'coming_soon',
          );
          for (const discipline of comingSoonDisciplines) {
            // Find elements that match "Coming Soon" near/within the discipline tile
            const comingSoonIndicators = screen.getAllByText('Coming Soon');
            expect(comingSoonIndicators.length).toBeGreaterThanOrEqual(
              comingSoonDisciplines.length,
            );
          }

          unmount();
        } finally {
          // Restore original disciplines
          (homeContent as { disciplines: Discipline[] }).disciplines =
            originalDisciplines;
        }

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it('renders all discipline names from the real homeContent config', () => {
    /**
     * Validates: Requirements 2.3
     * Concrete test against the actual homeContent disciplines array.
     */
    renderHomePage();

    for (const discipline of homeContent.disciplines) {
      expect(
        screen.getByText((content) => content.includes(discipline.name)),
      ).toBeInTheDocument();
    }
  });

  it('renders "Coming Soon" badge for every coming_soon discipline in homeContent', () => {
    /**
     * Validates: Requirements 4.3
     * Concrete test against the actual homeContent disciplines array.
     */
    renderHomePage();

    const comingSoonItems = homeContent.disciplines.filter(
      (d) => d.status === 'coming_soon',
    );

    // There should be at least as many "Coming Soon" badges as coming_soon disciplines
    const badges = screen.getAllByText('Coming Soon');
    expect(badges.length).toBeGreaterThanOrEqual(comingSoonItems.length);
  });

  it('does NOT render "Coming Soon" badge for active disciplines', () => {
    renderHomePage();

    const activeDisciplines = homeContent.disciplines.filter(
      (d) => d.status === 'active',
    );

    // For each active discipline, its aria-label should NOT include "Coming Soon"
    for (const discipline of activeDisciplines) {
      const comingSoonLabel = screen.queryByLabelText(
        `${discipline.name} — Coming Soon`,
      );
      expect(comingSoonLabel).not.toBeInTheDocument();
    }
  });
});

// ---------------------------------------------------------------------------
// Task 10.4 — Accessibility test for HomePage
// Requirement: 7.7
// ---------------------------------------------------------------------------

describe('Accessibility: HomePage', () => {
  beforeEach(() => {
    mockDailyVerse();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('has no axe accessibility violations', async () => {
    const { container } = renderHomePage();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
