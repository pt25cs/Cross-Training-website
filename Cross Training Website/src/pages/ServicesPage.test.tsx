/**
 * ServicesPage.test.tsx
 *
 * Accessibility test for ServicesPage (Task 12.3 — Requirement 7.7)
 *
 * Validates: Requirements 7.7
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ServicesPage } from './ServicesPage';

// Teach vitest+jest-axe to understand toHaveNoViolations
expect.extend(toHaveNoViolations);

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function renderServicesPage() {
  return render(
    <MemoryRouter>
      <ServicesPage />
    </MemoryRouter>,
  );
}

// ---------------------------------------------------------------------------
// Task 12.3 — Accessibility test for ServicesPage
// Requirement: 7.7
// ---------------------------------------------------------------------------

describe('Accessibility: ServicesPage', () => {
  it('has no axe accessibility violations', async () => {
    const { container } = renderServicesPage();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
