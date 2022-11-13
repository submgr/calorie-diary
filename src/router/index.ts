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
        path: 'hello',
        component: () => import('@/views/AppOnboarding.vue')
      },
      {
        path: 'setupProfile',
        component: () => import('@/views/SetupProfile.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'eatenAdd',
        component: () => import('@/views/EatenAdd.vue')
      },
      {
        path: 'ownFoodList',
        component: () => import('@/views/OwnFoodList.vue')
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
