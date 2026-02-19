import { useState, useEffect } from 'react';

export function useTypingAnimation(fullText: string, speed = 100) {
  const [typedText, setTypedText] = useState(() => {
    // prefers-reduced-motion 체크를 초기값에서 수행
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return prefersReducedMotion ? fullText : '';
  });

  useEffect(() => {
    // prefers-reduced-motion이 활성화된 경우 애니메이션 건너뛰기
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText, speed]);

  return typedText;
}
