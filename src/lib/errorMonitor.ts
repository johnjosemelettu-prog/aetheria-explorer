import * as Sentry from '@sentry/react';

/**
 * Standardized application-level Error Monitoring and telemetry class.
 * This wraps Sentry and adds any custom tracking or fallback console logging.
 */
class ErrorMonitor {
  /**
   * Log an exception explicitly to the monitoring service
   */
  log(error: unknown, context?: Record<string, any>) {
    console.error("🔥 Error Captured:", error, context);
    
    Sentry.captureException(error, {
      extra: context || {}
    });
  }

  /**
   * Track a non-fatal message or warning
   */
  trackEvent(message: string, level: Sentry.SeverityLevel = 'info') {
    Sentry.captureMessage(message, level);
  }

  /**
   * Set user context for the session
   */
  setUserContext(userId: string, email?: string) {
    Sentry.setUser({ id: userId, email });
  }

  /**
   * Clear user context on logout
   */
  clearUserContext() {
    Sentry.setUser(null);
  }
}

export const monitor = new ErrorMonitor();
