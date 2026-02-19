import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal(
  trigger?: unknown,
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // prefers-reduced-motion 체크
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // 기존 observer 정리
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions: IntersectionObserverInit = {
      threshold,
      rootMargin
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (prefersReducedMotion) {
            // 애니메이션 없이 즉시 표시
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('scroll-reveal');
          } else {
            entry.target.classList.add('reveal-visible');
          }
          // 한 번 표시되면 관찰 중지 (성능 최적화)
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [trigger, threshold, rootMargin]);
}
