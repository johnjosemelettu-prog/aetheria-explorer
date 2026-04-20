import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.tsx';
import './index.css';
import './lib/i18n'; // Initialize i18next

Sentry.init({
  dsn: "https://mock-dsn@o0.ingest.sentry.io/0000000",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<div style={{padding: 40, textAlign: 'center', fontFamily: 'monospace'}}>An unexpected system failure occurred. Engineering notified.</div>}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
