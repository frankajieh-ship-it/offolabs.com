/**
 * Analytics Event Tracking
 *
 * Supports multiple providers: Google Analytics, Mixpanel, custom endpoints
 */

export type AnalyticsEvent = {
  name: string
  properties?: Record<string, unknown>
  timestamp?: Date
}

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void | Promise<void>
}

class GoogleAnalytics implements AnalyticsProvider {
  track(event: AnalyticsEvent): void {
    if (typeof window === 'undefined') return

    // Google Analytics (gtag)
    if ((window as any).gtag) {
      (window as any).gtag('event', event.name, event.properties || {})
    }
  }
}

class CustomEventTracker implements AnalyticsProvider {
  private endpoint: string

  constructor(endpoint: string = '/api/events') {
    this.endpoint = endpoint
  }

  async track(event: AnalyticsEvent): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.name,
          properties: event.properties,
          timestamp: event.timestamp || new Date(),
        }),
      })
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }
}

class Analytics {
  private providers: AnalyticsProvider[] = []

  constructor() {
    // Initialize providers
    this.providers.push(new GoogleAnalytics())
    this.providers.push(new CustomEventTracker())
  }

  /**
   * Track a custom event
   */
  track(name: string, properties?: Record<string, unknown>): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date(),
    }

    this.providers.forEach((provider) => {
      try {
        provider.track(event)
      } catch (error) {
        console.error(`Analytics provider error:`, error)
      }
    })
  }

  /**
   * Track page view
   */
  pageView(path: string, title?: string): void {
    this.track('page_view', {
      path,
      title,
    })
  }

  /**
   * Track button/link click
   */
  click(elementId: string, label?: string): void {
    this.track('click', {
      elementId,
      label,
    })
  }

  /**
   * Track form submission
   */
  formSubmit(formId: string, formName?: string): void {
    this.track('form_submit', {
      formId,
      formName,
    })
  }

  /**
   * Track error
   */
  error(errorType: string, message: string, context?: Record<string, unknown>): void {
    this.track('error', {
      errorType,
      message,
      ...context,
    })
  }

  /**
   * Track custom conversion goal
   */
  conversion(goal: string, value?: number): void {
    this.track('conversion', {
      goal,
      value,
    })
  }

  /**
   * Track social sharing
   */
  share(platform: string, content?: string): void {
    this.track('social_share', {
      platform,
      content,
    })
  }

  /**
   * Track video engagement
   */
  videoEvent(action: 'play' | 'pause' | 'complete', videoId: string, duration?: number): void {
    this.track(`video_${action}`, {
      videoId,
      duration,
    })
  }

  /**
   * Track product interaction
   */
  productInteraction(action: string, productId: string, productName?: string): void {
    this.track('product_interaction', {
      action,
      productId,
      productName,
    })
  }

  /**
   * Track waitlist signup
   */
  waitlistSignup(product: string, email?: string, source?: string): void {
    this.track('waitlist_signup', {
      product,
      email: email ? this.hashEmail(email) : undefined, // Don't send raw email
      source,
    })
  }

  /**
   * Simple email hashing for privacy
   */
  private hashEmail(email: string): string {
    let hash = 0
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return `email_${Math.abs(hash).toString(16)}`
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Export for use in client components
export default analytics
