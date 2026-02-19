/**
 * 사이트 전역 설정
 * 이 파일에서 모든 URL, 메타데이터, 소셜 링크를 중앙 관리합니다.
 */

export const siteConfig = {
  // 기본 정보
  name: 'NextNove Dev',
  title: 'NextNove Dev - Innovation Lab',
  description: '혁신적인 기술로 더 나은 미래를 만들어갑니다. 최신 웹 기술과 AI를 활용하여 사용자 중심의 솔루션을 개발합니다.',
  tagline: 'Innovation Lab',
  
  // URL (환경에 따라 자동 설정)
  url: import.meta.env.DEV 
    ? 'http://localhost:5173'
    : 'https://nextnove.github.io',
  
  // 소셜 링크
  links: {
    github: 'https://github.com/nextnove',
    twitter: 'https://x.com/nextnove',
    linkedin: 'https://linkedin.com/company/nextnove',
    email: 'contact@nextnove.com'
  },
  
  // 메타데이터
  metadata: {
    author: 'NextNove',
    keywords: ['NextNove', 'Web Development', 'React', 'TypeScript', 'AI', 'Innovation'],
    language: 'ko',
    locale: 'ko_KR',
    type: 'website'
  },
  
  // Open Graph / 소셜 미디어
  og: {
    siteName: 'NextNove Dev',
    image: '/images/og-image.jpg', // public 폴더에 이미지 추가 필요
    imageWidth: 1200,
    imageHeight: 630
  },
  
  // 기능 플래그
  features: {
    cursorTrail: true,
    typingAnimation: true,
    performanceMonitoring: import.meta.env.DEV,  // 개발 모드에서만
    analytics: import.meta.env.PROD              // 프로덕션에서만
  },
  
  // Analytics 설정 (필요시 활성화)
  analytics: {
    gaId: '' // Google Analytics ID (예: 'G-XXXXXXXXXX')
  },
  
  // 애니메이션 설정
  animation: {
    cursorTrail: {
      maxTrails: 15,
      trailSize: 4,
      fadeSpeed: 0.05
    },
    typing: {
      speed: 100
    },
    scrollReveal: {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  }
} as const;

// 타입 추출
export type SiteConfig = typeof siteConfig;
