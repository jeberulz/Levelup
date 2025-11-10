import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number;
  startOnMount?: boolean;
  decimals?: number;
}

export function useCountUp(
  end: number,
  options: UseCountUpOptions = {}
): number {
  const {
    duration = 800,
    startOnMount = true,
    decimals = 0,
  } = options;

  const [count, setCount] = useState(startOnMount ? 0 : end);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const endValueRef = useRef(end);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !startOnMount) {
      setCount(end);
      return;
    }

    // Update end value if it changes
    endValueRef.current = end;
    startValueRef.current = count;

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out function
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentCount = startValueRef.current + (endValueRef.current - startValueRef.current) * easeOut;
      
      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValueRef.current);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [end, duration, startOnMount, decimals]);

  // Reset animation when end value changes significantly
  useEffect(() => {
    if (Math.abs(endValueRef.current - end) > 0.01) {
      startValueRef.current = count;
      startTimeRef.current = null;
    }
  }, [end, count]);

  return count;
}

