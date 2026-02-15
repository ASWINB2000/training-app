'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface TimerProps {
  timeLimit: number; // seconds
  onExpire: () => void;
  isActive: boolean;
}

export default function Timer({ timeLimit, onExpire, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft <= 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLow = timeLeft <= 60 && timeLeft > 0;

  return (
    <div
      className={`font-mono text-lg font-bold px-4 py-2 rounded-lg transition-colors ${
        isLow
          ? 'bg-red-100 text-red-700 animate-pulse'
          : 'bg-blue-100 text-blue-800'
      }`}
    >
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
