// src/utils/analytics.ts
// Analytics & Monitoring Setup for OFFO Launch Platform

/**
 * Google Analytics Integration
 */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Custom Event Tracking
 */
export const trackEvent = {
  // Project events
  projectCreated: (projectId: string) => {
    event({
      action: 'create',
      category: 'Project',
      label: projectId,
    });
  },

  projectViewed: (projectId: string) => {
    event({
      action: 'view',
      category: 'Project',
      label: projectId,
    });
  },

  // Permit events
  permitCreated: (permitType: string) => {
    event({
      action: 'create',
      category: 'Permit',
      label: permitType,
    });
  },

  permitSynced: (permitId: string) => {
    event({
      action: 'sync',
      category: 'Permit',
      label: permitId,
    });
  },

  // Document events
  documentUploaded: (fileType: string, fileSize: number) => {
    event({
      action: 'upload',
      category: 'Document',
      label: fileType,
      value: fileSize,
    });
  },

  // User events
  userLogin: () => {
    event({
      action: 'login',
      category: 'User',
    });
  },

  userRegister: () => {
    event({
      action: 'register',
      category: 'User',
    });
  },

  // Inspection events
  inspectionScheduled: (inspectionType: string) => {
    event({
      action: 'schedule',
      category: 'Inspection',
      label: inspectionType,
    });
  },
};

/**
 * Mixpanel Integration (optional)
 */
export const initMixpanel = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    // Initialize Mixpanel
    // mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
  }
};

export const mixpanelTrack = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).mixpanel) {
    (window as any).mixpanel.track(event, properties);
  }
};

/**
 * Error Tracking (Sentry)
 */
export const captureException = (error: Error, context?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      extra: context,
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error captured:', error, context);
  }
};

/**
 * Performance Monitoring
 */
export const measurePerformance = (metricName: string, startTime: number) => {
  const endTime = performance.now();
  const duration = endTime - startTime;

  // Log performance metric
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance [${metricName}]: ${duration.toFixed(2)}ms`);
  }

  // Send to analytics
  event({
    action: 'performance',
    category: 'Metrics',
    label: metricName,
    value: Math.round(duration),
  });
};

/**
 * User Session Tracking
 */
export const trackSession = () => {
  if (typeof window === 'undefined') return;

  const sessionStart = Date.now();

  // Track session end on page unload
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Date.now() - sessionStart;
    event({
      action: 'session_end',
      category: 'Engagement',
      value: Math.round(sessionDuration / 1000), // Convert to seconds
    });
  });
};

/**
 * Feature Usage Tracking
 */
export const trackFeatureUsage = (featureName: string, metadata?: Record<string, any>) => {
  event({
    action: 'use_feature',
    category: 'Features',
    label: featureName,
  });

  // Send additional metadata to Mixpanel if available
  if (metadata) {
    mixpanelTrack(`feature_${featureName}`, metadata);
  }
};

// Global type definitions for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
