import { useState, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Verse {
  text: string;
  reference: string; // e.g. "Philippians 4:13"
}

type VerseStatus = 'loading' | 'loaded' | 'fallback';

interface UseDailyVerseResult {
  verse: Verse;
  status: VerseStatus;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Hardcoded fallback — always available when the API is unreachable. */
export const FALLBACK_VERSE: Verse = {
  text: 'I can do all things through Christ who strengthens me.',
  reference: 'Philippians 4:13',
};

/**
 * 52 curated Bible verses — one per ISO week of the year.
 * Themes: strength, perseverance, faith, courage, excellence — well-suited
 * for an athletic training brand with a Christian foundation.
 */
export const VERSE_LIST: Verse[] = [
  // Week 1
  { text: 'I can do all things through Christ who strengthens me.', reference: 'Philippians 4:13' },
  // Week 2
  { text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.', reference: 'Isaiah 40:31' },
  // Week 3
  { text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', reference: 'Joshua 1:9' },
  // Week 4
  { text: 'Do you not know that in a race all the runners run, but only one gets the prize? Run in such a way as to get the prize.', reference: '1 Corinthians 9:24' },
  // Week 5
  { text: 'No, in all these things we are more than conquerors through him who loved us.', reference: 'Romans 8:37' },
  // Week 6
  { text: 'For God gave us a spirit not of fear but of power and love and self-control.', reference: '2 Timothy 1:7' },
  // Week 7
  { text: 'Let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith.', reference: 'Hebrews 12:1-2' },
  // Week 8
  { text: 'Be on your guard; stand firm in the faith; be courageous; be strong.', reference: '1 Corinthians 16:13' },
  // Week 9
  { text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.', reference: 'Psalm 28:7' },
  // Week 10
  { text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.', reference: 'Colossians 3:23' },
  // Week 11
  { text: 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you.', reference: 'Deuteronomy 31:6' },
  // Week 12
  { text: 'I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.', reference: 'Philippians 3:14' },
  // Week 13
  { text: 'The Lord will fight for you; you need only to be still.', reference: 'Exodus 14:14' },
  // Week 14
  { text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', reference: 'Romans 8:28' },
  // Week 15
  { text: 'Trust in the Lord with all your heart and lean not on your own understanding.', reference: 'Proverbs 3:5' },
  // Week 16
  { text: 'Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength.', reference: 'Isaiah 40:30-31' },
  // Week 17
  { text: 'I have fought the good fight, I have finished the race, I have kept the faith.', reference: '2 Timothy 4:7' },
  // Week 18
  { text: 'Do not be overcome by evil, but overcome evil with good.', reference: 'Romans 12:21' },
  // Week 19
  { text: 'Blessed is the one who perseveres under trial because, having stood the test, that person will receive the crown of life.', reference: 'James 1:12' },
  // Week 20
  { text: 'For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.', reference: '1 John 5:4' },
  // Week 21
  { text: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.', reference: 'Zephaniah 3:17' },
  // Week 22
  { text: 'Be strong in the Lord and in his mighty power.', reference: 'Ephesians 6:10' },
  // Week 23
  { text: 'With God we will gain the victory, and he will trample down our enemies.', reference: 'Psalm 60:12' },
  // Week 24
  { text: 'But thanks be to God! He gives us the victory through our Lord Jesus Christ.', reference: '1 Corinthians 15:57' },
  // Week 25
  { text: 'The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.', reference: 'Psalm 18:2' },
  // Week 26
  { text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', reference: 'Philippians 4:6' },
  // Week 27
  { text: 'I can do everything through him who gives me strength.', reference: 'Philippians 4:13 (NIV)' },
  // Week 28
  { text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', reference: 'Matthew 6:33' },
  // Week 29
  { text: 'Commit to the Lord whatever you do, and he will establish your plans.', reference: 'Proverbs 16:3' },
  // Week 30
  { text: 'For the Lord your God is the one who goes with you to fight for you against your enemies to give you victory.', reference: 'Deuteronomy 20:4' },
  // Week 31
  { text: 'My grace is sufficient for you, for my power is made perfect in weakness.', reference: '2 Corinthians 12:9' },
  // Week 32
  { text: 'Delight yourself in the Lord, and he will give you the desires of your heart.', reference: 'Psalm 37:4' },
  // Week 33
  { text: 'The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?', reference: 'Psalm 27:1' },
  // Week 34
  { text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', reference: 'Jeremiah 29:11' },
  // Week 35
  { text: 'Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.', reference: 'Philippians 1:6' },
  // Week 36
  { text: 'He gives strength to the weary and increases the power of the weak.', reference: 'Isaiah 40:29' },
  // Week 37
  { text: 'Humble yourselves, therefore, under God\'s mighty hand, that he may lift you up in due time.', reference: '1 Peter 5:6' },
  // Week 38
  { text: 'Whatever you do, do it all for the glory of God.', reference: '1 Corinthians 10:31' },
  // Week 39
  { text: 'I sought the Lord, and he answered me; he delivered me from all my fears.', reference: 'Psalm 34:4' },
  // Week 40
  { text: 'And the God of all grace, who called you to his eternal glory in Christ, after you have suffered a little while, will himself restore you and make you strong.', reference: '1 Peter 5:10' },
  // Week 41
  { text: 'The name of the Lord is a fortified tower; the righteous run to it and are safe.', reference: 'Proverbs 18:10' },
  // Week 42
  { text: 'Wait for the Lord; be strong and take heart and wait for the Lord.', reference: 'Psalm 27:14' },
  // Week 43
  { text: 'Cast your burden on the Lord, and he will sustain you; he will never permit the righteous to be moved.', reference: 'Psalm 55:22' },
  // Week 44
  { text: 'Finally, be strong in the Lord and in the strength of his might.', reference: 'Ephesians 6:10 (ESV)' },
  // Week 45
  { text: 'For we walk by faith, not by sight.', reference: '2 Corinthians 5:7' },
  // Week 46
  { text: 'Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.', reference: 'Matthew 5:16' },
  // Week 47
  { text: 'God is our refuge and strength, an ever-present help in trouble.', reference: 'Psalm 46:1' },
  // Week 48
  { text: 'For nothing will be impossible with God.', reference: 'Luke 1:37' },
  // Week 49
  { text: 'The Lord is faithful, and he will strengthen you and protect you from the evil one.', reference: '2 Thessalonians 3:3' },
  // Week 50
  { text: 'I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.', reference: 'John 16:33' },
  // Week 51
  { text: 'You are of God, little children, and have overcome them, because He who is in you is greater than he who is in the world.', reference: '1 John 4:4' },
  // Week 52
  { text: 'Praise be to the Lord my Rock, who trains my hands for war, my fingers for battle.', reference: 'Psalm 144:1' },
];

// ---------------------------------------------------------------------------
// Pure utility functions
// ---------------------------------------------------------------------------

/**
 * Returns the ISO week number (1–53) for the given date.
 *
 * Algorithm per ISO 8601:
 * - Week 1 is the week containing the first Thursday of the year.
 * - Weeks start on Monday.
 */
export function getISOWeek(date: Date): number {
  // Copy and zero-out time to avoid DST edge cases
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  // ISO weekday: Monday = 1 … Sunday = 7
  const dayOfWeek = d.getUTCDay() || 7;

  // Set d to Thursday of the same ISO week (nearest Thursday rule)
  d.setUTCDate(d.getUTCDate() + 4 - dayOfWeek);

  // January 1 of the year that owns this ISO week
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Week number: how many full 7-day periods have elapsed since Jan 1?
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
}

/**
 * Returns the verse for the given date, determined by its ISO week number.
 * The result is deterministic: the same date always produces the same verse.
 *
 * Index formula: `(isoWeek - 1) % 52` maps week numbers 1–53 onto [0, 51].
 */
export function getDailyVerse(date: Date): Verse {
  const isoWeek = getISOWeek(date);
  const index = (isoWeek - 1) % 52;
  return VERSE_LIST[index];
}

// ---------------------------------------------------------------------------
// React hook
// ---------------------------------------------------------------------------

/**
 * Fetches the daily Bible verse from `bible-api.com` for the current date.
 *
 * States:
 * - `'loading'`  — initial state while the fetch is in flight
 * - `'loaded'`   — API returned a valid response; verse text is from the API
 * - `'fallback'` — API unavailable, errored, or returned malformed data;
 *                  verse text is from FALLBACK_VERSE
 *
 * The `verse.reference` always comes from the local VERSE_LIST, not the API,
 * so it is always a well-formatted string regardless of API response shape.
 */
export function useDailyVerse(): UseDailyVerseResult {
  const [state, setState] = useState<UseDailyVerseResult>({
    verse: FALLBACK_VERSE,
    status: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    const localVerse = getDailyVerse(new Date());
    const encodedReference = encodeURIComponent(localVerse.reference);
    const url = `https://bible-api.com/${encodedReference}`;

    (async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (!cancelled) {
            setState({ verse: FALLBACK_VERSE, status: 'fallback' });
          }
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let data: any;
        try {
          data = await response.json();
        } catch {
          if (!cancelled) {
            setState({ verse: FALLBACK_VERSE, status: 'fallback' });
          }
          return;
        }

        if (typeof data?.text !== 'string' || data.text.trim() === '') {
          if (!cancelled) {
            setState({ verse: FALLBACK_VERSE, status: 'fallback' });
          }
          return;
        }

        if (!cancelled) {
          setState({
            verse: { text: data.text.trim(), reference: localVerse.reference },
            status: 'loaded',
          });
        }
      } catch {
        // Network error (fetch threw)
        if (!cancelled) {
          setState({ verse: FALLBACK_VERSE, status: 'fallback' });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
