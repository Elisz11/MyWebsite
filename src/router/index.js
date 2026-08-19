import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.view.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('../views/Projects.view.vue'),
    },/*
    {
      path: '/experencies',
      name: 'Experencies',
      component: () => import('../views/Experencies.view.vue'),
    },*/
    {
      path: '/photos',
      name: 'Photos',
      component: () => import('../views/Photos.view.vue'),
    }
  ],
})

export default router
