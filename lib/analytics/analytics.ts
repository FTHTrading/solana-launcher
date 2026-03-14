import type { AnalyticsEvent } from '@/types';

// =============================================
// ANALYTICS ABSTRACTION LAYER
//
// This interface allows swapping analytics
// providers without changing call sites.
//
// Future providers: PostHog, Mixpanel, Segment,
// custom DB events, or multi-provider fan-out.
// =============================================

export interface AnalyticsAdapter {
  track(event: AnalyticsEvent): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
  page(page: string, properties?: Record<string, unknown>): void;
}

// Console adapter for development (zero-noise, structured)
const consoleAdapter: AnalyticsAdapter = {
  track(event) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[analytics:track]', event.name, 'properties' in event ? event.properties : {});
    }
  },
  identify(userId, traits) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[analytics:identify]', userId, traits);
    }
  },
  page(page, properties) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[analytics:page]', page, properties);
    }
  },
};

// TODO: Replace or extend with live provider in production.
// Example PostHog integration:
//
// import posthog from 'posthog-js';
// const posthogAdapter: AnalyticsAdapter = {
//   track: (event) => posthog.capture(event.name, event.properties),
//   identify: (id, traits) => posthog.identify(id, traits),
//   page: (page) => posthog.capture('$pageview', { page }),
// };

let adapter: AnalyticsAdapter = consoleAdapter;

export function setAnalyticsAdapter(newAdapter: AnalyticsAdapter): void {
  adapter = newAdapter;
}

export const analytics = {
  track(event: AnalyticsEvent): void {
    try {
      adapter.track(event);
    } catch {
      // Analytics must never crash the app
    }
  },
  identify(userId: string, traits?: Record<string, unknown>): void {
    try {
      adapter.identify(userId, traits);
    } catch {
      // Silent
    }
  },
  page(page: string, properties?: Record<string, unknown>): void {
    try {
      adapter.page(page, properties);
    } catch {
      // Silent
    }
  },
};

// =============================================
// PRODUCT METRICS (documented for data team)
// =============================================
//
// Key conversion funnel metrics to track:
//
// 1. Visit → Wallet Connect rate
//    = wallet_connected events / unique page views on /
//
// 2. Wallet Connect → Wizard Start rate
//    = wizard_started / wallet_connected
//
// 3. Wizard Start → Token Creation Success rate
//    = token_creation_success / wizard_started
//
// 4. Average fee revenue per launch
//    = sum(feeSOL from token_creation_success) / count
//
// 5. Most common validation failures
//    = aggregate wizard_abandoned by stepName
//
// 6. Wizard drop-off by step
//    = wizard_abandoned grouped by step
//
// 7. Burn adoption rate
//    = burn_success / count of users with tokens
//
// 8. Average tx confirmation time
//    = measure from token_creation_attempted → token_creation_success delta
