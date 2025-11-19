import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // public 폴더를 정적 자산 디렉토리로 명시
  build: {
    outDir: 'dist',
    emptyOutDir: true, // 빌드 전 dist 폴더 비우기
  },
});