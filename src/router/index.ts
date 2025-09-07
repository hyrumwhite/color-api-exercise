import ColorExplorer from '@/pages/ColorExplorer.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ColorExplorer,
    },
  ],
});

export default router;
