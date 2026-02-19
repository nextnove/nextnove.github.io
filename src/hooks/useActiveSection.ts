import { useState, useEffect } from 'react';
import { throttle } from '../utils/performance';
import { SCROLL, NAVIGATION } from '../constants';

export function useActiveSection(sections: string[] = [...NAVIGATION.SECTIONS]) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    /**
     * 스크롤 위치에 따라 활성 섹션을 감지합니다.
     * throttle을 적용하여 성능을 최적화합니다.
     */
    const handleScroll = throttle(() => {
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 섹션이 뷰포트 상단 임계값 내에 있는지 확인
          return rect.top <= SCROLL.ACTIVE_SECTION_THRESHOLD && 
                 rect.bottom >= SCROLL.ACTIVE_SECTION_THRESHOLD;
        }
        return false;
      });
      if (current) setActiveSection(current);
    }, SCROLL.THROTTLE_DELAY);

    // passive: true로 스크롤 성능 향상
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  /**
   * 부드러운 스크롤로 특정 섹션으로 이동합니다.
   */
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return { activeSection, scrollToSection };
}
