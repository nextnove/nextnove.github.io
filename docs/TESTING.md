# 🧪 테스트 가이드

이 문서는 NextNove 포트폴리오의 테스트 작성 및 실행 방법을 설명합니다.

## 📦 테스트 스택

- **Vitest** - 빠른 단위 테스트 프레임워크
- **React Testing Library** - React 컴포넌트 테스트
- **jsdom** - 브라우저 환경 시뮬레이션

## 🚀 테스트 실행

```bash
# 워치 모드로 테스트 실행
npm test

# 단일 실행
npm run test:run

# UI 모드로 실행
npm run test:ui

# 커버리지 리포트 생성
npm run test:coverage
```

## 📁 테스트 파일 구조

```
src/
├── components/
│   ├── common/
│   │   └── LazyImage.tsx
│   └── __tests__/
│       └── LazyImage.test.tsx
├── hooks/
│   ├── useTheme.ts
│   └── __tests__/
│       └── useTheme.test.ts
└── utils/
    ├── performance.ts
    └── __tests__/
        └── performance.test.ts
```

## ✍️ 테스트 작성 예시

### 컴포넌트 테스트

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const { user } = render(<MyComponent />);
    const button = screen.getByRole('button');
    
    await user.click(button);
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### 훅 테스트

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });

  it('should update value', () => {
    const { result } = renderHook(() => useMyHook());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.value).toBe(1);
  });
});
```

### 유틸리티 함수 테스트

```typescript
import { describe, it, expect } from 'vitest';
import { myUtilFunction } from '../utils';

describe('myUtilFunction', () => {
  it('should return correct result', () => {
    const result = myUtilFunction(1, 2);
    expect(result).toBe(3);
  });

  it('should handle edge cases', () => {
    expect(myUtilFunction(0, 0)).toBe(0);
    expect(myUtilFunction(-1, 1)).toBe(0);
  });
});
```

## 🎯 테스트 작성 가이드라인

### 1. AAA 패턴 사용

```typescript
it('should do something', () => {
  // Arrange (준비)
  const input = 'test';
  
  // Act (실행)
  const result = myFunction(input);
  
  // Assert (검증)
  expect(result).toBe('expected');
});
```

### 2. 명확한 테스트 이름

```typescript
// ❌ 나쁜 예
it('test 1', () => {});

// ✅ 좋은 예
it('should return error when input is empty', () => {});
```

### 3. 하나의 테스트는 하나의 개념만

```typescript
// ❌ 나쁜 예
it('should do everything', () => {
  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toBe(3);
});

// ✅ 좋은 예
it('should initialize a with 1', () => {
  expect(a).toBe(1);
});

it('should initialize b with 2', () => {
  expect(b).toBe(2);
});
```

### 4. 모의 객체 사용

```typescript
import { vi } from 'vitest';

it('should call callback', () => {
  const callback = vi.fn();
  myFunction(callback);
  expect(callback).toHaveBeenCalled();
});
```

## 🔍 커버리지 목표

| 항목 | 목표 |
|------|------|
| Statements | 80%+ |
| Branches | 75%+ |
| Functions | 80%+ |
| Lines | 80%+ |

## 📊 커버리지 확인

```bash
npm run test:coverage
```

커버리지 리포트는 `coverage/` 폴더에 생성됩니다:
- `coverage/index.html` - HTML 리포트
- `coverage/coverage-final.json` - JSON 리포트

## 🛠️ 테스트 설정

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
```

### 테스트 셋업 (src/test/setup.ts)

```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});
```

## 🎭 모의 객체 (Mocks)

### localStorage 모의

```typescript
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock as any;
```

### fetch 모의

```typescript
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' })
  })
) as any;
```

### IntersectionObserver 모의

```typescript
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
```

## 🐛 디버깅

### screen.debug() 사용

```typescript
import { render, screen } from '@testing-library/react';

it('should render', () => {
  render(<MyComponent />);
  screen.debug(); // DOM 출력
});
```

### logRoles 사용

```typescript
import { render, logRoles } from '@testing-library/react';

it('should have correct roles', () => {
  const { container } = render(<MyComponent />);
  logRoles(container); // 모든 role 출력
});
```

## 📚 참고 자료

- [Vitest 문서](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🤝 기여

새로운 기능을 추가할 때는 반드시 테스트를 함께 작성해주세요:

1. 기능 구현
2. 테스트 작성
3. 커버리지 확인
4. PR 제출

---

테스트는 코드 품질의 기반입니다! 🚀
