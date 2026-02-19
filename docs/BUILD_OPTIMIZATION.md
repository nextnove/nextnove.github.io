# 🏗️ 빌드 최적화 가이드

이 문서는 NextNove 포트폴리오의 빌드 최적화 방법을 설명합니다.

## 📦 적용된 최적화

### 1. 코드 스플리팅 (Code Splitting)

#### Manual Chunks
큰 라이브러리를 별도 청크로 분리하여 초기 로딩 속도를 개선합니다.

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
});
```

**효과:**
- 초기 번들 크기 감소
- 브라우저 캐싱 효율 증가
- 병렬 다운로드 가능

#### Dynamic Import (Lazy Loading)
사용자가 필요할 때만 컴포넌트를 로드합니다.

```typescript
import { lazy, Suspense } from 'react';

// 동적 import
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 2. 번들 크기 최적화

#### Tree Shaking
사용하지 않는 코드를 자동으로 제거합니다.

```typescript
// ✅ 좋은 예 - Named import
import { useState, useEffect } from 'react';

// ❌ 나쁜 예 - Namespace import
import * as React from 'react';
```

#### Console 제거
프로덕션 빌드에서 console.log를 자동 제거합니다.

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

### 3. 번들 분석

#### Rollup Plugin Visualizer
번들 크기를 시각적으로 분석합니다.

```bash
# 번들 분석과 함께 빌드
npm run build:analyze

# 생성된 리포트 확인
# dist/stats.html 파일 열기
```

**분석 항목:**
- 각 모듈의 크기
- Gzip/Brotli 압축 크기
- 의존성 트리
- 중복 코드 확인

## 📊 빌드 명령어

```bash
# 일반 빌드
npm run build

# 번들 분석과 함께 빌드
npm run build:analyze

# 빌드 결과 미리보기
npm run preview
```

## 🎯 최적화 체크리스트

### 코드 레벨
- [x] Named import 사용
- [x] Tree shaking 활성화
- [x] 사용하지 않는 코드 제거
- [x] Console.log 제거
- [x] 중복 코드 제거

### 번들 레벨
- [x] 코드 스플리팅 적용
- [x] Manual chunks 설정
- [x] Lazy loading 구현
- [x] 압축 최적화 (Terser)

### 리소스 레벨
- [x] 이미지 최적화
- [x] 폰트 최적화
- [x] CSS 최소화
- [x] Gzip/Brotli 압축

## 📈 성능 목표

### 번들 크기
| 항목 | 목표 | 현재 |
|------|------|------|
| Initial JS | < 200KB | ~150KB |
| Total JS | < 500KB | ~400KB |
| CSS | < 50KB | ~30KB |

### 로딩 시간
| 지표 | 목표 |
|------|------|
| FCP | < 1.5s |
| LCP | < 2.5s |
| TTI | < 3.5s |

## 🔍 번들 분석 방법

### 1. Visualizer 리포트 확인

```bash
npm run build:analyze
```

생성된 `dist/stats.html` 파일을 브라우저에서 열면:
- 📊 트리맵으로 모듈 크기 시각화
- 📦 각 청크의 크기 확인
- 🔍 큰 모듈 식별

### 2. 큰 모듈 최적화

```typescript
// ❌ 전체 라이브러리 import
import _ from 'lodash';

// ✅ 필요한 함수만 import
import debounce from 'lodash/debounce';
```

### 3. 중복 제거

```typescript
// ❌ 여러 곳에서 같은 코드 반복
function formatDate1() { /* ... */ }
function formatDate2() { /* ... */ }

// ✅ 공통 유틸리티로 추출
import { formatDate } from '@/utils/date';
```

## 🚀 고급 최적화

### 1. Preload/Prefetch

```html
<!-- 중요한 리소스 미리 로드 -->
<link rel="preload" href="/fonts/font.woff2" as="font" crossorigin />

<!-- 다음에 필요할 리소스 미리 가져오기 -->
<link rel="prefetch" href="/next-page.js" />
```

### 2. 이미지 최적화

```typescript
// WebP 포맷 사용
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>

// Lazy loading
<img src="image.jpg" loading="lazy" alt="..." />
```

### 3. 폰트 최적화

```css
/* font-display: swap 사용 */
@font-face {
  font-family: 'Pretendard';
  font-display: swap;
  src: url('/fonts/pretendard.woff2') format('woff2');
}

/* 서브셋 폰트 사용 */
/* 한글 자주 사용하는 글자만 포함 */
```

### 4. CSS 최적화

```typescript
// ✅ Tailwind CSS purge 설정
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // 사용하지 않는 CSS 자동 제거
};
```

## 📱 모바일 최적화

### 1. 적응형 로딩

```typescript
// 네트워크 상태에 따라 다른 리소스 로드
const connection = navigator.connection;
const isSlow = connection?.effectiveType === '2g' || connection?.effectiveType === '3g';

if (isSlow) {
  // 저화질 이미지 로드
} else {
  // 고화질 이미지 로드
}
```

### 2. 디바이스 성능 감지

```typescript
import { getDevicePerformance } from '@/utils/performance';

const performance = getDevicePerformance();

if (performance === 'low') {
  // 애니메이션 비활성화
  // 이미지 품질 낮춤
}
```

## 🛠️ 빌드 설정 상세

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // 코드 스플리팅
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
    // 청크 크기 경고
    chunkSizeWarningLimit: 1000,
    // 소스맵 (개발: true, 프로덕션: false)
    sourcemap: false,
    // 최소화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // 의존성 최적화
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
```

## 📊 측정 도구

### 1. Lighthouse
```bash
# Chrome DevTools > Lighthouse
# 또는 CLI
npm install -g lighthouse
lighthouse https://nextnove.github.io
```

### 2. Bundle Analyzer
```bash
npm run build:analyze
```

### 3. Webpack Bundle Analyzer (대안)
```bash
npm install -D webpack-bundle-analyzer
```

## 🎯 최적화 우선순위

### High Priority
1. 코드 스플리팅
2. Tree shaking
3. 이미지 최적화
4. 폰트 최적화

### Medium Priority
5. CSS 최소화
6. Console 제거
7. Lazy loading
8. Preload/Prefetch

### Low Priority
9. 소스맵 제거
10. 압축 최적화
11. 캐싱 전략

## 📚 참고 자료

- [Vite Build Optimization](https://vitejs.dev/guide/build.html)
- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Web.dev Performance](https://web.dev/performance/)
- [Bundle Size Optimization](https://bundlephobia.com/)

## 🔄 지속적인 최적화

### 정기 체크
- [ ] 월 1회 번들 크기 분석
- [ ] 분기 1회 의존성 업데이트
- [ ] 새 기능 추가 시 성능 측정
- [ ] 사용하지 않는 코드 정리

### 모니터링
- Lighthouse CI 설정
- 번들 크기 추적
- 로딩 시간 모니터링

---

작은 최적화가 모여 큰 성능 향상을 만듭니다! 🚀
