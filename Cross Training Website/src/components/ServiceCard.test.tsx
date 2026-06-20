/**
 * ServiceCard.test.tsx — Property 3 and unit tests for ServiceCard
 *
 * Property 3: Config-Driven Services Rendering
 * For any array of ServiceItem objects, every service's name, description,
 * target skill level, and price shall appear in the rendered output, and
 * every coming_soon service shows a "Coming Soon" badge.
 *
 * Validates: Requirements 4.1, 4.3
 */

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import * as fc from 'fast-check';
import type { ServiceItem } from '../content/services.content';
import { ServiceCard } from './ServiceCard';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeService(overrides: Partial<ServiceItem> = {}): ServiceItem {
  return {
    id: 'basketball-training',
    name: 'Basketball Training',
    description: 'Individual and small-group basketball sessions.',
    targetSkillLevel: 'Ages 8–18 · All skill levels',
    price: '$50 / session',
    status: 'active',
    ...overrides,
  };
}

// Non-whitespace-only string generator: starts and ends with a visible character.
// RTL normalizes whitespace (collapses runs of whitespace to a single space),
// so we pre-normalize generated strings to match what the DOM will show.
const visibleString = fc
  .string({ minLength: 1, maxLength: 80 })
  .filter((s) => s.trim().length > 0)
  .map((s) => s.replace(/\s+/g, ' ').trim());

// fast-check arbitrary for ServiceItem
const serviceItemArb = fc.record<ServiceItem>({
  id: visibleString,
  name: visibleString,
  description: visibleString,
  targetSkillLevel: visibleString,
  // price can be "" (hidden) or a visible string
  price: fc.oneof(fc.constant(''), visibleString),
  status: fc.constantFrom<'active' | 'coming_soon'>('active', 'coming_soon'),
});

// ---------------------------------------------------------------------------
// Feature: cross-training-website, Property 3: Config-Driven Services Rendering
// Validates: Requirements 4.1, 4.3
// ---------------------------------------------------------------------------

describe('Property 3: Config-Driven Services Rendering', () => {
  it('service name, description, skill level, and price appear in rendered output', () => {
    // Feature: cross-training-website, Property 3: Config-Driven Services Rendering
    fc.assert(
      fc.property(
        serviceItemArb,
        (service) => {
          const { unmount, container } = render(<ServiceCard service={service} />);
          const scope = within(container);

          // Name appears (use function matcher to handle RTL normalization)
          expect(scope.getAllByText((content) => content.trim() === service.name.trim()).length).toBeGreaterThan(0);

          // Description appears
          expect(scope.getAllByText((content) => content.trim() === service.description.trim()).length).toBeGreaterThan(0);

          // Skill level appears
          expect(scope.getAllByText((content) => content.trim() === service.targetSkillLevel.trim()).length).toBeGreaterThan(0);

          // Price appears only when non-empty
          if (service.price !== '') {
            expect(scope.getAllByText((content) => content.trim() === service.price.trim()).length).toBeGreaterThan(0);
          }

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('coming_soon services always show a "Coming Soon" badge', () => {
    // Feature: cross-training-website, Property 3: Config-Driven Services Rendering
    fc.assert(
      fc.property(
        serviceItemArb.filter((s) => s.status === 'coming_soon'),
        (service) => {
          const { unmount, container } = render(<ServiceCard service={service} />);
          const scope = within(container);

          // "Coming Soon" badge must be present
          expect(scope.getByText('Coming Soon')).toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });

  it('active services do NOT show a "Coming Soon" badge', () => {
    fc.assert(
      fc.property(
        serviceItemArb.filter((s) => s.status === 'active'),
        (service) => {
          const { unmount, container } = render(<ServiceCard service={service} />);
          const scope = within(container);

          expect(scope.queryByText('Coming Soon')).not.toBeInTheDocument();

          unmount();
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Unit tests for ServiceCard
// Requirements: 4.1, 4.3
// ---------------------------------------------------------------------------

describe('ServiceCard — unit tests', () => {
  // -----------------------------------------------------------------------
  // Coming Soon status
  // -----------------------------------------------------------------------

  it('renders "Coming Soon" badge for coming_soon status', () => {
    render(<ServiceCard service={makeService({ status: 'coming_soon' })} />);
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('does NOT render BookingCTA for coming_soon cards', () => {
    render(<ServiceCard service={makeService({ status: 'coming_soon' })} />);
    // BookingCTA renders an <a> link — should be absent
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  // -----------------------------------------------------------------------
  // Active status
  // -----------------------------------------------------------------------

  it('does NOT render "Coming Soon" badge for active status', () => {
    render(<ServiceCard service={makeService({ status: 'active' })} />);
    expect(screen.queryByText('Coming Soon')).not.toBeInTheDocument();
  });

  it('renders BookingCTA link for active services', () => {
    render(<ServiceCard service={makeService({ status: 'active' })} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders all fields for an active service', () => {
    const service = makeService({
      name: 'Basketball Training',
      description: 'Individual and small-group sessions.',
      targetSkillLevel: 'Ages 8–18 · All skill levels',
      price: '$50 / session',
      status: 'active',
    });
    render(<ServiceCard service={service} />);

    expect(screen.getByText('Basketball Training')).toBeInTheDocument();
    expect(screen.getByText('Individual and small-group sessions.')).toBeInTheDocument();
    expect(screen.getByText('Ages 8–18 · All skill levels')).toBeInTheDocument();
    expect(screen.getByText('$50 / session')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  // -----------------------------------------------------------------------
  // Price field
  // -----------------------------------------------------------------------

  it('hides price when price is an empty string', () => {
    render(<ServiceCard service={makeService({ price: '' })} />);
    // There should be no element rendering an empty price string.
    // The easiest check is to verify no element with the exact text "" exists
    // that looks like a price. We verify the price field is simply absent.
    const card = screen.getByRole('article');
    // No element inside the card should have class matching 'price' with empty text.
    // We confirm the card does not contain "$" (since empty price means no price line).
    expect(card.textContent).not.toMatch(/^\$|\/\s*session/);
  });

  it('shows price when price is a non-empty string', () => {
    render(<ServiceCard service={makeService({ price: '$75 / session' })} />);
    expect(screen.getByText('$75 / session')).toBeInTheDocument();
  });

  // -----------------------------------------------------------------------
  // Service name as heading
  // -----------------------------------------------------------------------

  it('renders the service name as a heading (h3)', () => {
    render(<ServiceCard service={makeService({ name: 'Soccer Training' })} />);
    const heading = screen.getByRole('heading', { name: 'Soccer Training' });
    expect(heading.tagName).toBe('H3');
  });

  // -----------------------------------------------------------------------
  // Card accessibility
  // -----------------------------------------------------------------------

  it('renders as an article element', () => {
    render(<ServiceCard service={makeService()} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
