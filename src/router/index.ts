import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/rooms/:id',
      name: 'room',
      component: () => import('@/views/RoomView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

export default router
