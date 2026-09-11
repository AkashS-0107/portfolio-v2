import { useState, useEffect, useCallback } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      return navigator.onLine;
    }
    return true;
  });

  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setIsOnline(true);
      // Reset dismissal state when connection is restored so the next offline event displays notification
      setIsDismissed(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const dismissNotification = useCallback(() => {
    setIsDismissed(true);
  }, []);

  return {
    isOnline,
    isDismissed,
    showOfflineBanner: !isOnline && !isDismissed,
    dismissNotification,
  };
}
