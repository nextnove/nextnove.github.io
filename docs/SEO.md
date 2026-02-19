# 🔍 SEO 가이드

이 문서는 NextNove 포트폴리오의 SEO 최적화 방법을 설명합니다.

## 📋 적용된 SEO 최적화

### 1. Meta 태그 (index.html)

#### Primary Meta Tags
```html
<title>NextNove Dev - Innovation Lab</title>
<meta name="description" content="혁신적인 기술로 더 나은 미래를 만들어갑니다" />
<meta name="keywords" content="NextNove, Web Development, React, TypeScript" />
<meta name="author" content="NextNove" />
<meta name="robots" content="index, follow" />
```

#### Open Graph (Facebook, LinkedIn)
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="NextNove Dev - Innovation Lab" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://nextnove.github.io/og-image.jpg" />
<meta property="og:url" content="https://nextnove.github.io/" />
```

#### Twitter Card
```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="NextNove Dev - Innovation Lab" />
<meta property="twitter:image" content="https://nextnove.github.io/og-image.jpg" />
```

### 2. Sitemap (public/sitemap.xml)

검색 엔진이 사이트 구조를 이해하도록 돕습니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://nextnove.github.io/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 3. Robots.txt (public/robots.txt)

검색 엔진 크롤러에게 지침을 제공합니다.

```txt
User-agent: *
Allow: /

Sitemap: https://nextnove.github.io/sitemap.xml
```

### 4. 구조화된 데이터 (JSON-LD)

Google 검색 결과에 리치 스니펫을 표시합니다.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "NextNove Dev",
  "url": "https://nextnove.github.io/",
  "description": "...",
  "sameAs": [
    "https://github.com/nextnove",
    "https://twitter.com/nextnove"
  ]
}
```

## 🖼️ Open Graph 이미지 생성

### 이미지 요구사항
- **크기**: 1200 x 630 픽셀
- **포맷**: JPG 또는 PNG
- **파일명**: `og-image.jpg`
- **위치**: `public/og-image.jpg`

### 디자인 가이드
- 로고와 태그라인 포함
- 읽기 쉬운 텍스트
- 브랜드 컬러 사용
- 여백 충분히 확보

### 온라인 도구
- [Canva](https://www.canva.com/) - 무료 디자인 도구
- [Figma](https://www.figma.com/) - 전문 디자인 도구
- [OG Image Generator](https://og-image.vercel.app/) - 자동 생성

## 📱 Favicon 생성

### 필요한 파일
```
public/
├── favicon.ico (16x16, 32x32)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
├── android-chrome-192x192.png
└── android-chrome-512x512.png
```

### 생성 도구
- [Favicon Generator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)

## 🔧 SEO 컴포넌트 사용

### 기본 사용
```tsx
import SEO from '@/components/common/SEO';

function App() {
  return (
    <>
      <SEO />
      {/* 나머지 컴포넌트 */}
    </>
  );
}
```

### 페이지별 커스터마이징
```tsx
<SEO 
  title="프로젝트 - NextNove Dev"
  description="우리의 프로젝트를 확인하세요"
  image="https://nextnove.github.io/projects-og.jpg"
  url="https://nextnove.github.io/#projects"
/>
```

## 📊 SEO 체크리스트

### 필수 항목
- [x] 페이지 타이틀 (50-60자)
- [x] 메타 설명 (150-160자)
- [x] Open Graph 이미지 (1200x630)
- [x] Canonical URL
- [x] Robots.txt
- [x] Sitemap.xml
- [x] 구조화된 데이터
- [x] 모바일 친화적
- [x] 빠른 로딩 속도
- [x] HTTPS 사용

### 권장 항목
- [ ] 대체 텍스트 (이미지)
- [ ] 내부 링크
- [ ] 외부 링크 (rel="noopener")
- [ ] 시맨틱 HTML
- [ ] 접근성 (ARIA)

## 🔍 SEO 테스트 도구

### Google Tools
1. **Google Search Console**
   - 사이트 등록: https://search.google.com/search-console
   - Sitemap 제출
   - 인덱싱 상태 확인

2. **Google PageSpeed Insights**
   - 성능 측정: https://pagespeed.web.dev/
   - Core Web Vitals 확인

3. **Rich Results Test**
   - 구조화된 데이터 검증: https://search.google.com/test/rich-results

### 기타 도구
- **Lighthouse** (Chrome DevTools)
- **SEO Analyzer** - https://www.seoptimer.com/
- **Open Graph Debugger** - https://www.opengraph.xyz/
- **Twitter Card Validator** - https://cards-dev.twitter.com/validator

## 📈 Google Search Console 설정

### 1. 사이트 등록
```bash
# 소유권 확인 방법 1: HTML 파일
public/google-verification.html

# 소유권 확인 방법 2: Meta 태그
<meta name="google-site-verification" content="your-code" />
```

### 2. Sitemap 제출
```
https://nextnove.github.io/sitemap.xml
```

### 3. URL 검사
- 새 페이지 인덱싱 요청
- 크롤링 오류 확인

## 🎯 SEO 모범 사례

### 타이틀 작성
```
✅ 좋은 예: "NextNove Dev - Innovation Lab | Web Development"
❌ 나쁜 예: "Home Page"
```

### 메타 설명 작성
```
✅ 좋은 예: "혁신적인 기술로 더 나은 미래를 만들어갑니다. React, TypeScript, AI를 활용한 웹 솔루션 개발."
❌ 나쁜 예: "웹사이트입니다."
```

### URL 구조
```
✅ 좋은 예: /projects/e-commerce-platform
❌ 나쁜 예: /page?id=123&type=project
```

### 이미지 최적화
```html
<!-- Alt 텍스트 추가 -->
<img src="project.jpg" alt="E-Commerce Platform 프로젝트 스크린샷" />

<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" />
```

## 📱 소셜 미디어 미리보기

### Facebook Debugger
https://developers.facebook.com/tools/debug/

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

### Twitter Card Validator
https://cards-dev.twitter.com/validator

## 🚀 배포 후 체크리스트

1. [ ] Google Search Console에 사이트 등록
2. [ ] Sitemap 제출
3. [ ] Open Graph 이미지 확인
4. [ ] 모바일 반응형 테스트
5. [ ] 페이지 속도 측정
6. [ ] 구조화된 데이터 검증
7. [ ] 소셜 미디어 미리보기 확인
8. [ ] 404 페이지 설정
9. [ ] Analytics 설정 (선택)

## 📚 참고 자료

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org](https://schema.org/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

---

SEO는 지속적인 과정입니다. 정기적으로 모니터링하고 개선하세요! 🚀
