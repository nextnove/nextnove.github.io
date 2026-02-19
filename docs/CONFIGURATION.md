# ⚙️ 설정 가이드

이 문서는 NextNove 포트폴리오의 설정 방법을 설명합니다.

## 📁 설정 파일

```
src/
└── config/
    └── site.ts         # 모든 사이트 설정
```

## 🔧 사이트 설정 (src/config/site.ts)

### 기본 정보 수정

```typescript
export const siteConfig = {
  // 사이트 이름 변경
  name: 'Your Name',
  title: 'Your Name - Portfolio',
  description: '당신의 소개를 여기에 작성하세요.',
  tagline: 'Your Tagline',
  
  // URL (환경별 자동 설정)
  url: import.meta.env.DEV 
    ? 'http://localhost:5173'
    : 'https://yourusername.github.io',
}
```

### 소셜 링크 수정

```typescript
links: {
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  email: 'your.email@example.com'
}
```

### 메타데이터 수정

```typescript
metadata: {
  author: 'Your Name',
  keywords: ['Your', 'Keywords', 'Here'],
  language: 'ko',  // 또는 'en'
  locale: 'ko_KR', // 또는 'en_US'
  type: 'website'
}
```

### Google Analytics 설정 (선택사항)

```typescript
analytics: {
  gaId: 'G-XXXXXXXXXX'  // Google Analytics ID
}
```

### 애니메이션 설정

```typescript
animation: {
  cursorTrail: {
    maxTrails: 15,      // 커서 트레일 개수
    trailSize: 4,       // 트레일 크기
    fadeSpeed: 0.05     // 페이드 속도
  },
  typing: {
    speed: 100          // 타이핑 속도 (ms)
  },
  scrollReveal: {
    threshold: 0.1,     // 표시 임계값
    rootMargin: '0px 0px -100px 0px'
  }
}
```

### 기능 플래그

```typescript
features: {
  cursorTrail: true,                        // 커서 트레일 활성화
  typingAnimation: true,                    // 타이핑 애니메이션 활성화
  performanceMonitoring: import.meta.env.DEV,  // 개발 모드에서만
  analytics: import.meta.env.PROD              // 프로덕션에서만
}
```

## 🌍 환경별 자동 설정

### Vite 내장 환경변수

```typescript
// 개발 모드 (npm run dev)
import.meta.env.DEV   // true
import.meta.env.PROD  // false
import.meta.env.MODE  // 'development'

// 프로덕션 모드 (npm run build)
import.meta.env.DEV   // false
import.meta.env.PROD  // true
import.meta.env.MODE  // 'production'
```

### 환경별 URL 자동 설정

```typescript
// site.ts에서 자동으로 환경 감지
url: import.meta.env.DEV 
  ? 'http://localhost:5173'           // 개발
  : 'https://yourusername.github.io'  // 프로덕션
```

## 📝 사용 예시

### 컴포넌트에서 설정 사용

```typescript
import { siteConfig } from '@/config/site';

function MyComponent() {
  return (
    <div>
      <h1>{siteConfig.name}</h1>
      <a href={siteConfig.links.github}>GitHub</a>
    </div>
  );
}
```

### 조건부 기능 활성화

```typescript
import { siteConfig } from '@/config/site';

function App() {
  return (
    <>
      {siteConfig.features.cursorTrail && <CursorTrail />}
      {siteConfig.features.analytics && <Analytics />}
    </>
  );
}
```

## 🎯 장점

### 1. 중앙 관리
- 모든 설정을 한 곳에서 관리
- 변경 시 한 파일만 수정

### 2. 타입 안정성
```typescript
// TypeScript가 자동완성 제공
siteConfig.links.github  // ✅ 타입 체크
siteConfig.links.invalid // ❌ 컴파일 에러
```

### 3. 환경별 자동 분리
```typescript
// 코드 수정 없이 자동으로 환경 감지
performanceMonitoring: import.meta.env.DEV  // 개발에서만 true
analytics: import.meta.env.PROD             // 프로덕션에서만 true
```

### 4. 간단함
- 환경변수 파일 불필요
- 설정이 명확하고 직관적
- Git 충돌 없음

## 📚 추가 리소스

- [Vite 환경 변수 문서](https://vitejs.dev/guide/env-and-mode.html)
- [TypeScript const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

## 🤝 기여

설정 파일에 새로운 옵션을 추가하려면:

1. `src/config/site.ts`에 옵션 추가
2. 타입 안정성 확인
3. 문서 업데이트
4. 예시 코드 작성

---

설정 파일을 활용하여 유지보수하기 쉬운 코드를 작성하세요! 🚀
