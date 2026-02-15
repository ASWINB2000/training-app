'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TestResult } from '@/types';
import ResultsReview from '@/components/ResultsReview';

export default function ResultsPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('testResults');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      router.push('/');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ResultsReview result={result} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <button
          onClick={() => {
            sessionStorage.removeItem('testResults');
            router.push('/');
          }}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Take Another Test
        </button>
      </div>
    </div>
  );
}
