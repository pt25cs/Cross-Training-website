/**
 * validateConfig.ts — Development-only runtime config validation
 *
 * This module runs only in development builds (when `import.meta.env.DEV` is true).
 * It checks that required fields in `siteConfig` are present and correctly typed,
 * logging a `console.error` for each violation so developers catch misconfiguration
 * before launch.
 *
 * It does NOT throw — the app continues to run. This is intentional: the site should
 * remain navigable even if a placeholder value is left in, so the developer can still
 * preview the layout while addressing the warning.
 *
 * Import and call `validateSiteConfig()` once at module load time in `src/main.tsx`.
 *
 * Requirements: 8.2
 */

import { siteConfig } from './site.config';

/**
 * Validates that a value is a non-empty string.
 * Returns `true` if valid, `false` otherwise.
 */
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates that a value is a non-empty string starting with "https://".
 * Returns `true` if valid, `false` otherwise.
 */
function isHttpsUrl(value: unknown): value is string {
  return isNonEmptyString(value) && (value as string).startsWith('https://');
}

/**
 * Runs development-only validation checks against `siteConfig`.
 *
 * Checks performed:
 * - `brandName`        — must be a non-empty string
 * - `instagramHandle`  — must be a non-empty string
 * - `instagramUrl`     — must be a non-empty string starting with "https://"
 *
 * Each violation is reported via `console.error` with the field name and
 * a description of the expected format.
 *
 * Only executes when `import.meta.env.DEV` is true (Vite development mode).
 * This function is a no-op in production builds — Vite's tree-shaker removes
 * the entire guarded block.
 */
export function validateSiteConfig(): void {
  if (!import.meta.env.DEV) {
    return;
  }

  if (!isNonEmptyString(siteConfig.brandName)) {
    console.error(
      '[validateConfig] siteConfig.brandName is invalid. ' +
        'Expected: non-empty string (e.g. "Cross Training"). ' +
        `Received: ${JSON.stringify(siteConfig.brandName)}`
    );
  }

  if (!isNonEmptyString(siteConfig.instagramHandle)) {
    console.error(
      '[validateConfig] siteConfig.instagramHandle is invalid. ' +
        'Expected: non-empty string without the leading @ (e.g. "crosstrainingco"). ' +
        `Received: ${JSON.stringify(siteConfig.instagramHandle)}`
    );
  }

  if (!isHttpsUrl(siteConfig.instagramUrl)) {
    console.error(
      '[validateConfig] siteConfig.instagramUrl is invalid. ' +
        'Expected: non-empty string starting with "https://" (e.g. "https://instagram.com/crosstrainingco"). ' +
        `Received: ${JSON.stringify(siteConfig.instagramUrl)}`
    );
  }
}
