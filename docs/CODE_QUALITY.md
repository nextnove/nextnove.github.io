# 📐 코드 품질 가이드

이 문서는 NextNove 포트폴리오의 코드 품질 기준과 모범 사례를 설명합니다.

## 🎯 코드 품질 원칙

### 1. 가독성 (Readability)
- 명확하고 의미있는 변수명 사용
- 적절한 주석 추가
- 일관된 코드 스타일

### 2. 유지보수성 (Maintainability)
- 단일 책임 원칙 (SRP)
- DRY (Don't Repeat Yourself)
- 낮은 결합도, 높은 응집도

### 3. 성능 (Performance)
- 불필요한 리렌더링 방지
- 메모이제이션 활용
- 최적화된 알고리즘

### 4. 테스트 가능성 (Testability)
- 순수 함수 선호
- 의존성 주입
- 모의 객체 활용

## 📏 코딩 컨벤션

### 네이밍 규칙

```typescript
// ✅ 좋은 예
const MAX_RETRY_COUNT = 3;
const isUserLoggedIn = true;
const getUserProfile = () => {};
const UserProfile = () => {};

// ❌ 나쁜 예
const x = 3;
const flag = true;
const func = () => {};
const component = () => {};
```

### 상수 관리

```typescript
// ❌ 매직 넘버 사용
setTimeout(() => {}, 100);
if (scrollY > 50) {}

// ✅ 상수로 관리
import { ANIMATION, SCROLL } from '@/constants';

setTimeout(() => {}, ANIMATION.TYPING_SPEED);
if (scrollY > SCROLL.THRESHOLD) {}
```

### 함수 작성

```typescript
// ✅ 단일 책임 원칙
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendEmail(email: string, message: string): void {
  if (!validateEmail(email)) {
    throw new Error('Invalid email');
  }
  // 이메일 전송 로직
}

// ❌ 여러 책임
function sendEmailWithValidation(email: string, message: string): void {
  // 검증과 전송을 한 함수에서 처리
}
```

## 💬 주석 작성 가이드

### JSDoc 주석

```typescript
/**
 * 사용자 프로필을 가져옵니다.
 * 
 * @param userId - 사용자 ID
 * @param options - 옵션 객체
 * @returns 사용자 프로필 또는 null
 * @throws {Error} 사용자를 찾을 수 없을 때
 * 
 * @example
 * ```typescript
 * const profile = await getUserProfile('123', { includeAvatar: true });
 * ```
 */
async function getUserProfile(
  userId: string,
  options?: ProfileOptions
): Promise<UserProfile | null> {
  // 구현
}
```

### 인라인 주석

```typescript
// ✅ 좋은 주석 - 왜(Why)를 설명
// IntersectionObserver를 사용하여 뷰포트에 들어올 때만 이미지 로드
const observer = new IntersectionObserver(callback);

// ❌ 나쁜 주석 - 무엇(What)을 반복
// observer 생성
const observer = new IntersectionObserver(callback);
```

### 복잡한 로직 주석

```typescript
/**
 * 커서 트레일 애니메이션
 * 
 * 성능 최적화를 위해 Canvas API를 사용합니다:
 * 1. DOM 요소 생성 대신 Canvas에 직접 그리기
 * 2. requestAnimationFrame으로 브라우저 리페인트 주기에 맞춤
 * 3. 투명도 기반 페이드아웃으로 자연스러운 효과
 */
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = trails.length - 1; i >= 0; i--) {
    const trail = trails[i];
    trail.opacity -= fadeSpeed;
    
    if (trail.opacity <= 0) {
      trails.splice(i, 1);
      continue;
    }
    
    // 원 그리기 및 그림자 효과
    ctx.beginPath();
    ctx.arc(trail.x, trail.y, trailSize, 0, Math.PI * 2);
    ctx.fillStyle = getColor(trail.opacity);
    ctx.fill();
  }
  
  requestAnimationFrame(animate);
};
```

## 🔧 TypeScript 활용

### 타입 안정성

```typescript
// ✅ 명시적 타입
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // 구현
}

// ❌ any 사용
function getUser(id: any): any {
  // 구현
}
```

### 유니온 타입

```typescript
type Theme = 'dark' | 'light';
type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ 타입 안전
function setTheme(theme: Theme) {
  // theme은 'dark' 또는 'light'만 가능
}

// ❌ 문자열 사용
function setTheme(theme: string) {
  // 어떤 문자열이든 가능
}
```

### 제네릭 활용

```typescript
// ✅ 재사용 가능한 제네릭 함수
function identity<T>(value: T): T {
  return value;
}

const num = identity(42); // number
const str = identity('hello'); // string
```

## 🎨 React 모범 사례

### 컴포넌트 구조

```typescript
// ✅ 좋은 구조
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

### 커스텀 훅

```typescript
// ✅ 재사용 가능한 로직 분리
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

### 메모이제이션

```typescript
// ✅ 불필요한 리렌더링 방지
const MemoizedComponent = memo(({ data }: Props) => {
  return <div>{data}</div>;
});

// ✅ 비용이 큰 계산 캐싱
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// ✅ 콜백 함수 캐싱
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## 🧹 코드 정리

### ESLint 규칙 준수

```bash
# 린트 검사
npm run lint

# 자동 수정
npm run lint -- --fix
```

### 사용하지 않는 코드 제거

```typescript
// ❌ 사용하지 않는 import
import { unused } from 'library';

// ❌ 사용하지 않는 변수
const unusedVariable = 'test';

// ❌ 주석 처리된 코드
// const oldCode = 'remove this';
```

## 📊 코드 리뷰 체크리스트

- [ ] 명확한 변수명과 함수명 사용
- [ ] 매직 넘버를 상수로 관리
- [ ] 복잡한 로직에 주석 추가
- [ ] TypeScript 타입 명시
- [ ] 테스트 코드 작성
- [ ] ESLint 규칙 준수
- [ ] 불필요한 코드 제거
- [ ] 성능 최적화 고려
- [ ] 접근성 고려
- [ ] 에러 처리 구현

## 🎯 성능 최적화

### 번들 크기 최적화

```typescript
// ✅ 필요한 것만 import
import { useState, useEffect } from 'react';

// ❌ 전체 import
import * as React from 'react';
```

### 동적 import

```typescript
// ✅ 코드 스플리팅
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## 📚 참고 자료

- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

---

좋은 코드는 읽기 쉽고, 유지보수하기 쉽고, 테스트하기 쉬운 코드입니다! 🚀
