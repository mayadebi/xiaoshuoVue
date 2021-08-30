import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/admin/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 把home当父路由，下面就是子路由，访问子路由会自动加载父路由
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/admin/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/admin/User')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('../views/admin/Menu')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/admin/Role')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/admin/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
