import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "풀스택 전자상거래 플랫폼 구축. 실시간 재고 관리, 결제 시스템 통합, 관리자 대시보드 구현",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    link: "https://github.com",
    metrics: { users: "10K+", performance: "98" }
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "OpenAI API를 활용한 실시간 채팅 애플리케이션. WebSocket 기반 실시간 통신 및 컨텍스트 관리",
    tech: ["React", "Node.js", "Socket.io", "Redis"],
    link: "https://github.com",
    metrics: { latency: "<100ms", uptime: "99.9%" }
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "데이터 시각화 대시보드. 실시간 데이터 처리 및 인터랙티브 차트 구현",
    tech: ["React", "D3.js", "Firebase", "Tailwind"],
    link: "https://github.com",
    metrics: { dataPoints: "1M+", charts: "15+" }
  }
];