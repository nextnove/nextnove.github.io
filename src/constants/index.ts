/**
 * 애플리케이션 전역 상수
 * 매직 넘버를 의미있는 이름으로 관리합니다.
 */

// 스크롤 관련
export const SCROLL = {
  /** 활성 섹션 감지 임계값 (px) */
  ACTIVE_SECTION_THRESHOLD: 100,
  /** 스크롤 이벤트 throttle 간격 (ms) */
  THROTTLE_DELAY: 100
} as const;

// 애니메이션 관련
export const ANIMATION = {
  /** 커서 트레일 최대 개수 */
  CURSOR_TRAIL_MAX: 15,
  /** 커서 트레일 크기 (px) */
  CURSOR_TRAIL_SIZE: 4,
  /** 커서 트레일 페이드 속도 */
  CURSOR_TRAIL_FADE_SPEED: 0.05,
  
  /** 타이핑 애니메이션 속도 (ms) */
  TYPING_SPEED: 100,
  
  /** 스크롤 리빌 임계값 */
  SCROLL_REVEAL_THRESHOLD: 0.1,
  /** 스크롤 리빌 루트 마진 */
  SCROLL_REVEAL_ROOT_MARGIN: '0px 0px -100px 0px',
  
  /** 오프캔버스 전환 시간 (ms) */
  OFFCANVAS_TRANSITION_DURATION: 300,
  
  /** Blob 애니메이션 지연 시간 (ms) */
  BLOB_ANIMATION_DELAY_1: 2000,
  BLOB_ANIMATION_DELAY_2: 4000
} as const;

// 네비게이션 관련
export const NAVIGATION = {
  /** 네비게이션 높이 (px) */
  HEIGHT: 64,
  /** 섹션 목록 */
  SECTIONS: ['home', 'about', 'projects', 'experience'] as const
} as const;

// 타입 추출
export type NavigationSection = typeof NAVIGATION.SECTIONS[number];
