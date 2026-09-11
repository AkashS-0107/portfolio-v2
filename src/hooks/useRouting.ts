import { useState, useEffect, useCallback } from 'react';

export function isPathname404(pathname: string): boolean {
  const normalized = pathname.trim().toLowerCase();
  return normalized !== '/' && normalized !== '/index.html' && normalized !== '';
}

export function useRouting() {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [hash, setHash] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  const syncRouteState = useCallback(() => {
    if (typeof window === 'undefined') return;
    setPathname(window.location.pathname);
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('popstate', syncRouteState);
    return () => {
      window.removeEventListener('popstate', syncRouteState);
    };
  }, [syncRouteState]);

  const is404 = isPathname404(pathname);

  const navigateToHome = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.history.pushState({}, '', '/');
    setPathname('/');
    setHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToProjects = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.history.pushState({}, '', '/#projects');
    setPathname('/');
    setHash('#projects');
    // Allow React state update to render main content before scrolling
    setTimeout(() => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  return {
    pathname,
    hash,
    is404,
    navigateToHome,
    navigateToProjects,
  };
}
