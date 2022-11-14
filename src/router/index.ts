import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/main'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/main'
      },
      {
        path: 'main',
        component: () => import('@/views/MainScreen.vue'),
        meta: { transition: 'slide-right' },
      },
      {
        path: 'hello',
        component: () => import('@/views/AppOnboarding.vue'),
        meta: { transition: 'slide-right' },
      },
      {
        path: 'setupProfile',
        component: () => import('@/views/SetupProfile.vue'),
        meta: { transition: 'slide-left' },
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { transition: 'slide-right' },
      },
      {
        path: 'eatenAdd',
        component: () => import('@/views/EatenAdd.vue'),
        meta: { transition: 'slide-right' },
      },
      {
        path: 'ownFoodList',
        component: () => import('@/views/OwnFoodList.vue'),
        meta: { transition: 'slide-right' },
      },
      {
        path: 'summaryData',
        component: () => import('@/views/SummaryData.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
