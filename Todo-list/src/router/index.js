import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo-list',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test-view',
      component: TestView
    },
    {
      path: '/todo/:id/edit',
      name: 'todo-edit',
      component: EditView
    }
  ]
})

export default router