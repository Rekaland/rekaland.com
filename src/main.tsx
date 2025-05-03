
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Script to remove any dynamically injected Lovable badges
const removeBadges = () => {
  // Remove any elements with ID containing "lovable-badge"
  const badgeElements = document.querySelectorAll('[id*="lovable-badge"], a[href*="lovable.dev"]');
  badgeElements.forEach(element => element.remove());
};

// Run on load and periodically check
window.addEventListener('load', removeBadges);
// Check every few seconds for dynamically added badges
setInterval(removeBadges, 2000);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
