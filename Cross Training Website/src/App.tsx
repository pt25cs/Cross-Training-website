/**
 * App.tsx — Root application component with routing configuration
 *
 * Uses HashRouter for static hosting compatibility (no server rewrites
 * needed for GitHub Pages, Netlify, etc.). All pages are nested under the
 * shared Layout route so Navigation and Footer are always rendered.
 * Unknown paths redirect to the home page to prevent blank-screen 404s.
 *
 * Requirements: 1.2
 */

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
