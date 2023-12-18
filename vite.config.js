import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import externalGlobals from 'rollup-plugin-external-globals';

export default defineConfig({
  plugins: [
    vue(),
    {
      ...nodeResolve(),
      dedupe: ['@fullcalendar/core'],
    },
    externalGlobals({
      '@fullcalendar/core': 'FullCalendarCore',
      '@fullcalendar/vue3': 'FullCalendarVue3',
    }),
  ],
  build: {
    rollupOptions: {
      external: ['@fullcalendar/core', '@fullcalendar/vue3'],
    },
  },
});
