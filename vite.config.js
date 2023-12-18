import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import resolve from 'rollup-plugin-node-resolve';

export default defineConfig({
  plugins: [vue(), resolve()],
  build: {
    rollupOptions: {
      external: ['@fullcalendar/core/index.js'],
    },
  },
});