import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getDailyVerse, getISOWeek } from './useDailyVerse';

// Feature: cross-training-website, Property 5: Daily Verse Determinism
// Validates: Requirements 6.2, 6.3
describe('Property 5: Daily Verse Determinism', () => {
  it('getDailyVerse(date) returns the same verse on multiple calls for any given date', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('2000-01-01'), max: new Date('2099-12-31') })
          .filter((d) => !isNaN(d.getTime())),
        (date) => {
          const verse1 = getDailyVerse(date);
          const verse2 = getDailyVerse(date);

          expect(verse1.text).toBe(verse2.text);
          expect(verse1.reference).toBe(verse2.reference);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: cross-training-website, Property 6: Daily Verse Rotation
// Validates: Requirements 6.2
describe('Property 6: Daily Verse Rotation', () => {
  it('getDailyVerse returns different verses for two dates in different (adjacent/nearby) ISO weeks', () => {
    fc.assert(
      fc.property(
        // Generate a base date
        fc.date({ min: new Date('2000-01-01'), max: new Date('2099-01-01') })
          .filter((d) => !isNaN(d.getTime())),
        // Generate a week offset between 1 and 25 (ensures different ISO week, avoids 52-week wrap-around)
        fc.integer({ min: 1, max: 25 }),
        (baseDate, weekOffset) => {
          // Create date2 by adding weekOffset * 7 days to baseDate
          const date2 = new Date(baseDate.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000);

          const week1 = getISOWeek(baseDate);
          const week2 = getISOWeek(date2);

          // Only assert when the ISO weeks are actually different
          // (adding exactly 7 days can land in the same ISO week in edge cases)
          if (week1 === week2) {
            return; // skip — weeks happen to be equal, no assertion needed
          }

          const verse1 = getDailyVerse(baseDate);
          const verse2 = getDailyVerse(date2);

          // Dates in different ISO weeks (offset 1–25) should yield different verses
          expect(verse1.reference).not.toBe(verse2.reference);
        }
      ),
      { numRuns: 100 }
    );
  });
});
