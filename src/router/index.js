import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/LoginView.vue'
import Dashboard from '../views/AboutView.vue'

import AuthLayout from '../components/layout/Auth.vue'
import DefaultLayout from '../components/layout/Default.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [{ path: '', name: 'Login', component: Login }],
  },
  {
    path: '/dashboard',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
