import Vue from 'vue'
import VueRouter from 'vue-router'
import Canvas from '../views/Canvas.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Canvas',
    component: Canvas
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  routes
})

export default router
