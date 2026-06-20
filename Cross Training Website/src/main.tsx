import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { validateSiteConfig } from './content/validateConfig'

// Run dev-only config validation at module load time (before the component tree mounts).
// In production builds Vite's tree-shaker removes this entirely.
validateSiteConfig()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
