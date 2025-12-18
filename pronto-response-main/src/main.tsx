import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/i18n.tsx'  // Initialize i18next

createRoot(document.getElementById("root")!).render(
  <App />
);
