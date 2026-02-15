'use client';

import { useEffect } from 'react';
import TestEngine from '@/components/TestEngine';

export default function TestPage() {
  useEffect(() => {
    // Prevent browser back button during test
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Warn before closing tab
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <TestEngine />;
}
