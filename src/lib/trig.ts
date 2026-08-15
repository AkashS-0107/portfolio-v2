// Centralized Trig.js Integration Helper

declare global {
  interface Window {
    trig?: {
      trigInit: () => void;
      trigScroll: () => void;
      trigWindowHeight: () => void;
      trigs?: NodeListOf<Element>;
    };
    Trig?: unknown;
  }
}

/**
 * Initializes or re-initializes Trig.js observer on data-trig elements.
 * Should be called after React mounts components or DOM structure updates.
 */
export function initTrig(): void {
  if (typeof window === 'undefined') return;

  // Use requestAnimationFrame to ensure DOM elements are fully attached
  requestAnimationFrame(() => {
    if (window.trig && typeof window.trig.trigInit === 'function') {
      try {
        window.trig.trigInit();
      } catch (err) {
        console.warn('Trig initialization warning:', err);
      }
    }
  });
}

/**
 * Refreshes Trig.js scroll observer targets.
 */
export function refreshTrig(): void {
  if (typeof window === 'undefined') return;
  requestAnimationFrame(() => {
    if (window.trig && typeof window.trig.trigInit === 'function') {
      try {
        window.trig.trigInit();
      } catch (err) {
        console.warn('Trig refresh warning:', err);
      }
    }
  });
}

/**
 * Updates Trig scroll measurements (e.g. on window resize).
 */
export function updateTrig(): void {
  if (typeof window === 'undefined') return;
  if (window.trig && typeof window.trig.trigWindowHeight === 'function') {
    window.trig.trigWindowHeight();
  }
}
