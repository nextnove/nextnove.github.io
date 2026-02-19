import { useEffect } from 'react';
import { siteConfig } from '../../config/site';

/**
 * Google Analytics 컴포넌트
 * 프로덕션 환경에서만 활성화됩니다.
 */
export default function Analytics() {
  useEffect(() => {
    // 프로덕션이 아니거나 GA ID가 없으면 실행 안 함
    if (!siteConfig.features.analytics || !siteConfig.analytics?.gaId) {
      if (import.meta.env.DEV) {
        console.log('📊 Analytics: Disabled in development mode');
      }
      return;
    }

    const gaId = siteConfig.analytics.gaId;

    // Google Analytics 스크립트 로드
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    // gtag 초기화
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);

    console.log('📊 Analytics: Initialized');

    return () => {
      // 클린업 (필요시)
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null; // UI 없음
}
