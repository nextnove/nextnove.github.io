import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// 각 테스트 후 자동 클린업
afterEach(() => {
  cleanup();
});

// 전역 모의 객체 설정
globalThis.matchMedia = globalThis.matchMedia || function (query: string) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  } as MediaQueryList;
};

// IntersectionObserver 모의 객체
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// ResizeObserver 모의 객체
// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
