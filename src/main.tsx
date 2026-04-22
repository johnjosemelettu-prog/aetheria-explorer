import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/i18n'; // Initialize i18next

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </StrictMode>,
);
