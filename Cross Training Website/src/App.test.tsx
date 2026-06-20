/**
 * App.test.tsx — Integration tests for routing and NavLink active state
 *
 * Tests:
 * - HashRouter navigates to the correct page component on route change
 * - Active NavLink CSS class applies to the current route link
 *
 * Requirements: 1.2
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function renderApp() {
  return render(<App />);
}

// ---------------------------------------------------------------------------
// Integration: HashRouter navigates to the correct page on route change
// Validates: Requirements 1.2
// ---------------------------------------------------------------------------

describe('App routing — integration', () => {
  it('renders the Home page by default', () => {
    renderApp();
    // HomePage renders an h1 with the hero headline
    expect(screen.getByRole('heading', { name: 'Train Hard. Play Hard. Honor God.', level: 1 })).toBeInTheDocument();
  });

  it('navigates to the About page when the "About Us" nav link is clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'About Us' }));

    expect(screen.getByRole('heading', { name: 'About Us', level: 1 })).toBeInTheDocument();
  });

  it('navigates to the Services page when the "Services" nav link is clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Services' }));

    // ServicesPage h1 uses servicesContent.pageTitle = "Training Services"
    expect(screen.getByRole('heading', { name: 'Training Services', level: 1 })).toBeInTheDocument();
  });

  it('navigates to the Contact page when the "Contact Us" nav link is clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Contact Us' }));

    // ContactPage h1 uses contactContent.pageTitle = "Get in Touch"
    expect(screen.getByRole('heading', { name: 'Get in Touch', level: 1 })).toBeInTheDocument();
  });

  it('navigates back to the Home page when the "Home" nav link is clicked', async () => {
    const user = userEvent.setup();
    renderApp();

    // Navigate away first
    await user.click(screen.getByRole('link', { name: 'Services' }));
    expect(screen.getByRole('heading', { name: 'Training Services', level: 1 })).toBeInTheDocument();

    // Navigate back home
    await user.click(screen.getByRole('link', { name: 'Home' }));
    expect(screen.getByRole('heading', { name: 'Train Hard. Play Hard. Honor God.', level: 1 })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Active NavLink — aria-current reflects the current route
// Validates: Requirements 1.2
//
// React Router's NavLink sets aria-current="page" on the active link.
// This is a more reliable signal than CSS class name matching (which is
// subject to CSS Modules hashing) and is also the correct accessibility
// attribute for indicating the current page in a navigation landmark.
// ---------------------------------------------------------------------------

describe('App routing — active NavLink', () => {
  it('Home link has aria-current="page" on initial render', () => {
    renderApp();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('About Us link has aria-current="page" after navigating to /about', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'About Us' }));

    const aboutLink = screen.getByRole('link', { name: 'About Us' });
    expect(aboutLink).toHaveAttribute('aria-current', 'page');

    // Home link should no longer be active
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).not.toHaveAttribute('aria-current', 'page');
  });

  it('Services link has aria-current="page" after navigating to /services', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Services' }));

    const servicesLink = screen.getByRole('link', { name: 'Services' });
    expect(servicesLink).toHaveAttribute('aria-current', 'page');
  });

  it('Contact Us link has aria-current="page" after navigating to /contact', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'Contact Us' }));

    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).toHaveAttribute('aria-current', 'page');
  });
});

// ---------------------------------------------------------------------------
// Layout structure — Navigation and Footer always rendered
// Validates: Requirements 1.1
// ---------------------------------------------------------------------------

describe('App layout structure', () => {
  it('renders the Navigation on the home page', () => {
    renderApp();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('renders the Navigation on the About page', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole('link', { name: 'About Us' }));

    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('renders the Footer on every page', async () => {
    const user = userEvent.setup();
    renderApp();

    // Home
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    // About
    await user.click(screen.getByRole('link', { name: 'About Us' }));
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the skip-nav link for accessibility', () => {
    renderApp();
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders the <main> element with id="main-content"', () => {
    renderApp();
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });
});
