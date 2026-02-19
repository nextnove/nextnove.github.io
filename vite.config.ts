import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  base: '/',
  build: {
    // 코드 스플리팅 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          // React 관련 라이브러리를 별도 청크로 분리
          'react-vendor': ['react', 'react-dom'],
          // Lucide 아이콘을 별도 청크로 분리
          'icons': ['lucide-react'],
        },
      },
    },
    // 청크 크기 경고 임계값 (KB)
    chunkSizeWarningLimit: 1000,
    // 소스맵 생성 (프로덕션에서는 false 권장)
    sourcemap: false,
    // 최소화 옵션
    minify: 'esbuild',
  },
  // 최적화 옵션
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
