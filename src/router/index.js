import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AuthLayout from '@/components/layout/Auth.vue'
import DefaultLayout from '@/components/layout/Default.vue'

// Pages
import LoginView from '@/pages/LoginView.vue'
import DashboardView from '@/pages/DashboardView.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: LoginView,
      },
    ],
  },
  {
    path: '/dashboard',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardView,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
