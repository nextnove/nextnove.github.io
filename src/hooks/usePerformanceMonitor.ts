import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

/**
 * 성능 모니터링 훅
 * 개발 모드에서만 활성화되어 Web Vitals를 측정하고 콘솔에 출력합니다.
 * 
 * @param enabled - 모니터링 활성화 여부 (기본값: false)
 */
export function usePerformanceMonitor(enabled = false) {
  const metricsRef = useRef<PerformanceMetrics>({});

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    console.log('🚀 Performance Monitoring Started');

    const metrics = metricsRef.current;
    const observers: PerformanceObserver[] = [];

    // Performance Observer for Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & { 
            renderTime?: number; 
            loadTime?: number 
          };
          metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
          
          if (import.meta.env.DEV) {
            console.log('📊 LCP:', metrics.lcp.toFixed(2), 'ms', 
              metrics.lcp < 2500 ? '✅ Good' : 
              metrics.lcp < 4000 ? '⚠️ Needs Improvement' : '❌ Poor'
            );
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        observers.push(lcpObserver);

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fidEntry = entry as PerformanceEntry & { processingStart?: number };
            metrics.fid = fidEntry.processingStart ? fidEntry.processingStart - entry.startTime : 0;
            
            if (import.meta.env.DEV) {
              console.log('📊 FID:', metrics.fid.toFixed(2), 'ms',
                metrics.fid < 100 ? '✅ Good' : 
                metrics.fid < 300 ? '⚠️ Needs Improvement' : '❌ Poor'
              );
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        observers.push(fidObserver);

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const clsEntry = entry as PerformanceEntry & { 
              hadRecentInput?: boolean; 
              value?: number 
            };
            if (!clsEntry.hadRecentInput) {
              clsValue += clsEntry.value || 0;
              metrics.cls = clsValue;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        observers.push(clsObserver);

        // Navigation Timing (TTFB, FCP)
        if (performance.getEntriesByType) {
          const navigationEntries = performance.getEntriesByType('navigation');
          if (navigationEntries.length > 0) {
            const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            metrics.fcp = navEntry.domContentLoadedEventEnd - navEntry.fetchStart;
            
            if (import.meta.env.DEV) {
              console.log('📊 TTFB:', metrics.ttfb.toFixed(2), 'ms',
                metrics.ttfb < 800 ? '✅ Good' : 
                metrics.ttfb < 1800 ? '⚠️ Needs Improvement' : '❌ Poor'
              );
              console.log('📊 FCP:', metrics.fcp.toFixed(2), 'ms',
                metrics.fcp < 1800 ? '✅ Good' : 
                metrics.fcp < 3000 ? '⚠️ Needs Improvement' : '❌ Poor'
              );
            }
          }
        }

        // 페이지 언로드 시 최종 메트릭 로깅
        const logMetrics = () => {
          if (import.meta.env.DEV) {
            console.log('📈 Final Performance Metrics:', {
              'LCP (Largest Contentful Paint)': metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
              'FID (First Input Delay)': metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
              'CLS (Cumulative Layout Shift)': metrics.cls ? metrics.cls.toFixed(3) : 'N/A',
              'TTFB (Time to First Byte)': metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A',
              'FCP (First Contentful Paint)': metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
            });
            
            // CLS 최종 평가
            if (metrics.cls !== undefined) {
              console.log('📊 CLS:', metrics.cls.toFixed(3),
                metrics.cls < 0.1 ? '✅ Good' : 
                metrics.cls < 0.25 ? '⚠️ Needs Improvement' : '❌ Poor'
              );
            }
          }
          // 프로덕션에서는 분석 서비스로 전송
          // analytics.send('performance', metrics);
        };

        // 페이지 로드 완료 후 3초 뒤 요약 출력
        const summaryTimeout = setTimeout(() => {
          logMetrics();
        }, 3000);

        window.addEventListener('beforeunload', logMetrics);

        return () => {
          observers.forEach(observer => observer.disconnect());
          window.removeEventListener('beforeunload', logMetrics);
          clearTimeout(summaryTimeout);
        };
      } catch (error) {
        console.error('❌ Performance monitoring error:', error);
      }
    } else {
      console.warn('⚠️ PerformanceObserver not supported');
    }
  }, [enabled]);
}
