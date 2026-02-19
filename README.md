# 🎨 NextNove Dev Portfolio

Vite + React + TypeScript로 만든 Vercel/Linear 스타일의 세련된 개발자 포트폴리오입니다.

[https://nextnove.github.io/](https://nextnove.github.io/)

## ✨ 특징

- **⚡ Vite + TypeScript** - 초고속 개발 서버와 타입 안전성
- **🎨 세련된 디자인** - Vercel/Linear 스타일의 다크 모던 디자인
- **✨ 인터랙티브 효과** - 마우스 트레일, 타이핑 애니메이션, 스크롤 리빌
- **🌓 다크/라이트 모드** - 테마 토글 + localStorage 저장
- **📱 완전한 반응형** - 모든 디바이스 지원
- **🚀 GitHub Actions 자동 배포** - Push만 하면 자동 배포
- **💨 Tailwind CSS v4** - 최신 버전
- **🧩 컴포넌트 구조** - 깔끔한 코드 구조

## 📁 프로젝트 구조

```
src/
├── App.tsx                 # 메인 앱 컴포넌트
├── main.tsx                # 엔트리 포인트
├── components/
│   ├── common/            # 공통 컴포넌트
│   │   ├── LazyImage.tsx
│   │   ├── LazyLoad.tsx
│   │   ├── SEO.tsx
│   │   └── StructuredData.tsx
│   ├── icons/             # 아이콘 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── sections/          # 섹션 컴포넌트
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ProjectsSection.tsx
│       └── ExperienceSection.tsx
├── config/
│   └── site.ts            # 사이트 설정 (중앙 관리)
├── constants/
│   └── index.ts           # 상수 정의
├── data/
│   ├── experience.ts      # 경력 데이터
│   ├── projects.ts        # 프로젝트 데이터
│   └── skills.ts          # 스킬 데이터
├── hooks/                 # 커스텀 훅
│   ├── useTheme.ts
│   ├── useCursorTrailCanvas.ts
│   ├── useTypingAnimation.ts
│   ├── useScrollReveal.ts
│   ├── useActiveSection.ts
│   └── usePerformanceMonitor.ts
├── styles/
│   ├── index.css          # Tailwind imports
│   └── theme.css          # 테마 변수
├── types/                 # TypeScript 타입 정의
│   ├── index.ts
│   ├── theme.ts
│   ├── experience.ts
│   ├── project.ts
│   └── skills.ts
└── utils/                 # 유틸리티 함수
    ├── lazyLoad.ts
    └── performance.ts
```

## 📦 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 🚀 GitHub Pages 배포

### 저장소 이름 규칙
**반드시 `yourusername.github.io` 형식이어야 합니다!**

### 배포 단계

1. GitHub에서 `yourusername.github.io` 저장소 생성
2. Settings > Pages > Source: "GitHub Actions" 선택
3. 코드 푸시:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

배포 완료 후: `https://yourusername.github.io` 접속

## 🎨 콘텐츠 수정

### 1. 기본 정보 수정 (`src/config/site.ts`)

모든 사이트 정보를 한 곳에서 관리합니다:

```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Name - Portfolio',
  description: '당신의 소개',
  tagline: 'Your Tagline',
  
  url: 'https://yourusername.github.io',
  
  links: {
    github: 'https://github.com/yourusername',
    twitter: 'https://x.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'your.email@example.com'
  },
  
  analytics: {
    gaId: ''  // Google Analytics ID (선택사항)
  }
};
```

### 2. 프로젝트 정보 (`src/data/projects.ts`)
```typescript
const projects = [
  {
    id: 1,
    title: "프로젝트 제목",
    description: "설명",
    tech: ["React", "Node.js"],
    link: "https://github.com/...",
    metrics: { users: "10K+", performance: "98" }
  }
];
```

자세한 설정 방법은 [설정 가이드](docs/CONFIGURATION.md)를 참고하세요.

## 📖 문서

- [설정 가이드](docs/CONFIGURATION.md) - 사이트 설정
- [성능 최적화](PERFORMANCE.md) - 성능 개선 기법
- [빌드 최적화](docs/BUILD_OPTIMIZATION.md) - 코드 스플리팅 및 번들 분석
- [테스트 가이드](docs/TESTING.md) - 테스트 작성 및 실행
- [코드 품질](docs/CODE_QUALITY.md) - 코드 품질 기준
- [SEO 가이드](docs/SEO.md) - 검색 엔진 최적화

## 🎨 주요 기능

### 설정 파일 관리
- 중앙 집중식 설정 (`src/config/site.ts`)
- TypeScript 타입 안정성
- 환경별 자동 설정 (개발/프로덕션)

### 성능 최적화
- Canvas 기반 커서 트레일
- IntersectionObserver 최적화
- 이미지 Lazy Loading
- Throttle/Debounce 적용

### 접근성
- ARIA 레이블 완비
- 키보드 네비게이션
- prefers-reduced-motion 지원
- 스크린 리더 최적화

### SEO 최적화
- Meta 태그 완비
- Open Graph 지원
- Twitter Card 지원
- Sitemap.xml
- Robots.txt
- 구조화된 데이터 (JSON-LD)

## 📚 기술 스택

- React 19 + TypeScript
- Vite v7
- Tailwind CSS v4
- Lucide React
- GitHub Actions

## 📄 라이선스

MIT License

---

Made with ❤️ by NextNove